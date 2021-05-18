import { Injectable } from '@nestjs/common';
import { SendSubscriptionEmailDto } from './dto/send-subscription-email.dto';

@Injectable()
export class AppService {
  sendSubscribeEmail(data: SendSubscriptionEmailDto) {
    console.log('we should be sending the subscribe email', data);
    setTimeout(() => {  console.log("sent!!"); }, 2000);
  }
}
