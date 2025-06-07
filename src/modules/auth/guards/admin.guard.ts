import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { UserRequest } from 'src/interfaces/user-request.interface';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<UserRequest>();
    const user = req.user;

    if (!user?.isAdmin) {
      throw new ForbiddenException('Only admins can perform this action.');
    }

    return true;
  }
}
