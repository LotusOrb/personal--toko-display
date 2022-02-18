import { getConnection, Like } from "typeorm"
import { productEntity } from "../entity/product.entity"
import { imageService } from "./image.service"

const createNewProduct = async (param: productEntity): Promise<any> => {
    let ent = new productEntity(param)
    let returnData:productEntity = ent;
    let isError: boolean = false
    let message: string = ""
    const conn = getConnection('default').getRepository(productEntity)
    try {
        returnData = await conn.save(ent)
        await imageService.generateNewImage(returnData)
        message = "Sukses Menambahkan Data"
    } catch (error) {
        console.log(error)
        isError = true
        message = "Error"
    }
    
    return {
        isError,
        message,
        data: returnData
    }
}

export const productService = {
    createNewProduct,
}