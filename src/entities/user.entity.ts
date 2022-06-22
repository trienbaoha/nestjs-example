import { Expose } from "class-transformer";
import { SystemRole } from "src/common/enums/system.enum";
import { Column, Entity, ObjectID, ObjectIdColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @Expose()
    @ObjectIdColumn()
    _id: ObjectID;

    @Expose()
    @Column()
    fullName: string;

    @Expose()
    @Column()
    email: string

    @Expose()
    @Column({type: 'enum', enum: SystemRole, default: ()=> SystemRole.user})
    role: string;

}