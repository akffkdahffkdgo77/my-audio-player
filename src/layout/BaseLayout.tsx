import { Outlet } from 'react-router-dom';

export default function BaseLayout() {
    return (
        <main className="flex min-h-screen w-full flex-col items-center justify-center gap-2.5">
            <Outlet />
        </main>
    );
}
