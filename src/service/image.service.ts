import path from "path";
import puppeteer from "puppeteer"
import fs from 'fs/promises'
import ejs from 'ejs'
import { productEntity } from "../entity/product.entity";
const generateNewImage = async (param?:productEntity) => {
    const template = await (await fs.readFile(path.join(__dirname, '../', '../', 'template/', 'template_one.ejs'))).toString()
    const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'],defaultViewport:{
        width:1200,
        height:600
    } });
    const page = await browser.newPage();
    await page.waitForNetworkIdle()
    await page.setContent(ejs.render(template,{data:param}))
    await page.screenshot({ path: path.join(__dirname, '../', '../', 'public/') + `OG-Image_${param?.id}-${param?.slug}-${param?.rating}.jpeg` });
    await browser.close();
}

const getImage = (filename: string) => {

}

const deleteStaticFile = () => { }

const generateAllImage = () => { }

export const imageService = {
    generateNewImage
}