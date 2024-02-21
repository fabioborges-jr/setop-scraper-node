import puppeteer, { Browser, Page } from "puppeteer";

class scraper{
    browser:Browser
    page:Page

    async init(){
        this.browser=await puppeteer.launch()
        this.page=await this.browser.newPage()
    }

    async goesTo(url:string){
        await this.page.goto(url)
    }
}