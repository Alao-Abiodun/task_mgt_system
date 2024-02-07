// import { describe, it, expect, jest, test, afterAll } from '@jest/globals';
// import { faker } from '@faker-js/faker';
// import request from 'supertest';
// import assert from 'assert';
// import app from '../app';

// describe('Task Controller', () => {
//     let response;
//     test('should create a new task', async () => {
//          response = await request(app)
//             .post('/api/v1/task')
//             .set('Content-Type', 'application/json')
//             .send({ title: 'New Task', description: 'Task description' })
//             .expect(201);

//         console.log('response:', response);

//         assert(response.body.hasOwnProperty('success'));
//         assert(response.body.hasOwnProperty('message'));
//     });

//     test('should update an existing task', async () => {
//         const taskId = 1;

//         const response = await request(app)
//             .put(`/api/v1/task/${taskId}`)
//             .send({
//                 title: 'Updated Task',
//                 description: 'Updated task description',
//             });

//         assert(response.body.hasOwnProperty('success'));
//         assert(response.body.hasOwnProperty('message'));
//     });

//     test('should delete an existing task', async () => {
//         const taskId = 1;

//         const response = await request(app).delete(`/tasks/${taskId}`);

//         assert(response.body.hasOwnProperty('success'));
//         assert(response.body.hasOwnProperty('message'));
//     });

//     test('should get a specific task', async () => {
//         const taskId = 1; 

//         const response = await request(app).get(`/tasks/${taskId}`);

//         assert(response.body.hasOwnProperty('success'));
//         assert(response.body.hasOwnProperty('message'));
//     });
// });
