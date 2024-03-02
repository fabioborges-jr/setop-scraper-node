import Scraper from './class/scraper'

async function main() {
  const scraper = new Scraper()
  await scraper.init()
  const references = await scraper.getReferences()
  if (!references) {
    console.error('references not existe')
  } else {
    references.map((referenceRegion) => console.log(referenceRegion))
  }
}

main()
