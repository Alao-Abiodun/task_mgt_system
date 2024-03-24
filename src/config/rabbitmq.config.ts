import amqp from 'amqplib';
import dotenv from 'dotenv';
dotenv.config();
import axios from 'axios';
import logger from '../services/logger.service';
import webhookModel from '../models/webhook.model';

export default class RabbitMQService {
    protected connection: any;
    protected channel: any;

    constructor() {
        this.connection = null;
        this.channel = null;
    }
    async connect() {
        try {
            this.connection = await amqp.connect(
                String(process.env.RABBITMQ_URL)
            );
            this.channel = await this.connection.createChannel();
        } catch (error) {
            logger.error('Error connecting to RabbitMQ:', error);
            console.error('Error connecting to RabbitMQ:', error);
            throw error;
        }
    }

    async createQueue(queueName, options = { durable: true }) {
        try {
            if (this.channel) {
                await this.channel.assertQueue(queueName, options);
                console.log(`Queue '${queueName}' created`);
                logger.info(`Queue '${queueName}' created`);
            } else {
                logger.error(
                    'Channel is null. Ensure connection is established.'
                );
                console.error(
                    'Channel is null. Ensure connection is established.'
                );
            }
        } catch (error) {
            logger.error(`Error creating queue '${queueName}':`, error);
            console.error(`Error creating queue '${queueName}':`, error);
            throw error;
        }
    }

    async sendMessage(queueName, message, options = { persistent: true }) {
        try {
            if (this.channel) {
                await this.channel.sendToQueue(
                    queueName,
                    Buffer.from(message),
                    options
                );
                logger.info(`Message sent to queue '${queueName}': ${message}`);
                console.log(`Message sent to queue '${queueName}': ${message}`);
            } else {
                logger.error(
                    'Channel is null. Ensure connection is established.'
                );
                console.error(
                    'Channel is null. Ensure connection is established.'
                );
            }
        } catch (error) {
            logger.error(
                `Error sending message to queue '${queueName}':`,
                error
            );
            console.error(
                `Error sending message to queue '${queueName}':`,
                error
            );
            throw error;
        }
    }

    async consumeMessages(queueName, action?: string) {
        try {
            if (!this.channel) {
                logger.error(
                    'Channel is null. Ensure connection is established.'
                );
                console.error(
                    'Channel is null. Ensure connection is established.'
                );
                return;
            }
            await this.channel.assertQueue(queueName, { durable: true });
            this.channel.prefetch(1);

            logger.info(`Consuming messages from queue '${queueName}'`);
            // console.log(`Consuming messages from queue '${queueName}'`);

            this.channel.consume(
                queueName,
                async (msg) => {
                    const message = msg.content.toString();
                    console.log(
                        `Received message from queue '${queueName}': ${message}`
                    );

                    const urls: any = await webhookModel.find({});

                    // return;

                    const reqBody = {
                        message,
                        action: action,
                    };

                    for (const url of urls) {
                        await axios.post(url, reqBody, {
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        });
                    }
                    logger.info(
                        `Received message from queue '${queueName}': ${message}`
                    );
                    this.channel.ack(msg);
                },
                { noAck: false }
            );

            return true;
        } catch (error) {
            logger.error(
                `Error consuming messages from queue '${queueName}':`,
                error
            );
            console.error(
                `Error consuming messages from queue '${queueName}':`,
                error
            );
            throw error;
        }
    }

    async closeConnection() {
        try {
            await this.connection.close();
            console.log('Connection to RabbitMQ closed');
            logger.info('Connection to RabbitMQ closed');
        } catch (error) {
            logger.error('Error closing RabbitMQ connection:', error);
            console.error('Error closing RabbitMQ connection:', error);
            throw error;
        }
    }
}
