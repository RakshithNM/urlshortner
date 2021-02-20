import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity()
export class Url extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fullUrl: string;

    @Column()
    shortUrl: string;

}
