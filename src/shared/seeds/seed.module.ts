// import { Module } from '@nestjs/common';
// import { CommandModule } from 'nestjs-command';
// import { SeedService } from './services/seed.service';
// import { MongooseModule } from '@nestjs/mongoose';
// import { User, UserSchema } from '~/users/schema/users.schema';
// import { Lesson, LessonSchema } from '~/lessons/schema/lesson.schema';

// @Module({
//   imports: [
//     MongooseModule.forFeature([
//       {
//         name: User.name,
//         schema: UserSchema,
//       },
//       {
//         name: Lesson.name,
//         schema: LessonSchema,
//       },
//     ]),
//     CommandModule],
//   providers: [
//     SeedService,
//   ],
// })
// export class SeedsModule { }