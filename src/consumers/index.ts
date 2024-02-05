import RabbitMQService from '../config/rabbitmq.config';

async function consumeMessage(queueName: string) {
    const rabbitMQService = new RabbitMQService();

    try {
        await rabbitMQService.connect();

        await Promise.all([
            rabbitMQService.createQueue(queueName),
            await rabbitMQService.consumeMessages(queueName),
        ]);
    } finally {
        await rabbitMQService.closeConnection();
    }
}

export default consumeMessage;
