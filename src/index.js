const { PuppeteerExtraPlugin } = require('puppeteer-extra-plugin');

class Plugin extends PuppeteerExtraPlugin {
  constructor (config = {}) {
    super(config);
  }

  get name () {
    return 'proxy'
  }

  get defaults () {
    return {
      _placeholder: ''
    }
  }

  async beforeLaunch (options) {
    const proxyArg = `--proxy-server=${this.opts.address}:${this.opts.port}`;
    this.debug('adding browser arg: %s', proxyArg);
    options.args.push(proxyArg)
    return options;
  }

  async onPageCreated (page) {
    if (this.opts.credentials === Object(this.opts.credentials)) {
      if (typeof this.opts.credentials.username !== 'string') {
        throw new Error('Puppeteer Plugin Proxy expected `credentials.username` to be a string');
      }
      if (typeof this.opts.credentials.password !== 'string') {
        throw new Error('Puppeteer Plugin Proxy expected `credentials.password` to be a string');
      }
      this.debug(`authenticate proxy: (U ${this.opts.credentials.username}, P [Secret])`);
      return page.authenticate(this.opts.credentials);
    } else {
      this.debug(`no proxy authentication credentials provided`);
    }
  }

}

module.exports = pluginConfig => new Plugin(pluginConfig);
