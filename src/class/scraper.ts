import puppeteer, { Browser, Page } from 'puppeteer'

type Reference = {
  descriptionHref: string | null
  date: string | null
  href: string | null
  format: string | null
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

  async getRegionsElements() {
    if (!this.page || !process.env.SETOP_URL) {
      console.error('this.page ou SETOP_URL não definido')
      return
    }
    try {
      await this.page.waitForSelector(
        '#component > div > div > div.span-16.content.last > ul > li:nth-child(1) > a',
      )
      const regionsElements = await this.page.$$(
        'div.span-16.content.last > ul > li > a',
      )
      return regionsElements
    } catch (error) {
      console.error(error)
    }
  }

  async getReferences() {
    const regions = await this.getRegionsElements()
    const referencesList: Reference[][] = []

    if (!this.page || !process.env.SETOP_URL || !regions) {
      console.error('this.page ou SETOP_URL não definido')
      return
    }

    try {
      for (const region of regions) {
        const regionsElements = await this.getRegionsElements()
        const indexRegion = regions.indexOf(region)

        if (!regionsElements) {
          console.error('erro')
          return
        }

        await regionsElements[indexRegion].click()
        await this.page.waitForNavigation()
        const referencesRegion = await this.page.$$eval(
          '::-p-text(desoneração)',
          (references) =>
            references.map((referenceElement) => {
              const reference: Reference = {
                descriptionHref: referenceElement.textContent,
                date: referenceElement.getAttribute('href'),
                href: referenceElement.getAttribute('href'),
                format: referenceElement.textContent,
              }
              return reference
            }),
        )
        referencesList.push(referencesRegion)
        console.log(referencesList)
        await this.page.goBack()
      }
      console.log(referencesList)
    } catch (error) {
      console.error('deu ruim:' + error)
    }
  }
}
