import 'dotenv/config'; // load env variables
import RabbitMQService from './rabbitmq.config';
import mongoose from 'mongoose';

const rabbitMQService = new RabbitMQService();

const db = await mongoose.connect(
    String(`${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}`)
);
if (db) console.log('Connected to Database');

rabbitMQService.connect().then(() => {
    console.log('Connected to RabbitMQ');
}).catch((error) => {
    console.error('Error connecting to RabbitMQ:', error);
    process.exit(1);
});

process.on('SIGINT', async () => {
    await mongoose.connection.close();
    process.exit(0);
});

process.on('unhandledRejection', async (error) => {
    await mongoose.connection.close();
    process.exit(1); //server needs to crash and a process manager will restart it
});

process.on('uncaughtException', async (error) => {
    await mongoose.connection.close();
    process.exit(1); //server needs to crash and a process manager will restart it
});