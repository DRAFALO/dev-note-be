import { faker } from '@faker-js/faker';
import { Article, TypeArticle } from '~/articles/schema/article.schema';

export function createRandomArticles(): Article {
  return {
    title: faker.lorem.paragraphs(1),
    banner: faker.image.avatar(),
    content: faker.lorem.paragraphs(5),
    emotion: faker.helpers.arrayElements(['surprised', 'interested']),
    author: faker.internet.userName(),
    createAt: faker.date.recent(),
    updateAt: faker.date.recent(),
    tag: faker.helpers.arrayElements(['1', '2', '3']),
    watchLater: faker.datatype.boolean(),
    type: faker.helpers.enumValue(TypeArticle),
  };
}

export const RandomArticles: Article[] = faker.helpers.multiple(
  createRandomArticles,
  {
    count: 5,
  },
);
