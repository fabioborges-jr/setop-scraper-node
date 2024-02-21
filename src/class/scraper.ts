import puppeteer, { Browser, Page } from "puppeteer";

class scraper{
    browser:Browser
    page:Page

    async init(){
        this.browser=await puppeteer.launch({headless:false})
        this.page=await this.browser.newPage()
    }

    async getRegions(){
        if(typeof process.env.SETOP_URL==="string")
        await this.page.goto(process.env.SETOP_URL)
                .then(()=>this.page.waitForSelector("#component > div > div > div.span-16.content.last > ul > li:nth-child(1) > a"))
                .then(()=>this.page.$$eval("div.span-16.content.last > ul > li > a", ((elements)=>elements.map(element=>console.log(element.textContent)))))
    }
}
