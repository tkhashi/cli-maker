# CLI Maker - 開発者ガイド

このドキュメントでは、CLI Makerの技術的な詳細、アーキテクチャ、および開発者向けのヒントについて説明します。

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
4. **短縮形**: よく使うオプションには短縮形を提供（1文字、例: `v`）

## 🤝 コントリビューション

バグ報告や機能リクエストは Issue でお願いします。

## 📄 ライセンス

MIT License
