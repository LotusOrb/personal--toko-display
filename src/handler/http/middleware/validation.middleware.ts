import { validate } from "class-validator"
import e, { NextFunction, Request, Response } from "express"

export const validationMiddleware = (param: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        console.log(req.body)
        let nErr: { [i: string]: any } = {};
        let validationErr = await validate(new param(req.body))
        validationErr.forEach(ct => {
            nErr[ct.property] = Object.values(ct.constraints || {}).join(',')
        })
        if (validationErr.length > 0) {
            res.status(400).send({
                data: nErr,
                message: 'Terjadi Kesalahan Validasi',
            })
        } else {
            next()
        }
    }
}