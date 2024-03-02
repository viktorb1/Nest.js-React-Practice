import { NestFactory } from "@nestjs/core";
import { AppModule } from "../app.module";
import { UserService } from "../user/user.service";
import { faker } from '@faker-js/faker';
import * as bcrypt from "bcryptjs";

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    
    const userService = app.get(UserService);

    const password = await bcrypt.hash("1234", 12);

    for (let i = 0; i < 30; i++) {
        await userService.save({
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password,
            is_ambassador: true
        })
    }
    await app.close();
  }

  bootstrap();
