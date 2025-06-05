import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { MatchesModule } from './modules/matches/matches.module';
import { DatabaseModule } from './modules/database/database.module';

@Module({
  imports: [AuthModule, UsersModule, MatchesModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
