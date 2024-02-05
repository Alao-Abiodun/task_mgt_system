import 'dotenv/config'; // load env variables
// import dotenv from 'dotenv';
// dotenv.config();
import app from './app';
// import logger from './services/logger.service';
import mongoose from 'mongoose';

try {
    // authenticate db
    // connect db
    console.clear();

    const db = await mongoose.connect(
        String(`${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}`)
    );

    if (db) console.log('Connected to Database');
    mongoose.connection.on('error', (err) => {
        // logger.error(`Error connecting to DB: ${err}`);
        console.error(`Error connecting to DB: ${err}`);
    });
    mongoose.connection.on('disconnected', () => {
        // logger.error('Mongoose connection closed');
        console.log('Mongoose connection closed');
    });

    // logger.info('Connection has been established successfully.');

    // set app port
    const port = Number(process.env.PORT) || 7001;
    // spin off the server
    app.listen(port, () => {
        console.log(
            `🚀  Task Management service is ready at: http://localhost:${port}`
        );
        // logger.info(
        //     `🚀  Patient service is ready at: http://localhost:${port}`
        // );
    });
} catch (err) {
    // logger.error(err);
    process.exit();
}

process.on('SIGINT', async () => {
    await mongoose.connection.close();
    process.exit(0);
});

process.on('unhandledRejection', async (error) => {
    await mongoose.connection.close();
    // logger.error(error);
    process.exit(1); //server needs to crash and a process manager will restart it
});

process.on('uncaughtException', async (error) => {
    await mongoose.connection.close();
    // logger.error(error);
    process.exit(1); //server needs to crash and a process manager will restart it
});
