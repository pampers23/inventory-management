import { Injectable, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async register(createAuthDto: CreateAuthDto) {
    const existingUser = await this.userService.findByEmail(
      createAuthDto.email,
    );

    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(createAuthDto.password, 10);

    const user = await this.userService.create({
      ...createAuthDto,
      password: hashedPassword,
    });

    return {
      message: 'User registered successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }
}
