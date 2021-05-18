import { ApiProperty } from '@nestjs/swagger';
import { Gender } from './gender.enum';

export class SubscriptionDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty({ enumName: 'Gender', enum: Gender })
  gender: Gender;

  @ApiProperty()
  dateOfBirth: Date;

  @ApiProperty()
  consentFlag: boolean;
  
  @ApiProperty()
  newsletterId: string;
}