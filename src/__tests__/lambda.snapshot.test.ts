// src/__tests__/lambda.snapshot.test.ts

import AWSMock from 'aws-sdk-mock';
import AWS from 'aws-sdk';
import { handler } from '../lambda';

describe('Lambda Handler Snapshot Tests', () => {
    const mockBucketName = 'test-bucket';
    const mockKey = 'test-key.json';
    const mockData = { message: 'Hello, Snapshot!' };

    beforeAll(() => {
        AWSMock.setSDKInstance(AWS);

        AWSMock.mock('S3', 'getObject', (params: any, callback: Function) => {
        if (params.Bucket === mockBucketName && params.Key === mockKey) {
            callback(null, {
            Body: JSON.stringify(mockData),
            });
        } else {
            callback(new Error('Object not found'));
        }
        });
    });

    afterAll(() => {
        AWSMock.restore('S3');
    });

    test('should match the snapshot for successful fetch', async () => {
        const event = {
        bucketName: mockBucketName,
        key: mockKey,
        };

        const response = await handler(event);
        expect(response).toMatchSnapshot(); // Jestのスナップショットマッチャー
    });

    test('should match the snapshot for fetch error', async () => {
        const event = {
        bucketName: mockBucketName,
        key: 'non-existent-key.json',
        };

        const response = await handler(event);
        expect(response).toMatchSnapshot();
    });
});
