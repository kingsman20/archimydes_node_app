import {
  IsNumber,
  IsString,
  IsEmail,
  IsOptional,
  Length,
} from "class-validator";

export class RegisterUserDto {
  @IsEmail()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  @Length(6, 50, { message: "Password must be between 6 to 50 characters" })
  password: string;

  @IsString()
  @IsOptional()
  role: string;
}

export class LoginUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 50, { message: "Password must be between 6 to 50 characters" })
  password: number;
}
