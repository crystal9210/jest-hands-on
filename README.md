# プロジェクト README

## AWS Lambda 関数のテスト (Jest と TypeScript)

このプロジェクトでは、TypeScript で書かれた AWS Lambda 関数に対して、Jest を使用してユニットテストとスナップショットテストを行う方法を紹介します。`aws-sdk-mock` を利用して AWS SDK の呼び出しをモックし、実際の AWS リソースにアクセスせずにテストを実行します。

---

## 目次

- [概要](#概要)
- [前提条件](#前提条件)
- [プロジェクト構成](#プロジェクト構成)
- [セットアップ手順](#セットアップ手順)
  - [1. リポジトリのクローン](#1-リポジトリのクローン)
  - [2. 依存関係のインストール](#2-依存関係のインストール)
- [使用方法](#使用方法)
  - [テストの実行](#テストの実行)
  - [スナップショットの更新](#スナップショットの更新)
  - [カバレッジレポートの生成](#カバレッジレポートの生成)
- [プロジェクト詳細](#プロジェクト詳細)
  - [Lambda 関数 (`lambda.ts`)](#lambda-関数-lambdats)
  - [ユニットテスト (`lambda.test.ts`)](#ユニットテスト-lambdatestts)
  - [スナップショットテスト (`lambda.snapshot.test.ts`)](#スナップショットテスト-lambdasnapshottestts)
- [注意事項](#注意事項)
- [ライセンス](#ライセンス)

---

## 概要

このプロジェクトでは、AWS Lambda 関数のテスト方法を紹介します。ユニットテストとスナップショットテストの例を含み、`aws-sdk-mock` を使用して AWS SDK の呼び出しをモックする方法を説明します。

---

## 前提条件

- **Node.js** (バージョン 14 以上)
- **npm** または **yarn**

---

## プロジェクト構成

```bash
project-root/
├── src/
│   ├── lambda.ts
│   └── __tests__/
│       ├── lambda.test.ts
│       └── lambda.snapshot.test.ts
├── package.json
├── tsconfig.json
├── jest.config.js
├── jest.setup.ts
└── README.md
```
src/lambda.ts: AWS Lambda 関数の実装ファイル

src/tests/lambda.test.ts: Lambda 関数のユニットテスト

src/tests/lambda.snapshot.test.ts: Lambda 関数のスナップショットテスト

package.json: プロジェクトの依存関係とスクリプト

tsconfig.json: TypeScript の設定

jest.config.js: Jest の設定

jest.setup.ts: Jest のセットアップファイル


## セットアップ手順
1. リポジトリのクローン
```bash
git clone https://github.com/your-username/your-repository.git
```
```bash
cd your-repository
```
2. 依存関係のインストール

npm を使用する場合:

```bash
npm install
```

yarn を使用する場合:

```bash
yarn install
```


## 使用方法

### テストの実行

すべてのテストを実行するには、以下のコマンドを使用。

```bash
npm test
```


このコマンドは Jest を使用してすべてのテストスイートを実行する。

### スナップショットの更新

Lambda 関数に変更を加えた場合で、スナップショットテストが影響を受けた場合は、以下のコマンドでスナップショットを更新する。

```bash
npm run test:update-snapshots
```

このコマンドは Jest の --updateSnapshot フラグを使用して、保存されているスナップショットを更新。


### カバレッジレポートの生成

テストカバレッジレポートを生成するには、以下のコマンドを実行。

```bash
npm run test:coverage
```


カバレッジレポートは coverage/ ディレクトリ内に生成される。

## プロジェクト詳細

### Lambda 関数 (lambda.ts)

この Lambda 関数は、S3 バケットから JSON オブジェクトを読み込み、その内容を返します。AWS SDK の S3 クライアントを使用してオブジェクトを取得します。

主なポイント:

イベントオブジェクトから bucketName と key を読み取ります。

S3 からオブジェクトを取得するために getObject を使用します。

オブジェクトの内容を JSON として解析します。

解析されたデータをレスポンスとして返します。

### ユニットテスト (lambda.test.ts)

ユニットテストでは、Jest を使用して Lambda 関数のさまざまな状況での動作を確認します。

主なテスト内容:

データの正常取得: 正しいパラメータが与えられたときに、関数がデータを正常に取得し返すことをテストします。

オブジェクトが見つからない場合のエラー処理: 指定された S3 オブジェクトが存在しない場合の関数のレスポンスをテストします。

無効な JSON データのエラーハンドリング: S3 オブジェクトが無効な JSON データを含む場合のエラーハンドリングをテストします。

このテストでは aws-sdk-mock を使用して AWS SDK の呼び出しをモックし、実際の AWS リソースにアクセスせずにテストを実行します。


### スナップショットテスト (lambda.snapshot.test.ts)

スナップショットテストでは、Jest のスナップショット機能を使用して Lambda 関数の出力を検証します。

主なポイント:

データ取得成功時のスナップショット: データが正常に取得されたときの出力をキャプチャして比較します。

エラー時のスナップショット: データ取得中にエラーが発生した場合の出力をキャプチャして比較します。

スナップショットテストは、出力が予期しない形で変更されたかどうかを検出するのに役立ちます。

### 注意事項

AWS SDK のモック: このプロジェクトでは aws-sdk-mock を使用して AWS SDK の呼び出しをモックし、テストが孤立し、再現可能になるようにしています。

TypeScript のサポート: プロジェクト全体で TypeScript を使用しており、型安全性とコード管理を向上させています。

Jest の設定: jest.config.js および jest.setup.ts ファイルにより、TypeScript のサポートとテスト環境のセットアップが行われています。
