# CLI Maker

CLIツールのボイラープレートコードを簡単に生成できるWebアプリケーションです。コマンド構造を視覚的に定義し、TypeScript + Commander.jsベースの実行可能なCLIプロジェクトをダウンロードできます。

## 📋 目次

- [概要](#-概要)
- [機能](#-機能)
- [デモ動画](#-デモ動画)
- [セットアップ（開発者向け）](#️-セットアップ開発者向け)
- [使い方（Webアプリ利用者向け）](#-使い方webアプリ利用者向け)
- [生成されるCLIプロジェクトについて](#-生成されるcliプロジェクトについて)
- [技術スタック](#-技術スタック)
- [ライセンス](#-ライセンス)

## 🎯 概要

CLI Makerは、コマンドラインツール（CLI）の開発を効率化するためのWebアプリケーションです。

**主な特徴:**
- 🎨 **視覚的な設計**: ブラウザ上でコマンド構造を直感的に定義
- 🔧 **型安全**: TypeScriptベースの完全な型定義
- 📦 **即座に実行可能**: ダウンロードしたプロジェクトは`npm install`後すぐに動作
- 🎯 **疎結合設計**: ビジネスロジックとCLI構造を分離
- ⚡ **高速開発**: ボイラープレートコードを自動生成

## ✨ 機能

### コマンド階層の定義
- ルートコマンドとサブコマンドの階層構造をサポート
- 例: `myapp deploy production` のような多階層コマンド
- git、docker、npmなどの一般的なCLIツールと同じパターン

### パラメータ設定
- **引数（Argument）**: 必須の位置パラメータ
- **オプション（Option）**: `--verbose`のようなフラグ
- **型指定**: String、Number、Booleanをサポート
- **必須/任意**: 各パラメータを必須または任意に設定可能
- **短縮形**: `-v`のような短縮オプションを定義可能

### コード生成
自動生成されるファイル:
- `src/types.ts` - パラメータの型定義
- `src/interfaces.ts` - ハンドラーインターフェース
- `src/cli.ts` - Commander.jsのセットアップ
- `src/handler.ts` - ダミー実装（ここにビジネスロジックを実装）
- `src/index.ts` - エントリーポイント
- `package.json` - プロジェクト設定
- `tsconfig.json` - TypeScript設定
- `README.md` - 使用方法ドキュメント
- `.gitignore` - Git設定

### その他の機能
- ✅ リアルタイムプレビュー
- ✅ ZIPファイルでダウンロード
- ✅ パラメータバリデーション付きダミー実装
- ✅ ESM対応

## 🎬 デモ動画

*(デモ動画は後ほど追加予定)*

基本的な使用フロー:
1. Webアプリを開く
2. コマンド構造を定義（例: deploy コマンド）
3. パラメータを追加（例: environment 引数、--verbose オプション）
4. "Download Project" をクリック
5. ZIPを解凍して `npm install`
6. `npm run dev -- deploy production --verbose` で実行

## 🛠️ セットアップ（開発者向け）

### 必要な環境
- Node.js v20以上
- npm

### インストール手順

```bash
# リポジトリをクローン
git clone <repository-url>
cd cli-maker

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev
```

ブラウザで http://localhost:3000 を開きます。

### ビルド

```bash
# プロダクションビルド
npm run build

# プロダクションサーバーを起動
npm start
```

### プロジェクト構造

```
cli-maker/
├── app/                    # Next.js App Router
│   └── page.tsx           # メインページ
├── src/
│   ├── components/        # Reactコンポーネント
│   │   ├── editor/       # コマンドエディター
│   │   ├── preview/      # コードプレビュー
│   │   └── sidebar/      # コマンドツリー
│   ├── lib/
│   │   ├── generator/    # コード生成ロジック
│   │   └── downloadUtils.ts  # ダウンロード機能
│   ├── store/            # Zustand状態管理
│   └── types/            # TypeScript型定義
├── public/               # 静的ファイル
└── package.json
```

## 📖 使い方（Webアプリ利用者向け）

### 1. コマンド構造の定義

#### ルートコマンドの設定
1. サイドバーの "app" コマンドをクリック
2. 右側のエディターで以下を設定:
   - **Name**: CLIツールの名前（例: `myapp`）
   - **Handler Name**: ハンドラー関数名（例: `main`）
   - **Description**: コマンドの説明

#### サブコマンドの追加
1. コマンドにマウスオーバーして "+" ボタンをクリック
2. サブコマンドが追加されます
3. サブコマンドを選択して名前などを編集

**例: 階層構造**
```
myapp
  ├── deploy      # デプロイコマンド
  │   └── rollback  # ロールバックサブコマンド
  └── status      # ステータス確認コマンド
```

### 2. パラメータの設定

各コマンドに対してパラメータを追加できます。

#### パラメータの追加
1. コマンドを選択
2. "Add Parameter" ボタンをクリック
3. 以下を設定:
   - **Name**: パラメータ名
   - **Kind**: Argument（引数）または Option（オプション）
   - **Type**: String、Number、Boolean
   - **Req**: 必須かどうか（チェックボックス）
   - **Alias**: 短縮形（例: `v` → `-v`）
   - **Description**: パラメータの説明

#### Argument vs Option

**Argument（引数）**:
- 位置パラメータ
- 例: `deploy production` の `production`
- 通常は必須

**Option（オプション）**:
- フラグ形式のパラメータ
- 例: `deploy --verbose` の `--verbose`
- 短縮形: `-v, --verbose`

### 3. コードプレビュー

画面右側でリアルタイムに生成されるコードを確認できます。

- タブを切り替えて各ファイルの内容を確認
- コピーボタンで個別ファイルをクリップボードにコピー可能

### 4. プロジェクトのダウンロード

1. "Download Project" ボタンをクリック
2. `<cli-name>-<timestamp>.zip` がダウンロードされます
3. ZIPファイルを解凍

### 5. ローカルでの実行

```bash
# プロジェクトディレクトリに移動
cd myapp-20250119-123456

# 依存関係をインストール
npm install

# 開発モードで実行（TypeScript直接実行）
npm run dev -- deploy production --verbose

# ヘルプを表示
npm run dev -- --help

# プロダクションビルド
npm run build

# ビルド後の実行
npm start -- deploy production
```

### 6. ビジネスロジックの実装

生成されたプロジェクトの `src/handler.ts` を編集して、実際のビジネスロジックを実装します。

```typescript
// src/handler.ts
export class DummyHandler implements AppHandler {
  async handleDeploy(params: Types.DeployParams): Promise<void> {
    // ここに実際のデプロイロジックを実装
    console.log(`Deploying to ${params.environment}...`);
    
    // 例: APIを呼び出す
    const result = await deployToEnvironment(params.environment);
    console.log('Deployment successful!', result);
  }
}
```

## 📦 生成されるCLIプロジェクトについて

### プロジェクト構造

```
generated-cli/
├── src/
│   ├── types.ts          # パラメータの型定義
│   ├── interfaces.ts     # AppHandlerインターフェース
│   ├── cli.ts           # Commander.jsセットアップ
│   ├── handler.ts       # ハンドラー実装（編集対象）
│   └── index.ts         # エントリーポイント
├── dist/                # ビルド出力先
├── package.json
├── tsconfig.json
├── README.md
└── .gitignore
```

### 実装パターン

生成されるコードは**疎結合設計**を採用:

1. **CLI層** (`cli.ts`): コマンドパース、バリデーション
2. **インターフェース層** (`interfaces.ts`): ハンドラーの契約
3. **実装層** (`handler.ts`): ビジネスロジック（ユーザーが実装）

この設計により:
- ✅ ビジネスロジックとCLI構造を分離
- ✅ テストが容易
- ✅ 型安全性を保証

### 機能

#### パラメータバリデーション
必須パラメータが不足している場合、自動的にエラーを表示:

```bash
$ npm run dev -- deploy
❌ Error: Required argument "environment" is missing

Usage: deploy <environment>
```

#### 詳細な実行ログ
どのコマンドが実行されたか明確に表示:

```
============================================================
🚀 Command: deploy
📍 Handler: handleDeploy
============================================================
📦 Parameters:
{
  "environment": "production",
  "verbose": true
}
============================================================
✅ Command executed successfully (dummy implementation)

💡 Next steps:
   - Implement business logic in src/handler.ts
   - Replace this dummy output with actual functionality
============================================================
```

## 🔧 技術スタック

### Webアプリケーション
- **Framework**: Next.js 16 (App Router)
- **UI**: React 19
- **Language**: TypeScript 5
- **State Management**: Zustand
- **Styling**: Tailwind CSS 4
- **Form**: React Hook Form
- **Icons**: Lucide React

### 生成されるCLI
- **CLI Framework**: Commander.js 12
- **Language**: TypeScript 5
- **Module System**: ESM
- **Dev Tool**: tsx（TypeScript実行）
- **Build**: tsc（TypeScript Compiler）

## 📝 開発のヒント

### コマンド階層の設計

**フラットな構造**（独立したコマンド）:
```
myapp
  ├── init
  ├── build
  └── deploy
```

**階層構造**（関連するコマンドをグループ化）:
```
myapp
  ├── project
  │   ├── create
  │   └── delete
  └── deploy
      ├── start
      └── rollback
```

### パラメータ設計のベストプラクティス

1. **引数は少なく**: 必須の引数は1-2個に抑える
2. **オプションで拡張**: 追加機能はオプションで提供
3. **デフォルト値**: 可能な限りデフォルト値を設定
4. **短縮形**: よく使うオプションには短縮形を提供

### 生成後のカスタマイズ

生成されたコードは自由に編集可能:
- エラーハンドリングの追加
- ロギングの改善
- 設定ファイルの読み込み
- プログレスバーの表示
- インタラクティブプロンプト

## 🤝 コントリビューション

バグ報告や機能リクエストは Issue でお願いします。

## 📄 ライセンス

MIT License

---

**CLI Maker** - CLIツール開発を加速させるWebアプリケーション
