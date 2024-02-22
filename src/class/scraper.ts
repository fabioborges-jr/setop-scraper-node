import puppeteer, { Browser, Page } from 'puppeteer'

export default class Scraper {
  browser?: Browser
  page?: Page

  async init(): Promise<void> {
    this.browser = await puppeteer.launch({ headless: false })
    this.page = await this.browser.newPage()
  }

  async getRegions() {
    if (!this.page || !process.env.SETOP_URL) {
      console.error('this.page ou SETOP_URL não definido')
      return
    }
    try {
      await this.page.goto(process.env.SETOP_URL)
      await this.page.waitForSelector(
        '#component > div > div > div.span-16.content.last > ul > li:nth-child(1) > a',
      )
      console.log('seletores')
      const regionsSelectors = await this.page.$$eval(
        'div.span-16.content.last > ul > li > a',
        (elements) => elements.map((element) => element.textContent),
      )
      console.log(regionsSelectors)
    } catch (error) {
      console.error(error)
    }
  }
}
