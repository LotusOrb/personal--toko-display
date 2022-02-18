import { BeforeUpdate, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class baseEntity {
    @PrimaryGeneratedColumn()
    id?: number

    @CreateDateColumn()
    created_at?: Date

    @UpdateDateColumn()
    updated_at?: Date

    @BeforeUpdate()
    updateUpdatedAt?() {
        this.updated_at = new Date()
    }
    

}