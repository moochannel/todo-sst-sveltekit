# todo-sst-sveltekit

SSTとSvelteKit(Svelte 5)をベースにしたtodoアプリ作例です。

## 実行方法

AWS CLIでAWSアカウントを操作できるようになっていることが前提です。

### 準備

```sh
git clone https://github.com/moochannel/todo-sst-sveltekit.git
cd todo-sst-sveltekit
pnpm i
```

### 実行(デバッグ)

ターミナルが2つ必要です。

```sh
(ターミナル1)
pnpm sst dev

(ターミナル2)
pnpm fe dev
```

ブラウザで http://localhost:5173 を開きます。

### 実行(デプロイ)

```sh
pnpm sst deploy
```

デプロイ実行時に表示される`URL: https://xxxxxxxxxxxxxxx.cloudfront.net` をブラウザで開きます。

### 後始末

デバッグ/デプロイ共にSSTの実行環境がAWSアカウントへデプロイされているので削除する必要があります。

```sh
pnpm sst remove
```

## 解説

このGitリポジトリはpnpmを使用したmonorepo構成です。

- root: SSTでのデプロイ構成管理、Linter/Formatter/GitHub Actionsなど開発環境管理
  - packages/frontend: SvelteKitのフロントエンド

### root

- SSTを実行(デバッグ/デプロイ共)すると、AWSアカウントにDynamoDBを配置します。
- SvelteKitはCloudfront(と一部はLambdaに)デプロイします。サーバ実行部分はLambdaで動作するのでそこからDynamoDBを利用しています。ブラウザからDynamoDBへは直接通信しません。

### packages/frontend

SvelteKit(Svelte 5)をベースに描きの要素を取り入れてtodoアプリを書いています。

- ADT(代数的データ型)でのドメインモデル
- neverthowを使用した関数型プログラミング風
- inversifyを使用したDI(依存性注入)
- shadcn-svelteを使用したUIデザイン
- superforms(+zod)を使用したフォーム定義
- @aws-sdk/client-dynamodb、@aws-sdk/lib-dynamodbを使用したDynamoDBへの永続化

## 作者

Katsuhisa Ueda (moochannel)
