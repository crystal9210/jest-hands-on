// src/lambda.ts

import { S3 } from 'aws-sdk';

// Lambdaハンドラー
export const handler = async (event: any): Promise<any> => {
    const s3 = new S3();

    const bucketName = event.bucketName;
    const key = event.key;

    try {
        const data = await s3.getObject({ Bucket: bucketName, Key: key }).promise();
        const body = data.Body?.toString('utf-8') || '';

        // データの処理（例：JSONパース）
        const parsedData = JSON.parse(body);

        return {
        statusCode: 200,
        body: JSON.stringify(parsedData),
        };
    } catch (error: any) {
        return {
        statusCode: 500,
        body: JSON.stringify({ message: error.message }),
        };
    }
};
