import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { timeout } from 'rxjs/operators';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { SubscriptionDto } from './dto/subscription.dto';

@Injectable()
export class AppService {
  
  constructor(@Inject('SUBSCRIPTION_SERVICE') private readonly client: ClientProxy) {}

  async getAllSubscriptions(): Promise<SubscriptionDto[]> {
    try {

      return await this.client.send<SubscriptionDto[]>({ cmd: 'subscription_getAllSubscriptions' }, "").pipe(timeout(5000)).toPromise();
    } catch (err) {
      // handle errors here...
      console.log(err)
      throw new HttpException('Custom error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getSubscriptionById(id): Promise<SubscriptionDto> {
    try {

      return await this.client.send<SubscriptionDto>({ cmd: 'subscription_getSubscriptionById' }, id).toPromise();
    } catch (err) {
      // handle errors here...
      // for the moment no content only
      console.log(err)
      throw new HttpException(err.message, err.status);
    }
  }

  async createSubscription(createSubscriptionDto: CreateSubscriptionDto): Promise<string> {
    try {
      
      return await this.client.send<string>({ cmd: 'subscription_createSubscription' }, createSubscriptionDto).toPromise();

    } catch (err) {
      // handle errors here...
      // for the moment no content only
      console.log(err)
      throw new HttpException(err.message, err.status);
    }
  }

  async deleteSubscriptionById(id) {
    try {
      await this.client.send<any>({ cmd: 'subscription_deleteSubscriptionById' }, id).toPromise();
    } catch (err) {
      // handle errors here...
      // for the moment no content only
      console.log(err)
      throw new HttpException(err.message, err.status);
    }
  }

}
