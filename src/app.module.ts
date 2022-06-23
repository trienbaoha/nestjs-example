import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmService } from './configs/typeorm';
import * as controllers from '@controller'
import * as services from '@services'
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import env from './environments';
import * as Entities from './entities';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './common/filters';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmService
    }
    ),
    TypeOrmModule.forFeature([...Object.values(Entities)]),
    PassportModule,
    JwtModule.register({
      secret: env.get('jwtSecret'),
      signOptions: {
        expiresIn: '30d'
      }
    })
  ],
  controllers: [...Object.values(controllers)],
  providers: [{ provide: APP_FILTER, useClass: AllExceptionsFilter }, ...Object.values(services)],
})
export class AppModule { }
