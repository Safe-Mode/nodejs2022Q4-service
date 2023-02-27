import { Body, Controller, Post, UseGuards, Req, HttpCode } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RefreshTokenGuard } from './guards/refresh-auth.guard';

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
    login(@Req() req) {
        return this.authService.login(req.user);
    }

    @UseGuards(RefreshTokenGuard)
    @Post('refresh')
    refreshTokens(@Req() { user, body }: Request) {
        return this.authService.refreshTokens(user['sub'], body.refreshToken);
    }
}