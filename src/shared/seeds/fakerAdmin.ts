import { faker } from '@faker-js/faker';
import { User, UserRole } from '~/users/schema/user.schema';

export function createRandomAdmin(): User {
  return {
    username: faker.internet.userName(),
    password: faker.image.avatar(),
    email: faker.internet.email(),
    birth: faker.date.recent(),
    isRegisteredWithGoogle: faker.datatype.boolean(),
    avatar: faker.image.avatar(),
    follower: {},
    following: {},
    social_link: faker.internet.userName(),
    firstName: faker.internet.userName(),
    lastName: faker.internet.userName(),
    location: {},
    createAt: faker.date.recent(),
    updateAt: faker.date.recent(),
    role: UserRole.Admin,
    skills: faker.helpers.arrayElements(['surprised', 'interested']),
    tag_following: faker.internet.userName(),
  };
}

export const RandomAdmin: User[] = faker.helpers.multiple(createRandomAdmin, {
  count: 1,
});
