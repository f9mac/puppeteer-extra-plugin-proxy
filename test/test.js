/* eslint-env node, mocha */
const assert = require('assert');
const puppeteer = require('puppeteer-extra');
const pluginProxy = require('../src');
const config = require('./config');

const IP_API_SERVICE = 'https://api.myip.com/';

describe('PuppeteerExtraPluginProxy', () => {
  // reset the plugins to a clean slate for each test
  beforeEach(() => (puppeteer._plugins = []))

  context('without credentials', () => {
    it('works', async () => {
      puppeteer.use(pluginProxy(config.withoutCredentials));
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      try {
        const response = await page.goto(IP_API_SERVICE, {waitUntil: 'domcontentloaded'});
        const body = JSON.parse(await response.text());
        assert.equal(body.ip, config.withoutCredentials._expectedAddress, `Unexpected IP ${body.ip}`);
      } catch (e) {
        browser.close();
        throw e
      }

      browser.close();
    }).timeout(10000);
  });

  context('with credentials', () => {

    it('works', async () => {
      puppeteer.use(pluginProxy(config.withCredentials));
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      try {
        const response = await page.goto(IP_API_SERVICE, {waitUntil: 'domcontentloaded'});
        const body = JSON.parse(await response.text());
        assert.equal(body.ip, config.withCredentials._expectedAddress, `Unexpected IP ${body.ip}`);
      } catch (e) {
        browser.close();
        throw e
      }

      browser.close();
    }).timeout(10000);
  });
});
