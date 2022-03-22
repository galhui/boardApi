import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createConnection } from 'typeorm';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'mysql',
                host: configService.get('database.host'),
                port: +configService.get<number>('database.port'),
                username: configService.get('database.user'),
                password: configService.get('database.password'),
                database: configService.get('database.schema'),
                entities: [__dirname + '../service_modules/**/*.entity{.ts,.js}'],
                synchronize: false
            }),
            connectionFactory: async (options) => {
            const connection = await createConnection(options);
            return connection;
            },
        })
    ]
})
export class DbModule {}
