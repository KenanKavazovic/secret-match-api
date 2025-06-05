import { Injectable, BadRequestException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { RegisterDto } from '../auth/dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
 constructor(private prisma: DatabaseService) {}
    
 async create(dto: RegisterDto, hashedPassword: string) {
  try {
    return await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: hashedPassword,
      },
    });
  } catch (error) {
    throw new BadRequestException('Something went wrong while creating a new user');
  }
}

}
