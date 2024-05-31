import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';
export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNumberString()
  password: string;
}
