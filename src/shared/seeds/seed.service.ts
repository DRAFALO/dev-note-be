import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Command } from 'nestjs-command';
import { usersToSeed } from '../data/user.data';
import { lessonToSeed } from '../data/lesson.data';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '~/users/schema/users.schema';
import { Lesson, LessonDocument } from '~/lessons/schema/lesson.schema';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel(User.name)
    private usersModel: Model<UserDocument>,
    @InjectModel(Lesson.name)
    private lessonModel: Model<LessonDocument>,
  ) { }

  @Command({ command: 'data:import', describe: 'Seeding data' })
  async create() {
    await this.seedUsers();
    await this.seedLessons();
  }

  private async seedUsers() {
    try {
      await this.usersModel.deleteMany();
      const users = usersToSeed.map(userData => new this.usersModel(userData));
      await this.usersModel.insertMany(users);
      console.log(`CREATE ${users.length} USER SUCCESSFULLY!!`);
    } catch (error) {
      console.error('Error seeding users:', error);
    }
  }

  private async seedLessons() {
    try {
      await this.lessonModel.deleteMany();
      const lessons = lessonToSeed.map(lessonData => new this.lessonModel(lessonData));
      await this.lessonModel.insertMany(lessons);
      console.log(`CREATE ${lessons.length} LESSON SUCCESSFULLY!!`);
    } catch (error) {
      console.error('Error seeding lessons:', error);
    }
  }
}