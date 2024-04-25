import { faker } from '@faker-js/faker';
import { Tag } from '~/tags/schema/tag.schema';

export function createRandomTags(): Tag {
  return {
    label: faker.lorem.text(),
  };
}

export const RandomTags: Tag[] = faker.helpers.multiple(createRandomTags, {
  count: 5,
});
