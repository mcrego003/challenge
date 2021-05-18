import { Controller } from '@nestjs/common';
import { SendSubscriptionEmailDto } from './dto/send-subscription-email.dto';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';
import { UsePipes, ValidationPipe } from '@nestjs/common';

@UsePipes(new ValidationPipe({
  transform: true,
  whitelist: true,
  forbidNonWhitelisted: true,
  disableErrorMessages: true
}))

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('send_subscribe_email')
  async handleSendSubscribeEmail(data: SendSubscriptionEmailDto) {
    this.appService.sendSubscribeEmail(data);
  }
  
}
