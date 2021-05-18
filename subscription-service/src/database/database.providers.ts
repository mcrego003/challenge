import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(process.env.SUBSCRIPTION_DB_URL || 'mongodb://localhost/nest', { useNewUrlParser: true, useUnifiedTopology: true }),
  },
];
