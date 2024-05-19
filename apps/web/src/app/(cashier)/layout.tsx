import Navbar from '@/components/Navbar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            <div className="relative h-auto w-full bg-gray-100 ">{children}</div>
        </>
    );
}
