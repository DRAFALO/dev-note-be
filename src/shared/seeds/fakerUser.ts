import { faker } from '@faker-js/faker';
import { User, UserRole } from '~/users/schema/user.schema';

export function createRandomUser(): User {
  return {
    username: faker.internet.userName(),
    password: '$2b$10$PhF.ueE6lpbsCg3eIHU9r.HlqyhWBWvDFpPobB2iir59xNiGjSdSS',
    email: faker.internet.email(),
    birth: faker.date.recent(),
    avatar: faker.image.avatar(),
    isRegisteredWithGoogle: faker.datatype.boolean(),
    follower: {},
    following: {},
    firstName: faker.internet.userName(),
    social_link: faker.internet.userName(),
    lastName: faker.internet.userName(),
    location: {},
    createAt: faker.date.recent(),
    updateAt: faker.date.recent(),
    role: UserRole.Normal,
    skills: faker.helpers.arrayElements(['surprised', 'interested']),
    tag_following: faker.internet.userName(),
  };
}

export const RandomUser: User[] = faker.helpers.multiple(createRandomUser, {
  count: 1,
});
