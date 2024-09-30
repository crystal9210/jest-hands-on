// src/__tests__/lambda.test.ts

import AWSMock from 'aws-sdk-mock';
import AWS from 'aws-sdk';
import { handler } from '../lambda';

describe('Lambda Handler', () => {
    const mockBucketName = 'test-bucket';
    const mockKey = 'test-key.json';
    const mockData = { message: 'Hello, World!' };

    // 全てのテストケースが実施される前に一度だけ実行されるセットアップ関数
    beforeAll(() => {
        // AWS SDKのインスタンスを設定
        AWSMock.setSDKInstance(AWS);

        // S3のgetObjectをモック
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

    // 全てのテストケースが終了した後の後処理
    afterAll(() => {
        // モックを解除
        AWSMock.restore('S3');
    });

    // 個々のテストケースを定義するための関数
    test('should fetch data successfully', async () => {
        const event = {
        bucketName: mockBucketName,
        key: mockKey,
        };

        const response = await handler(event);

        expect(response.statusCode).toBe(200);
        expect(response.body).toBe(JSON.stringify(mockData));
    });

    test('should handle fetch error when object is not found', async () => {
        const event = {
        bucketName: mockBucketName,
        key: 'non-existent-key.json',
        };

    const response = await handler(event);

    expect(response.statusCode).toBe(500);
    expect(response.body).toBe(JSON.stringify({ message: 'Object not found' }));
    });

    test('should handle invalid JSON data', async () => {
        // モックを上書きして無効なJSONを返す
        AWSMock.remock('S3', 'getObject', (params: any, callback: Function) => {
        callback(null, {
            Body: 'Invalid JSON',
        });
        });

        const event = {
        bucketName: mockBucketName,
        key: mockKey,
        };

        const response = await handler(event);

        expect(response.statusCode).toBe(500);
        expect(JSON.parse(response.body).message).toMatch(/Unexpected token/);
    });
});
