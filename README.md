# 完読本管理サイト
今まで読んだ本を管理するためのサイトです。
登録した本の合計ページ数やページ数から計算した本の重さや高さを表示します。

## 画面イメージ
[完読本管理サイト](https://book-syu.vercel.app/)

**トップ画面**
![](https://book-syu.vercel.app/top.jpg)

**ログイン画面**
![](https://book-syu.vercel.app/login.jpg)

**ホーム画面**
![](https://book-syu.vercel.app/home.jpg)

**検索結果画面**
![](https://book-syu.vercel.app/result.jpg)

## 使い方
### 本の検索～本の登録
ホーム画面の右上の検索窓で読んだ本のキーワードで検索します。すると、検索結果画面が表示されてキーワードに合致した本の一覧が表示されます。
表示された本の画像の右下に「保存」ボタンがあるので、クリックすると「保存済」に変わり、ホーム画面に戻ると「最近読んだ本」の一覧に追加されています。

## 本の新規登録
キーワードで検索しても対象データが取得できないことがあります。その場合は、ホーム画面のヘッダーの右上の「本追加」ボタンをクリックして、登録します。
登録後に画面を再読み込みすると追加した本が登録されているはずです。
![](https://book-syu.vercel.app/insert.jpg)

## インストール方法
`git clone`などでローカル環境にソースコードを複製したら以下のコマンドを叩きます。
これにより、package.jsonに記述されたライブラリーをnode_moduleにインストールします。
```bash
yarn install
```

インストールが完了したら以下のコマンドでサーバーを立ち上げます。
```bash
yarn dev
```
そして、http:localhost:3000にアクセス。するとトップ画面が表示されます。


### 注意点
ローカル環境で動かす場合には以下のサービスに事前に登録する必要があります。
- 認証機能：[Auth0](https://auth0.com/jp/)
- データベース：[Cloud SQL](https://cloud.google.com/sql)

## 環境変数
- AUTH0_CLIENT_ID：Auth0のクライアントID
- AUTH0_CLIENT_SECRET：Auth0のクライアントシークレット
- AUTH0_SCOPE：Auth0のスコープ
- AUTH0_DOMAIN：Auth0のドメイン
- REDIRECT_URI：Auth0で認証後リダイレクトするURL
- POST_LOGOUT_REDIRECT_URI：Auth0でログアウト後、リダイレクトするURL
- SESSION_COOKIE_SECRET：クッキーの暗号化に使われるキー。最低32ビット以上。[クッキー暗号化キー生成サイト](https://generate-secret.now.sh/32)
- SESSION_COOKIE_LIFETIME：クッキーのライフタイム。推奨は7200(2時間)

- DB_DB：データベース名
- DB_USER：データベースのユーザー
- DB_PASSWORD：データベースのパスワード
- DB_HOST：データベースのホスト名(IP)
- DB_INSTANCE：データベースのインスタンス


