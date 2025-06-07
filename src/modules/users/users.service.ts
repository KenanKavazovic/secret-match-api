import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { RegisterDto } from '../auth/dto/register.dto';

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

  async setMessage(userId: number, message?: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updated = await this.prisma.user.update({
      where: { id: userId },
      data: { message },
    });

    const cleanMessage = updated.message?.trim() ? updated.message : 'No message';
    return {
      message: cleanMessage,
      updatedAt: updated.updatedAt,
    };
  }
}
