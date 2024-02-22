import Scraper from './class/Scraper'

async function main() {
  const scraper = new Scraper()
  await scraper.init()
  await scraper.getRegions()
}

main()
