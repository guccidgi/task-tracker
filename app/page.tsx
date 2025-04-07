import Link from 'next/link';
import { Button } from '../components/ui/button';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="space-y-6 text-center">
        <h1 className="text-4xl font-bold tracking-tight">任務追蹤器</h1>
        <p className="text-lg text-muted-foreground">
          一個現代化的任務管理應用程序，幫助您有效管理和追蹤您的任務。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/tasks">
            <Button size="lg">查看任務</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
