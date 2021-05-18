import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { MessagePattern} from '@nestjs/microservices';
import { AppService } from './app.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';

@UsePipes(new ValidationPipe({
  transform: true,
  whitelist: true,
  forbidNonWhitelisted: true,
  disableErrorMessages: true
}))

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'subscription_getAllSubscriptions' })
  async getAllSubscriptions(): Promise<any> {
    return this.appService.getAllSubscriptions();
  }

  @MessagePattern({ cmd: 'subscription_getSubscriptionById' })
  async getSubscriptionById(id: string): Promise<any> {
    return this.appService.getSubscriptionById(id);
  }
  
  @MessagePattern({ cmd: 'subscription_createSubscription' })
  async createSubscription(createSubscriptionDto: CreateSubscriptionDto): Promise<string> {
    return this.appService.createSubscription(createSubscriptionDto);
  }

  @MessagePattern({ cmd: 'subscription_deleteSubscriptionById' })
  async deleteSubscriptionById(id: string) {
    return this.appService.deleteSubscriptionById(id);
  }

}
