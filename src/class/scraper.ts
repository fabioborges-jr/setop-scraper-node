import puppeteer, { Browser, Page } from "puppeteer";

class scraper{
    browser:Browser
    page:Page

    async init(){
        this.browser=await puppeteer.launch({headless:false})
        this.page=await this.browser.newPage()
    }

}