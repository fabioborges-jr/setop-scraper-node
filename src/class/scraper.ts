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
      const regionsSelectors = await this.page.$$(
        'div.span-16.content.last > ul > li > a',
      )
      regionsSelectors[0].click()
      return regionsSelectors
    } catch (error) {
      console.error(error)
    }
  }

  // async getReferences() {
  //   if (!this.page || !process.env.SETOP_URL) {
  //     console.error('this.page ou SETOP_URL não definido')
  //     return
  //   }
  //   try {
  //     const

  //   } catch (error) {
  //     console.error(error)
  //   }
  // }
}
