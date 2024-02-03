import RabbitMQService from '../config/rabbitmq.config';

async function produceMessage(message, queueName) {
    const rabbitMQService = new RabbitMQService();

    try {
        await rabbitMQService.connect();
        await rabbitMQService.createQueue(queueName);
        await rabbitMQService.sendMessage(queueName, message);
    } finally {
        await rabbitMQService.closeConnection();
    }
}

export default produceMessage;
