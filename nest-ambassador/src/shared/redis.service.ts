import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject, Injectable } from "@nestjs/common";
import {Cache} from "cache-manager";
import { RedisClientType } from "redis";


@Injectable()
export class RedisService {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) {}

    getClient() {
        const store: any = this.cacheManager.store;
        return store.getClient();
    }
}