import { IsDefined, IsInt, IsOptional, IsString, IsUrl, Max, Min } from "class-validator";
import { BeforeInsert, Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { baseEntity } from "./base";
import { generatedImageEntity } from "./generatedImage.entity";

@Entity({
    name: 'product'
})
export class productEntity extends baseEntity {
    constructor(param?: productEntity) {
        super()
        if (param) {
            this.storeId = param.storeId
            this.productName = param.productName
            this.featuredImage = param.featuredImage
            this.price = param.price
            this.rating = param.rating
            this.description = param.description
        }
    }

    @Column({
        name: 'store_id',
        nullable: false
    })
    @IsString({ message: 'string atau UUID' })
    storeId?: string

    @Column({
        name: 'product_name',
        nullable: false
    })
    @IsString({ message: 'Nama Produk Dibutuhkan' })
    productName!: string

    @Column({
        name: 'featured_image',
        nullable: false
    })
    @IsString({ message: 'Gambar Produk Dibutuhkan' })
    @IsUrl({}, { message: 'URL Gambar Produk Harus Valid' })
    featuredImage!: string

    @Column()
    @IsString({ message: 'Deskripsi Produk Dibutuhkan' })
    description!: string

    @Column({
        nullable: true
    })
    slug?: string

    @Column({
        nullable: false,
    })
    @IsDefined({ message: 'Harga dibutuhkan' })
    @IsInt({ message: 'Harga berbentuk integer / float' })
    price!: number

    @Column({
        nullable: false,
    })
    @IsDefined({ message: 'Rating dibutuhkan' })
    @IsInt({ message: 'Rating berbentuk integer / float' })
    @Min(0, { message: 'Rating Minimum 0' })
    @Max(5, { message: 'Rating Maximum 5' })
    rating!: number

    @OneToOne(() => generatedImageEntity, v => v.product) // specify inverse side as a second parameter
    @JoinColumn({
        name: "generated_image"
    })
    generatedImage?: generatedImageEntity;

    @BeforeInsert()
    handleSlug() {
        this.slug = this.productName.split(" ").join("-")
    }
}