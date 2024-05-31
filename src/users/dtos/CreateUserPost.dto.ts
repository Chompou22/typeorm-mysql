import { IsString } from 'class-validator';
export class CreateUserPostDto {
  @IsString()
  title: string;

  @IsString()
  description: string;
}
