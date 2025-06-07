import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class MatchesService {
  constructor(private readonly prisma: DatabaseService) {}

  async joinEvent(userId: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found.');
    }

    if (user.joinedEvent) {
      throw new BadRequestException('You have already joined the event.');
    }

    await this.prisma.user.update({
      where: { id: userId },
      data: { joinedEvent: true },
    });

    return { message: 'Successfully joined the Secret Match event.' };
  }
}
