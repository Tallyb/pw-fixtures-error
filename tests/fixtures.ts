import { type Locator, test as base, Page, mergeTests } from '@playwright/test';

import { fakeTimeFixtures, FakeTimeFixtures } from './fake-time.fixtures';

type TodoPage = {
  Page: Page,
};

type MyFixtures = {
  todoPage: TodoPage;
};

const todoPage = base.extend<MyFixtures & FakeTimeFixtures >({
  todoPage: async ({ page }, use) => {
    const todoPage = {
      Page: page,
    };
    await use(todoPage);
  },
});

export const test = mergeTests(todoPage, fakeTimeFixtures);
export { expect } from '@playwright/test';
