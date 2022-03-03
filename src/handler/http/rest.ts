import express, { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { productEntity } from '../../entity/product.entity';
import { productService } from '../../service/product.service';
import { apitokenMiddleware } from './middleware/apitoken.middleware';
import { validationMiddleware } from './middleware/validation.middleware';
import fs from 'fs'
import path from 'path';

const app = express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get('/og/image/:id',(req,res)=>{
    fs.readFile(path.join(__dirname,'../','../','../','public',req.params.id) + '.jpeg',{},(_,f)=>{
        res.header('content-type','image/jpeg')
        if(_){
            res.send(_)
        }else{
            res.send(f)
        }
    })
})
app.get('/',express.static(path.join(__dirname,'../','../','../','poc')))


// app.use(apitokenMiddleware)
app.get('/admin', async (req: Request, res: Response) => {
    res.send('listproduct')
})
app.post('/admin/create', validationMiddleware(productEntity), async (req, res) => {
    let r = await productService.createNewProduct(req.body)
    res.status(201).send(r)
})

app.post('/admin/update')
app.post('/admin/delete')



export default app 