// import winston, { LoggerOptions } from 'winston';
// import { Axiom, ClientOptions } from '@axiomhq/js';

// // Define a new type that extends ClientOptions to include 'dataset'
// interface AxiomTransportOptions extends ClientOptions {
//     dataset: string;
// }

// // Function to create the Axiom transport
// const createAxiomTransport = (dataset: string, token: string) =>
//     new Axiom({ dataset, token } as AxiomTransportOptions);

// // Axiom transport instance
// const axiomTransport = createAxiomTransport(process.env.AXIOM_DATASET || '', process.env.AXIOM_TOKEN || '');

// // Logger configuration
// const loggerConfig: LoggerOptions = {
//     level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
//     format:
//         process.env.NODE_ENV === 'production'
//             ? winston.format.json()
//             : winston.format.combine(
//                   winston.format.colorize(),
//                   winston.format.simple()
//               ),
//     defaultMeta: { service: process.env.SERVICE_NAME },
//     transports:
//         process.env.NODE_ENV === 'production'
//             ? [axiomTransport as any] // Use type assertion to match the expected type
//             : [new winston.transports.Console()],
// };

// // Create the logger
// const logger = winston.createLogger(loggerConfig);

// export default logger;
