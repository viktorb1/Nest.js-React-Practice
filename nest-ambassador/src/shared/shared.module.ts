import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';
import { RedisService } from './redis.service';


@Module({
    imports: [
        JwtModule.register({
            secret: 'secret',
            signOptions: {expiresIn: '1d'}
          }),
          CacheModule.register({
            // @ts-ignore
            store: async () => await redisStore({
              // Store-specific configuration:
              socket: {
                host: 'redis',
                port: 6379,
              }
            })
          }),
      
    ],
    providers: [RedisService],
    exports: [JwtModule, CacheModule, RedisService]
})
export class SharedModule {}
