import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '~/users/schema/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      username: 'john',
      password: 'changeme',
    },
    {
      username: 'chris',
      password: 'secret',
    }
  ];

  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) { }

  async create(username: string, password: string): Promise<User> {
    return this.userModel.create({
      username,
      password,
    });
  }

  async getUser(query: object): Promise<User> {
    return this.userModel.findOne(query);
  }

  async findAll() {
    return this.userModel.find().exec();
  }

  async findByEmail(email: string) {
    const user = this.users.find(user => user.username === email);
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return this.userModel.deleteOne().where({ id }).exec();
  }

}
