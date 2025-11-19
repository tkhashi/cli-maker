# CLI Maker

コマンドラインツール（CLI）のボイラープレートコードを簡単に生成できるWebアプリケーションです。

ブラウザ上でコマンド構造を視覚的に定義し、TypeScript + Commander.jsベースの実行可能なCLIプロジェクトをダウンロードできます。

## 🎬 デモ動画

### CLIツールの作成からダウンロードまでの流れ

https://github.com/user-attachments/assets/1f2c0eb8-c323-4c53-8ec7-db5c515948d7

### CLIツール実行のデモ

https://github.com/user-attachments/assets/a517ea09-9e29-49b6-b5d4-2a4361ef31df


## 🚀 クイックスタート

```bash
git clone <repository-url>
cd cli-maker
npm install
npm run dev
```
http://localhost:3000 を開いてください。

## 💡 概要

サイドバーでコマンドの階層構造（ルート・サブコマンド）を定義し、各コマンドに必要な引数やオプションを設定するだけで、すぐに使えるCLIツールが完成します。

設定内容はリアルタイムでプレビューされ、使用例も自動生成されるため、直感的に設計できます。

## 💻 実装ガイド

プロジェクトをダウンロードした後は、`src/handler.ts` にあるクラスにビジネスロジックを記述するだけです。

生成された `AppHandler` インターフェースに従ってメソッドを実装すれば、型安全に開発を進められます。

## 📚 開発者向け情報

技術スタック、詳細な仕様、コントリビューションについては [開発者ガイド (DEVELOPER_GUIDE.md)](./DEVELOPER_GUIDE.md) を参照してください。
