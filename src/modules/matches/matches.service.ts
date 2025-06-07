import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Match } from '@prisma/client';

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

  async assignMatches() {
    const matchedUsers = await this.prisma.match.findMany({
      select: {
        participant_one_id: true,
        participant_two_id: true,
      },
    });

    const matchedUserIds = new Set<number>();
    for (const match of matchedUsers) {
      matchedUserIds.add(match.participant_one_id);
      matchedUserIds.add(match.participant_two_id);
    }
    
    const participants = await this.prisma.user.findMany({
      where: {
        joinedEvent: true,
        id: { notIn: Array.from(matchedUserIds) },
      },
    });

    if (participants.length < 2) {
      throw new BadRequestException('At least 2 participants are required.');
    }

    const shuffled = [...participants];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    const matchPromises: Promise<Match>[] = [];
    let unmatchedUser: string | null = null;

    if (shuffled.length % 2 !== 0) {
      const removed = shuffled.pop();
      unmatchedUser = removed?.email || `User ID ${removed?.id}`;
    }

    for (let i = 0; i < shuffled.length; i += 2) {
      const participant1 = shuffled[i];
      const participant2 = shuffled[i + 1];

      matchPromises.push(this.prisma.match.create({
        data: {
          participant_one_id: participant1.id,
          participant_two_id: participant2.id,
        },
      }));
    }

    await Promise.all(matchPromises);

    return {
      message: 'Participants matched in pairs.',
      unmatched: unmatchedUser ? `${unmatchedUser} was not matched due to an odd number of participants.` : null,
    };
  }
}
