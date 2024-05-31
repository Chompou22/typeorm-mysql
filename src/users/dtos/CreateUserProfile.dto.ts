import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserProfileDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsNumber()
  age: number;

  @IsString()
  dob: string;
}
