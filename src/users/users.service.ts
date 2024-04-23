import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument, UserRole } from '~/users/schema/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {


  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { username, password, email } = createUserDto;
   
    const newUser = new User();
    newUser.username = username;
    newUser.password = password;
    newUser.email = email;
    newUser.role = UserRole.User;
    newUser.isRegisteredWithGoogle = false;
    newUser.firstName = '';
    newUser.lastName = '';
    newUser.birth = undefined;
    newUser.avatar = '';
    newUser.createdAt = undefined;
    newUser.updatedAt = undefined;
    newUser.follower = undefined;
    newUser.following = undefined;
    newUser.social_link = '';
    newUser.location = undefined;
    newUser.skills = [];
    newUser.tag_following = '';


    const checkUserExist = await this.findByEmail(email);
    if (checkUserExist) {
      throw new BadRequestException('User already exist');
    }
    const createdUser = await this.userModel.create(newUser);
    const userResponse: User = createdUser.toObject();
    delete userResponse.password;
    return userResponse;
  }

  async getUser(query: object): Promise<User> {
    return this.userModel.findOne(query);
  }

  async findAll(): Promise<User[]> {

    return this.userModel.find().exec();
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.userModel.findOne({ email })
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const _id = new Object(id);
    const updatedUser = await this.userModel.findOneAndUpdate({ _id }, updateUserDto, { new: true })
    return updatedUser;
  }

  async remove(id: string) {
    const _id = new Object(id);
    return this.userModel.deleteOne().where({ _id }).exec();
  }

}
