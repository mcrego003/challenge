import { Gender } from "./gender.enum";

export class SubscriptionDto {
  id: string;
  email: string;
  firstName: string;
  gender: Gender;
  dateOfBirth: Date;
  consentFlag: boolean;
  newsletterId: string;
}
