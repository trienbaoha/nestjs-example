import { hash } from "@common";
import { SignUpDto } from "@dtos";
import { User } from "@entities";
import { ConflictException, ForbiddenException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "@repositories";
import { compare } from "bcrypt";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService,
    ) {

    }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userRepository.findOneBy({ userName: username });
        if (user && await compare(pass, user.password)) {
            return user;
        }
        return null;
    }

    async signIn(input: SignUpDto) {
        const password = await hash(input.password);
        const user = await this.userRepository.findOneBy({ userName: input.userName });
        if (user) throw new ConflictException;
        this.userRepository.save({ ...input, password })
    }

    async login(user: User) {
        const payload = { userName: user.userName, id: user.id, roles: user.roles };
        return {
            'user': user,
            'access_token': this.jwtService.sign(payload)
        };
    }
    async getUserInfo(id: string): Promise<User> {
        return this.userRepository.findOneById(id);
    }

    async getUsers(offset: number, limit: number): Promise<any> {
        return this.userRepository.find({
            skip: offset,
            take: limit
        });
    }

}