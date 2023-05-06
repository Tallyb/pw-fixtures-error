import { type Locator, test as base, Page } from '@playwright/test';

import { fakeTimeFixtures, FakeTimeFixtures } from './fake-time.fixtures';

type TodoPage = {
  Page: Page, 
};

type MyFixtures = {
  todoPage: TodoPage;
};

export const test = base.extend<MyFixtures & FakeTimeFixtures >({
  ...fakeTimeFixtures, 
  todoPage: async ({ page }, use) => {
    const todoPage = {
      Page: page,
    };
    await use(todoPage);
  },



});

export { expect } from '@playwright/test';
