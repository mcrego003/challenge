import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Transport, ClientsModule } from '@nestjs/microservices';
import { DatabaseModule } from './database/database.module';
import { subscriptionProviders } from './database/subscription.provider';


@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'EMAIL_SERVICE',
        transport: Transport.NATS,
        options: {
          url: process.env.NATS_URL || 'nats://localhost:4222',
        }
      }
    ]),
    DatabaseModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ...subscriptionProviders
  ],
})
export class AppModule {}
