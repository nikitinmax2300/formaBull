/* eslint-disable consistent-return */
/* eslint-disable no-undef */
const Application = require('spectron').Application;
const electronPath = require('electron');
const path = require('path');

let app;

beforeAll(() => {
  app = new Application({
    path: electronPath,
    chromeDriverArgs: [
      'headless',
      '--no-sandbox',
      '--whitelisted-ips=',
      '--disable-dev-shm-usage',
    ],
    args: [path.join(__dirname, '..')],
  });
  return app.start();
}, 15000);

afterAll(() => {
  if (app && app.isRunning()) {
    return app.stop();
  }
});

test('Displays App window', async () => {
  const windowCount = await app.client.getWindowCount();

  expect(windowCount).toBe(2);
});

test('should launch app', async () => {
  const devTitle = await app.client.getTitle();
  expect(devTitle).toBe('DevTools');
});
