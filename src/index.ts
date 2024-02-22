import Scraper from './class/scraper'

async function main() {
  const scraper = new Scraper()
  await scraper.init()
  await scraper.getReferences()
}

main()
