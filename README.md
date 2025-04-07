# 任務追蹤器 (Task Tracker)

一個現代化的任務管理應用程序，使用 Next.js 15、React 19、TypeScript、Tailwind CSS 和 Supabase 構建。

## 功能特點

- 卡片式任務視圖，顯示標題、描述、到期日和優先級
- 左側邊欄提供快速過濾選項
- 簡單的任務創建功能
- 直觀的看板視圖，用於可視化任務進度
- 與 Supabase 集成進行數據庫操作

## 技術堆棧

- **前端框架**: Next.js 15 (App Router)
- **UI 庫**: React 19
- **組件庫**: ShadCN UI
- **樣式**: Tailwind CSS
- **狀態管理**: React Hooks + Context API
- **數據庫**: Supabase (PostgreSQL)
- **驗證**: Zod

## 開始使用

### 前提條件

- Node.js 18.0.0 或更高版本
- npm 或 yarn
- Supabase 帳戶

### 安裝

1. 克隆此倉庫
   ```bash
   git clone https://github.com/yourusername/task-tracker.git
   cd task-tracker
   ```

2. 安裝依賴
   ```bash
   npm install
   # 或
   yarn install
   ```

3. 設置環境變量
   創建一個 `.env.local` 文件，並添加以下內容：
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. 啟動開發服務器
   ```bash
   npm run dev
   # 或
   yarn dev
   ```

5. 在瀏覽器中打開 [http://localhost:3000](http://localhost:3000)

## 項目結構

```
/task-tracker
  ├── app                  # Next.js App Router 目錄
  │   ├── layout.tsx       # 全局佈局
  │   ├── page.tsx         # 首頁
  │   ├── tasks/           # 任務頁面
  │   └── kanban/          # 看板頁面
  ├── components           # React 組件
  │   ├── TaskCard.tsx     # 任務卡片組件
  │   ├── TaskForm.tsx     # 任務表單組件
  │   └── ...              # 其他組件
  ├── lib                  # 工具函數和庫
  │   └── supabase.ts      # Supabase 客戶端
  ├── styles               # 全局樣式
  │   └── globals.css      # Tailwind CSS 樣式
  ├── types                # TypeScript 類型定義
  │   └── supabase.ts      # Supabase 類型
  └── ...                  # 其他配置文件
```

## 數據庫模型

### 任務表 (tasks)
- id (UUID, 主鍵)
- title (字符串，必填)
- description (文本)
- status (枚舉: todo, in_progress, review, done)
- priority (枚舉: low, medium, high, urgent)
- due_date (時間戳)
- created_at (時間戳)
- updated_at (時間戳)
- user_id (外鍵到用戶)
- tags (字符串數組)
- position (整數，用於排序)

## 貢獻

歡迎提交問題和拉取請求。對於重大更改，請先開啟一個問題討論您想要更改的內容。

## 許可證

[MIT](LICENSE)