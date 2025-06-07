import { Controller, Post, Req, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserRequest } from '../../interfaces/user-request.interface';

@Controller('match')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('join')
  async joinEvent(@Req() req: UserRequest) {
    return this.matchesService.joinEvent(req.user.id);
  }
}