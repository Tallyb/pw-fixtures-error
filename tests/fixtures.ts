import { type Locator, test as base, Page, mergeTests } from '@playwright/test';

import { timeFixtures } from './fake-time.fixtures';

type TodoPage = {
  Page: Page,
};

type MyFixtures = {
  todoPage: TodoPage;
};

const todofixtures = base.extend<MyFixtures >({
  todoPage: async ({ page }, use) => {
    const todoPage = {
      Page: page,
    };
    await use(todoPage);
  },
});

export const test = mergeTests(timeFixtures, todofixtures);
export { expect } from '@playwright/test';
