import puppeteer, { Browser, Page } from 'puppeteer'

type references = {
  region: string[]
}

export default class Scraper {
  browser?: Browser
  page?: Page

  async init(): Promise<void> {
    if (!process.env.SETOP_URL) {
      console.error('SETOP_URL não definido')
      return
    }
    this.browser = await puppeteer.launch({ headless: false })
    this.page = await this.browser.newPage()
    await this.page.goto(process.env.SETOP_URL)
  }

  async getRegions() {
    if (!this.page || !process.env.SETOP_URL) {
      console.error('this.page ou SETOP_URL não definido')
      return
    }
    try {
      await this.page.waitForSelector(
        '#component > div > div > div.span-16.content.last > ul > li:nth-child(1) > a',
      )
      console.log('seletores')
      const regionsSelectors = await this.page.$$(
        'div.span-16.content.last > ul > li > a',
      )
      return regionsSelectors
    } catch (error) {
      console.error(error)
    }
  }

  async getReferences() {
    const regions = await this.getRegions()
    if (!this.page || !process.env.SETOP_URL || !regions) {
      console.error('this.page ou SETOP_URL não definido')
      return
    }
    try {
      const referencesList: references[] = []
      for (const region of regions) {
        if (region !== regions[0])
          await this.page.waitForSelector(
            '#component > div > div > div.span-16.content.last > ul > li:nth-child(1) > a',
          )

        await this.page.waitForSelector('::-p-text(desonera)')
        const references = await this.page.$$eval(
          '::-p-text(desoneração)',
          (references) => references.map((reference) => reference.textContent),
        )
        referencesList.push(references)
        console.log('ativado\n' + referencesList)
        // await this.page.goBack()
      }
      console.log(referencesList)
    } catch (error) {
      console.error('deu ruim:' + error)
    }
  }
}
//
