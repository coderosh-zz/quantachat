import { connect, ConnectionOptions } from 'mongoose';

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/messenger';

const conOptions: ConnectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

export const connectDatabase = async (): Promise<void> => {
  const con = await connect(mongoUri, conOptions);
  console.log(` MONGODB: ${con.connection.host} `.bgYellow.black);
};
