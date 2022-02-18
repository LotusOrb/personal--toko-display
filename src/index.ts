import { createConnection } from 'typeorm'
import { glob } from 'glob';
import path from 'path';
import rest from './handler/http/rest'
import fs from 'fs/promises';
class boot {
    constructor() {
        this.bootAll()
    }

    private async bootAll(){
        await this.bootDatabase()
        await this.bootRest()
        this.bootScheduler()
    }

    private async bootRest() {
        try {
            rest.listen(3000)
            console.log('REST SERVER BOOTED WITHOUT ERROR')
        } catch (err) {
            console.log('REST SERVER ERROR')
        }
    }

    private async bootDatabase() {
        try {
            await createConnection({
                name: 'default',
                type: 'better-sqlite3',
                database: 'database.db',
                entities: ['{src,dist}/entity/*.entity.{ts,js}'],
                synchronize: true,
                logging:false,
            })
            console.log('DATABASE BOOTED WITHOUT ERROR')
        } catch (error) {
            console.log('DATABASE ERROR')
        }
    }

    private bootScheduler(){
        glob(path.join(__dirname,'..','public','*.{png,jpeg}'),(_,arrFile)=>{
            arrFile.forEach((pt)=>{
                fs.unlink(pt)
            })
        })
    }
}
new boot()
