import { Injectable, ConflictException, Inject, forwardRef } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { hash } from 'src/utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: DatabaseService,
    @Inject(forwardRef(() => UsersService)) private usersService: UsersService,
    ) {}

 async register(dto: RegisterDto) {
  const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
  if (existing) {
    throw new ConflictException('User with that email already exists.');
  }

  const hashedPassword = await hash(dto.password);
  const user = await this.usersService.create(dto, hashedPassword);

  const { password, ...result } = user;
  return result;
 }
}
