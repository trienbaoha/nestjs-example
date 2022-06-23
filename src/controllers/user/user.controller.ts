import { SignUpDto } from "@dtos";
import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { UserService } from "@services";

@Controller('users')
@ApiTags('Users')
export class UserController {

    constructor(private readonly userService: UserService) { }
    @Post("signup")
    @ApiBody({ type: SignUpDto, required: true, description: 'Đăng ký tài khoản mới' })
    async SignIn(@Body() input: SignUpDto) {
        return this.userService.SignIn(input);
    }


}