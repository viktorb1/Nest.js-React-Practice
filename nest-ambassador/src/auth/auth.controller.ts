import { BadRequestException, Body, Controller, NotFoundException, Post, Res, Get, Req, ClassSerializerInterceptor, UseInterceptors, UseGuards, Put, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express'
import { AuthGuard } from './auth.guard';

@Controller() // prefix can be included inside on controller
export class AuthController {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
        ) {}
    
    @Post(['admin/register', 'ambassador/register'])
    async register(@Body() body: RegisterDto, @Req() request: Request) {
        const {password_confirm, ...data} = body;

        if (body.password !== body.password_confirm) {
            throw new BadRequestException('Passwords do not match')
        }

        const hashed = await bcrypt.hash(body.password, 12)

        return this.userService.save({
            ...data,
            password: hashed,
            is_ambassador: request.path == '/api/ambassador/register'
        }) // returning hashed function??
    }

    @Post(['admin/login', 'ambassador/login'])
    async login(
        @Body('email') email: string, 
        @Body('password') password: string,
        @Res({passthrough: true}) response: Response,
        @Req() request: Request
    ) {
        const user = await this.userService.findOne({where: {email: email}})

        if (!user) {
            throw new NotFoundException('User not found')
        }

        if (!await bcrypt.compare(password, user.password)) {
            throw new BadRequestException('Invalid credentials');
        }

        const adminLogin = request.path == '/api/admin/login';

        if (user.is_ambassador && adminLogin) {
            throw new UnauthorizedException()
        }

        const jwt = await this.jwtService.signAsync({
            id: user.id,
            scope: adminLogin ? 'admin' : 'ambassador'
        })

        response.cookie('jwt', jwt, {httpOnly: true})

        return {
            message: "success"
        }
    }

    @UseGuards(AuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    @Get(['admin/user', 'ambassador/user'])
    async user(@Req() request: Request) {
        const cookie = request.cookies['jwt']

        const {id} = await this.jwtService.verifyAsync(cookie);

        if (request.path === '/api/admin/user') {
            return await this.userService.findOne({where: {id}})
        }

        const user = await this.userService.findOne({where: {id,
        }, 
        relations: ['orders', 'orders.order_items']
    })
        const {password, ...u } = user

        return {
            ...u,
            revenue: user.revenue
        }
    }

    @UseGuards(AuthGuard)
    @Post(["admin/logout", "ambassador/logout"])
    async logout(@Res({passthrough: true}) response: Response) {
        response.clearCookie('jwt')

        return {
            message: "success"
        }
    }

    @UseGuards(AuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    @Put(['admin/users/info', 'ambassador/users/info'])
    async updateInfo(
        @Req() request: Request,
        @Body('first_name') first_name: string,
        @Body('last_name') last_name: string,
        @Body('email') email: string,
    ) {
        const cookie = request.cookies['jwt'];
        const {id} = await this.jwtService.verifyAsync(cookie);

        await this.userService.update(id, {
            first_name,
            last_name,
            email
        })

        return this.userService.findOne({where:{id}})
    }

    @UseGuards(AuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    @Put(['admin/users/password', 'ambassador/users/password'])
    async updatePassword(
        @Req() request: Request,
        @Body('password') password: string,
        @Body('password_confirm') password_confirm: string,
    ) {
        if (password !== password_confirm) {
            throw new BadRequestException("Passwords do not match!")
        }

        const cookie = request.cookies['jwt'];
        const {id} = await this.jwtService.verifyAsync(cookie);

        await this.userService.update(id, {
            password: await bcrypt.hash(password, 12)
        })

        return this.userService.findOne({where: {id}})
    }
}
