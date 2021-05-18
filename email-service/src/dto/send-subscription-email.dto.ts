import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString
} from 'class-validator';
import { Gender } from './gender.enum';

export class SendSubscriptionEmailDto {
  
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  firstName: string;

  @IsOptional()
  @IsEnum(Gender)
  gender: string;

  @IsDateString() // "Tue Feb 05 2019 12:05:22 GMT+0530 (IST)",
  dateOfBirth: Date;

  @IsBoolean()
  consentFlag: boolean;
  
  @IsNotEmpty()
  @IsString()
  newsletterId: string;
}
