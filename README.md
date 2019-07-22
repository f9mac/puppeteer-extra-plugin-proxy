# puppeteer-extra-plugin-proxy

> A plugin for [puppeteer-extra](https://github.com/berstend/puppeteer-extra) to add proxy support

## Install

```bash
yarn add puppeteer-extra-plugin-proxy
# - or -
npm install puppeteer-extra-plugin-proxy
```

If this is your first [puppeteer-extra](https://github.com/berstend/puppeteer-extra) plugin here's everything you need:

```bash
yarn add puppeteer puppeteer-extra puppeteer-extra-plugin-proxy
# - or -
npm install puppeteer puppeteer-extra puppeteer-extra-plugin-proxy
```

## Usage

```js
// puppeteer-extra is a drop-in replacement for puppeteer,
// it augments the installed puppeteer with plugin functionality
const puppeteer = require('puppeteer-extra');
// require proxy plugin
const pluginProxy = require('puppeteer-extra-plugin-proxy');
// add proxy plugin without proxy crendentials
puppeteer.use(pluginProxy({
  address: '123.123.123.123',
  port: 1001
}));
// or you can specify a proxy with crendentials like so
// puppeteer.use(pluginProxy({
//   address: '123.123.123.123',
//   port: 1001,
//   credentials: {
//     username: 'user1',
//     password: '123456',
//   }
// }));

// puppeteer usage as normal
puppeteer.launch({ headless: true }).then(async browser => {
  const page = await browser.newPage()
  await page.setViewport({ width: 800, height: 600 })
  // will go through the specified proxy
  await page.goto("https://example.com")
  await page.waitFor(5000)
  await page.screenshot({ path: "testresult.png", fullPage: true })
  await browser.close()
})
```

For more info [see the tests](./test/test.js).
