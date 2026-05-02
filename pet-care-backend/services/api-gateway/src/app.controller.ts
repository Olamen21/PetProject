import { Controller, Get } from '@nestjs/common';
import { Roles } from './auth/decorators/roles.decorator';
import { Role } from './auth/role.enum';
import { Public } from './auth/decorators/public.decorator';

@Controller()
export class AppController {
  @Public()
  @Get('test-public')
  testPublic() {
    return 'Ai cũng vào được!';
  }

  @Get('test-jwt')
  testJwt() {
    return 'Có token mới cho vào';
  }

  @Roles(Role.ADMIN)
  @Get('test-admin')
  testAdmin() {
    return 'Chỉ admin mới được vào';
  }
}
