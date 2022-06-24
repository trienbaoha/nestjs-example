import { JwtAuthGuard, LocalAuthGuard, Roles } from "@common";
import { LoginDto, SignUpDto } from "@dtos";
import { User } from "@entities";
import { Body, ClassSerializerInterceptor, Controller, DefaultValuePipe, Get, HttpCode, ParseIntPipe, Post, Query, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiConflictResponse, ApiCreatedResponse, ApiOkResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserService } from "@services";
import { equal } from "assert";
import { RolesGuard } from "src/common/guards/role.guard";

@Controller('users')
@ApiBearerAuth()
@ApiTags('Users')
export class UserController {

    constructor(private readonly userService: UserService) { }
    @Post("signup")
    @ApiConflictResponse({ description: 'username đã tồn tại' })
    @ApiCreatedResponse({ description: 'Tạo tài khoản thành công' })
    @ApiBody({ type: SignUpDto, required: true, description: 'Đăng ký tài khoản mới' })
    async SignIn(@Body() input: SignUpDto) {
        await this.userService.signIn(input);
    }


    @Post("login")
    @HttpCode(200)
    @UseGuards(LocalAuthGuard)
    @ApiOkResponse({ description: 'Đăng nhập thành công', })
    @ApiBody({ type: LoginDto })
    @UseInterceptors(ClassSerializerInterceptor)
    async login(@Req() req: any) {
        return this.userService.login(req.user);
    }

    @Get("me")
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({ description: 'Lấy thông tin user thành công', type: User })
    async me(@Req() req: any): Promise<User> {
        return this.userService.getUserInfo(req.user.id);
    }

    @Get()
    @UseGuards(RolesGuard)
    @Roles('admin')
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({ description: 'Lấy thông ds user', type: User, isArray: true })
    async users(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    ) {
        const offset = (page -1)*limit;
        return this.userService.getUsers(offset,limit);
    }
}