import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground w-full">
      <Header />
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10 mx-auto px-4">
        <Sidebar />
        <main className="relative py-6 lg:gap-10 lg:py-8 w-full h-full flex flex-col">
          <div className="w-full h-full min-w-0">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
