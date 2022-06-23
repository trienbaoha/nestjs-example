import { SystemRole } from "@common";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, isNotEmpty, IsNotEmpty } from "class-validator";


export class SignUpDto {

  @IsNotEmpty()
  @ApiProperty()
  fullName: string;

  @IsNotEmpty()
  @ApiProperty()
  userName: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @ApiProperty({ type: 'enum', enumName: 'role', enum: SystemRole, default: () => SystemRole.USER })
  role: SystemRole;
}