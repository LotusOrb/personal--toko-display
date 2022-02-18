import { IsDefined, IsInt, IsOptional, IsString, IsUrl, Max, Min } from "class-validator";
import { Column, Entity, OneToOne } from "typeorm";
import { baseEntity } from "./base";
import { productEntity } from "./product.entity";

@Entity({
    name: 'generated_image'
})
export class generatedImageEntity extends baseEntity {
    @Column({
        nullable:false
    })
    filename?:string

    @OneToOne(() => productEntity, v => v.generatedImage) // specify inverse side as a second parameter
    product?: productEntity;
}