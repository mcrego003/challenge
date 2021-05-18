import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Gender } from 'src/dto/gender.enum';

export type SubscriptionDocument = SubscriptionModel & Document;

@Schema()
export class SubscriptionModel {
  @Prop({ required: true })
  email: string;

  @Prop()
  firstName: string;

  @Prop()
  gender: Gender;

  @Prop({ required: true })
  dateOfBirth: Date;

  @Prop({ required: true })
  consentFlag: boolean;

  @Prop({ required: true })
  newsletterId: string;

}

export const SubscriptionSchema = SchemaFactory.createForClass(SubscriptionModel);
