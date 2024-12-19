# todo-sst-sveltekit

SSTとSvelteKit(Svelte5)をベースにしたtodoアプリ作例です。

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

SSTを実行(デバッグ/デプロイ共)すると、AWSアカウントにDynamoDBを配置します。

SvelteKitはSSRで実行し、サーバ実行部分はLambdaで動作しているのでそこからDynamoDBを利用しています。ブラウザからDynamoDBへは直接通信しません。

## 作者

Katsuhisa Ueda (moochannel)
