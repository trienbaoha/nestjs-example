import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose, plainToClass } from "class-transformer";
import { SystemRole } from "src/common/enums/system-role.enum";
import { Column, CreateDateColumn, Entity, ObjectID, ObjectIdColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class User {
    @Exclude({ toPlainOnly: true })
    @ObjectIdColumn()
    _id: ObjectID;

    @ApiProperty()
    @Expose()
    get id(): String { return this._id ? `${this._id}` : undefined }

    @Expose()
    @Column()
    fullName: string;

    @Expose()
    @ApiProperty()
    @Column({ unique: true })
    userName: string;

    @Expose()
    @ApiProperty()
    @Column({ unique: true })
    email: string

    @Exclude({ toPlainOnly: true })
    @ApiProperty()
    @Column({ type: 'enum', enum: SystemRole, default: () => SystemRole.USER })
    role: string;

    @ApiProperty()
    @Exclude({ toPlainOnly: true })
    @Column()
    password: string;

    @Expose()
    @ApiProperty({nullable: true})
    @Column({ nullable: true })
    avt?: string;

    @Exclude({ toPlainOnly: true })
    @CreateDateColumn()
    createdAt: Date;

    @Exclude({ toPlainOnly: true })
    @UpdateDateColumn()
    updatedAt: Date;

    constructor(user: Partial<User>) {
        Object.assign(this, plainToClass(User, user, {
            excludeExtraneousValues: true
        }))
    }

}