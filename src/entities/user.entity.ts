import { Expose, plainToClass } from "class-transformer";
import { SystemRole } from "src/common/enums/system-role.enum";
import { Column, CreateDateColumn, Entity, ObjectID, ObjectIdColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class User {
    @Expose()
    @ObjectIdColumn()
    _id: ObjectID;

    @Expose()
    @Column()
    fullName: string;

    @Expose()
    @Column({ unique: true })
    userName: string;

    @Expose()
    @Column({ unique: true })
    email: string

    @Expose()
    @Column({ type: 'enum', enum: SystemRole, default: () => SystemRole.USER })
    role: string;

    @Expose()
    @Column()
    password: string;

    @Expose()
    @Column({ nullable: true })
    avt?: string;

    @Expose()
    @CreateDateColumn()
    createdAt: Date;

    @Expose()
    @UpdateDateColumn()
    updatedAt: Date;

    constructor(user: Partial<User>) {
        Object.assign(this, plainToClass(User, user, {
            excludeExtraneousValues: true
        }))
    }

}