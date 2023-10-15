import { test as base } from '@playwright/test';

export type TimeFixtures = {

  fakeTime?: string;
  advanceTime?: (s: number) => Promise<void>;
};

export const timeFixtures = base.extend<TimeFixtures>({
  fakeTime: undefined,
  context: async ({ context, fakeTime }, use) => {

    if(fakeTime) {
      await context.addInitScript({path: require.resolve('sinon/pkg/sinon.js')});
      await context.addInitScript(`
        window.__clock = window.sinon.useFakeTimers({now: new Date('${fakeTime}').getTime(), shouldAdvanceTime: true});
      `);
    }

    await use(context);
  },

  advanceTime: async ({ page }, use) => {
    async function changeClockTime (seconds: number): Promise<void> {
      await page.evaluate((s) =>
    //@ts-ignore
    window['__clock'].tick(s * 1000), seconds
      );
    }
    await use(changeClockTime);
  }

});
