import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Gender } from './gender.enum';


export class CreateSubscriptionDto {
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional()
  firstName: string;

  @IsEnum(Gender)
  @IsOptional()
  @ApiPropertyOptional({ enumName: 'Gender', enum: Gender })
  gender: Gender;

  @IsDateString()
  @ApiProperty()
  dateOfBirth: Date;

  @IsBoolean()
  @ApiProperty()
  consentFlag: boolean;
  
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  newsletterId: string;
}