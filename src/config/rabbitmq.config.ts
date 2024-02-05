import amqp from 'amqplib';
import dotenv from 'dotenv';
dotenv.config();

interface IRabbitMQService {
    connect(): Promise<void>;
    createQueue(queueName: string, options?: any): Promise<void>;
    sendMessage(
        queueName: string,
        message: string,
        options?: any
    ): Promise<void>;
    consumeMessages(
        queueName: string,
        onMessageCallback: (message: string, done: () => void) => void
    ): Promise<void>;
    closeConnection(): Promise<void>;
}

export default class RabbitMQService implements IRabbitMQService {
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
            console.error('Error connecting to RabbitMQ:', error);
            throw error;
        }
    }

    async createQueue(queueName, options = { durable: true }) {
        try {
            if (this.channel) {
                await this.channel.assertQueue(queueName, options);
                console.log(`Queue '${queueName}' created`);
            } else {
                console.error(
                    'Channel is null. Ensure connection is established.'
                );
            }
        } catch (error) {
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
                console.log(`Message sent to queue '${queueName}': ${message}`);
            } else {
                console.error(
                    'Channel is null. Ensure connection is established.'
                );
            }
        } catch (error) {
            console.error(
                `Error sending message to queue '${queueName}':`,
                error
            );
            throw error;
        }
    }

    async consumeMessages(queueName) {
        try {
            if (!this.channel) {
                console.error(
                    'Channel is null. Ensure connection is established.'
                );
                return;
            }
            await this.channel.assertQueue(queueName, { durable: true });
            this.channel.prefetch(1);

            console.log(`Consuming messages from queue '${queueName}'`);

            this.channel.consume(
                queueName,
                (msg) => {
                    const message = msg.content.toString();
                    console.log(
                        `Received message from queue '${queueName}': ${message}`
                    );
                    this.channel.ack(msg);
                },
                { noAck: false }
            );
        } catch (error) {
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
        } catch (error) {
            console.error('Error closing RabbitMQ connection:', error);
            throw error;
        }
    }
}
