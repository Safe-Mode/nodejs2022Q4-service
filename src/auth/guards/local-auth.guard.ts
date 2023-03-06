import {
  BadRequestException,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  getAuthenticateOptions(context: ExecutionContext) {
    const { login, password } = context.getArgByIndex(0).body as CreateUserDto;

    if (!login || !password) {
      throw new BadRequestException();
    }

    return super.getAuthenticateOptions(context);
  }
}
