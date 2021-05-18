import { Body, Controller, Delete, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { SubscriptionDto } from './dto/subscription.dto';
import { SubscriptionByIdDto } from './dto/subscriptionById.dto';

@UsePipes(new ValidationPipe({
  transform: true,
  whitelist: true,
  forbidNonWhitelisted: true,
  disableErrorMessages: true
}))

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  
  @Get('/subscription/')

  @ApiOperation({ summary: 'Get all the subscriptions' })
  @ApiOkResponse({ description: 'Returns the subscriptions array', type: [SubscriptionDto] })
  
  async getAllSubscriptions(): Promise<SubscriptionDto[]> {
    return this.appService.getAllSubscriptions();
  }


  @Get('/subscription/:id')

  @ApiOperation({ summary: 'Get the subscription by the given subscriptionId' })
  @ApiOkResponse({ description: 'Returns the subscription object', type: SubscriptionDto })

  @ApiNoContentResponse({ description: 'No subscription found' })
  @ApiBadRequestResponse({ description: 'Bad request' })

  async getSubscriptionById(@Param() params: SubscriptionByIdDto): Promise<SubscriptionDto> {
    return this.appService.getSubscriptionById(params.id);
  }
  
  
  @Post('/subscription/')

  @ApiOperation({ summary: 'Create a new subscription' })
  @ApiCreatedResponse({ description: 'Creates a new subscription' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  
  async createSubscription(@Body() createSubscriptionDto: CreateSubscriptionDto): Promise<string> {
    return this.appService.createSubscription(createSubscriptionDto);
  }


  @Delete('/subscription/:id')

  @ApiOperation({ summary: 'Delete a subscription by the given subscriptionId' })
  @ApiNoContentResponse({ description: 'Successfully deleted' })
  
  async deleteSubscriptionById(@Param() params: SubscriptionByIdDto) {
    return this.appService.deleteSubscriptionById(params.id);
  }
}
