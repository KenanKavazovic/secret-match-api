import { Controller, Patch, Req, UseGuards, HttpCode, HttpStatus, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserRequest } from '../../interfaces/user-request.interface';
import { SetMessageDto } from './dto/set-message.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch('message')
  async setMessage(@Req() req: UserRequest, @Body() body: SetMessageDto) {
  return this.usersService.setMessage(req.user.id, body.message);
  }
}
