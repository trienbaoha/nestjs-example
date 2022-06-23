import { hash } from "@common";
import { SignUpDto } from "@dtos";
import { User } from "@entities";
import { ConflictException, ForbiddenException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import passport from "passport";
import { UserRepository } from "src/repositories/user.repository";
import { MongoRepository } from "typeorm";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: UserRepository
    ) {

    }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userRepository.findOneBy({ userName: username });
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async SignIn(input: SignUpDto) {
        const password = await hash(input.password);
        const user = await this.userRepository.findOneBy({ userName: input.userName });
        if (user) throw new ConflictException;
        this.userRepository.save({ ...input, password })
    }
}