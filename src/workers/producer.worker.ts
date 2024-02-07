import RabbitMQService from '../config/rabbitmq.config';

async function produceMessage(message, queueName) {
    const rabbitMQService = new RabbitMQService();

    try {
        await rabbitMQService.connect(),
            await Promise.all([
                rabbitMQService.createQueue(queueName),
                rabbitMQService.sendMessage(queueName, message),
            ]);
    } finally {
        await rabbitMQService.closeConnection();
    }
}

export default produceMessage;
