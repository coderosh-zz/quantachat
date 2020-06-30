import { connect, ConnectionOptions } from 'mongoose';

const mongoUri = process.env.MONGO_URI as string;

const conOptions: ConnectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

export const connectDatabase = async (): Promise<void> => {
  const con = await connect(mongoUri, conOptions);
  console.log(` MONGODB: ${con.connection.host} `.bgYellow.black);
};
