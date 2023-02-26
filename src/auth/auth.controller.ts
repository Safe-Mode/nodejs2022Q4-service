import { Body, Controller, Post, UseGuards, Request, HttpCode } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @Post('signup')
    signup(@Body() createUserDto: CreateUserDto) {
        return this.authService.signup(createUserDto);
    }

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('login')
    @HttpCode(200)
    login(@Request() req) {
        return this.authService.login(req.user);
    }
}