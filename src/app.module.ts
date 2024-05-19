import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Post } from './typeorm/entities/Post';
import { Profile } from './typeorm/entities/Profile';
import { User } from './typeorm/entities/User';
import { UsersModule } from './users/users.module';
config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.USERNAME as string,
      password: process.env.PASSWORD as string,
      database: process.env.DATABASE as string,
      entities: [User, Profile, Post], // TypeORM entities
      synchronize: true, // Single time we modify its will automatically update
    }),
    UsersModule,
  ], // TypeORM is a tool that helps developers work with databases in their web applications, making it easier to manage data.
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
