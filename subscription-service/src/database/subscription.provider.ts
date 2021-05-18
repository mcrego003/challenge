import { Connection } from 'mongoose';
import { SubscriptionSchema } from '../sub/sub.schema';

export const subscriptionProviders = [
  {
    provide: 'SUBSCRIPTION_MODEL',
    useFactory: (connection: Connection) => connection.model('Sub', SubscriptionSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
