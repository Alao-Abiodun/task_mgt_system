import RabbitMQService from '../config/rabbitmq.config';

async function consumeMessage(queueName: string) {
    const rabbitMQService = new RabbitMQService();

    try {
        await rabbitMQService.connect();
        await rabbitMQService.consumeMessages(
            queueName,
            (message: string, acknowledge: () => void) => {
                // Your consumer logic here
                console.log('Processing message:', message);
                // Simulate processing time
                setTimeout(() => {
                    console.log('Processing complete');
                    acknowledge(); // Acknowledge the message when processing is complete
                }, 1000);
            }
        );
    } finally {
        await rabbitMQService.closeConnection();
    }
}

export default consumeMessage;
