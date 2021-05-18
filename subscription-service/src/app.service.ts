import { Injectable, Inject, HttpStatus } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { SubscriptionDocument } from './sub/sub.schema';
import { Model } from 'mongoose';
import { SubscriptionDto } from './dto/subscription.dto';

@Injectable()
export class AppService {

  constructor(
    @Inject('EMAIL_SERVICE') private readonly client: ClientProxy,
    @Inject('SUBSCRIPTION_MODEL') private subscriptionModel: Model<SubscriptionDocument>,
  ){

  }

  async getAllSubscriptions(): Promise<SubscriptionDto[]> {

    try {
      const results: SubscriptionDocument[] = await this.subscriptionModel.find().exec();
      
      const response: SubscriptionDto[] = results.map<SubscriptionDto>((result: SubscriptionDocument) => {
        const element: SubscriptionDto = {
          id: result._id,
          email: result.email,
          firstName: result.firstName,
          gender: result.gender,
          dateOfBirth: result.dateOfBirth,
          consentFlag: result.consentFlag,
          newsletterId: result.newsletterId
        }
        return element;
      });

      return response;
    } catch (err) {
      console.log(err)
      // handle errors here...
      throw new RpcException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Unexpected error'
      });
    }
  }

  async getSubscriptionById(id: string): Promise<SubscriptionDto> {

    try {
      const product: SubscriptionDocument = await this.subscriptionModel.findById(id).exec();
      if (!product) {
        throw new RpcException({
          status: HttpStatus.NO_CONTENT,
          message: 'Could not find product'
        });
      }

      return {
        id: product._id,
        email: product.email,
        firstName: product.firstName,
        gender: product.gender,
        dateOfBirth: product.dateOfBirth,
        consentFlag: product.consentFlag,
        newsletterId: product.newsletterId
      }
    } catch (err) {
      if (err instanceof RpcException) {
        throw err;
      } else {
        console.log('handle error..', err);
        throw new RpcException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Unexpected error'
        });
      }
    }
  }

  async createSubscription(createSubscriptionDto: CreateSubscriptionDto): Promise<string> {
    const createdSubscription = new this.subscriptionModel(createSubscriptionDto);
    
    try {
      const result = await createdSubscription.save();
      this.client.emit<any>('send_subscribe_email', createSubscriptionDto).toPromise()

      return result._id as string;
    } catch (err) {
      console.log(err)
      // handle errors...
      throw new RpcException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Unexpected error'
      });
    }
  }

  async deleteSubscriptionById(id: string) {
    try {
      await this.subscriptionModel.deleteOne({_id: id}).exec();
    } catch (err) {
      console.log(err)
      // handle errors here...
      throw new RpcException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Unexpected error'
      });
    }
  }
}
