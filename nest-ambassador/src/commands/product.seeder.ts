import { NestFactory } from "@nestjs/core";
import { AppModule } from "../app.module";
import { ProductService } from "../product/product.service";
import { faker } from '@faker-js/faker';
import { randomInt } from "crypto";

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    
    const productService = app.get(ProductService);

    for (let i = 0; i < 30; i++) {
        await productService.save({
            title: faker.lorem.words(2),
            description: faker.lorem.words(10),
            image: faker.image.url(),
            price: randomInt(10, 100)
        })
    }
    await app.close();
  }

  bootstrap();
