import { test as base } from '@playwright/test';

export type FakeTimeFixtures = {
  useFakeTime: (dateTime: string) => Promise<void>
};

export const fakeTimeFixtures = base.extend<FakeTimeFixtures>({
  useFakeTime: async ({ page }, use) => {
    const addFakeTimeScript = async (dateTime: string): Promise<void> => {
      const fakeNow = new Date(dateTime).valueOf();
      await page.addInitScript(`{
        // Extend Date constructor to default to fakeNow
        Date = class extends Date {
          constructor(...args) {
            if (args.length === 0) {
              super(${fakeNow});
            } else {
              super(...args);
            }
          }
        }
        // Override Date.now() to start from fakeNow
        const __DateNowOffset = ${fakeNow} - Date.now();
        const __DateNow = Date.now;
        Date.now = () => __DateNow() + __DateNowOffset;
      }`);  
    };
    await use(addFakeTimeScript);
  }
});