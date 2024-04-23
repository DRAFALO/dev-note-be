import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { compare, genSalt, hash } from 'bcrypt';
import { OAuth2Client } from 'google-auth-library';
import { Model } from 'mongoose';
import { AuthResponseDto } from '~/auth/dto/auth-response.dto';
import { SignInDto } from '~/auth/dto/sign-in.dto';
import { SignUpDto } from '~/auth/dto/sign-up.dto';
import TokenVerificationDto from '~/auth/dto/token-verification.dto';
import { User, UserDocument, UserRole } from '~/users/schema/user.schema';
import { UsersService } from '~/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) { }

  async getNewTokens(refreshToken: string) {
    try {
      // check if refresh token is not null
      if (!refreshToken) {
        throw new UnauthorizedException('Refresh token is required');
      }
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_KEY')
      });

      const user = await this.userModel.findOne({ email: payload.email });
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const accessToken = await this.generateAccessToken(user);
      const newRefreshToken = await this.generateRefreshToken(user);

      return {
        accessToken: accessToken.accessToken,
        refreshToken: newRefreshToken.refreshToken
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async signUp(signUpDto: SignUpDto) {
    try {
      const { username, firstName, lastName, email, password } = signUpDto;

      // check if user exists
      const userExists = await this.userModel.findOne({ email });
      if (userExists) {
        throw new ConflictException(`User with email ${email} already exists`);
      }

      const user = new User();
      user.username = username;
      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;
      user.password = await this.hash(password);
      const createdUser: UserDocument = await this.userModel.create(user);

      return {
        message: `User has been ${createdUser.username} successfully signed up`
      };
    } catch (error) {
      throw error;
    }
  }

  async signIn(signInDto: SignInDto) {
    try {
      const { email, password } = signInDto;

      // check if user exists
      const user: UserDocument = await this.userModel.findOne({ email });
      if (!user) {
        throw new NotFoundException(`User with email ${email} not found`);
      }

      // check if password is correct
      if (!this.compare(password, user.password)) {
        throw new UnauthorizedException(`Invalid password`);
      }

      return await this.buildAuthResponse(user);
    } catch (error) {
      throw error;
    }
  }

  async googleAuth(tokenVerificationDto: TokenVerificationDto) {
    try {
      const clientId = this.configService.get<string>('GOOGLE_AUTH_CLIENT_ID');
      const token: string = tokenVerificationDto.token;

      // verify token and get user info
      const client = new OAuth2Client(clientId);
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: clientId,
      });
      const payload = ticket.getPayload();
      const { email, name, picture } = payload;

      // check if user exists
      let user = await this.userModel.findOne({ email });
      if (!user) {
        user = await this.userModel.create({
          email,
          username: name,
          avatar: picture,
          role: UserRole.User,
          isRegisteredWithGoogle: true,
        });
      }
      console.log(user)

      return await this.buildAuthResponse(user);
    } catch (error) {
      throw new UnauthorizedException('Failed to authenticate with Google', error.message);
    }
  }

  private async hash(data: string): Promise<string> {
    const salt = await genSalt();
    return hash(data, salt);
  }

  private async compare(data: string, encrypted: string): Promise<boolean> {
    return compare(data, encrypted);
  }

  private async generateAccessToken(user: UserDocument) {
    const payload = {
      id: user._id,
      email: user.email,
      role: user.role
    };

    const token = this.jwtService.sign(payload,
      {
        expiresIn: '1h',
        secret: this.configService.get<string>('JWT_KEY')
      });

    return { accessToken: token };
  }

  private async generateRefreshToken(user: UserDocument): Promise<{ refreshToken: string; }> {
    const payload = {
      id: user._id,
      email: user.email,
      role: user.role
    };
    const token = this.jwtService.sign(payload,
      {
        expiresIn: '7d',
        secret: this.configService.get<string>('JWT_REFRESH_KEY')
      });

    return { refreshToken: token };
  }

  async buildAuthResponse(user: UserDocument): Promise<AuthResponseDto> {
    const accessToken = await this.generateAccessToken(user);
    const refreshToken = await this.generateRefreshToken(user);

    const response: AuthResponseDto = {
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        role: user.role
      },
      accessToken: accessToken.accessToken,
      refreshToken: refreshToken.refreshToken
    };

    return response;
  }

}

