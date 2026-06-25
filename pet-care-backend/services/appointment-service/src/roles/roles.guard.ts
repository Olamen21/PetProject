import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();

    const userRole = request.headers['x-user-role'];

    if (!userRole) {
      throw new ForbiddenException(
        'Không tìm thấy thông tin phân quyền từ Gateway',
      );
    }
    const hasRole = requiredRoles.includes(String(userRole));
    if (!hasRole) {
      throw new ForbiddenException(
        'Bạn không có quyền truy cập chức năng này!',
      );
    }

    return true;
  }
}
