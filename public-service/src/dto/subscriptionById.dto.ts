import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId } from "class-validator";

export class SubscriptionByIdDto {
  @ApiProperty()
  @IsMongoId()
  id: string;
}