import { NextFunction, Request, Response } from "express";

export const apitokenMiddleware =  (req: Request, res: Response, next: NextFunction) => {
    if(req.headers['x-api-key'] === 'dummy'){
        next()
    }else{
        res.status(401).send({
            data:{},
            message:'Unauthorized'
        })
    }
}