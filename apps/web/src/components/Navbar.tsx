import Image from 'next/image';
import { SheetMenu } from './SheetMenu';

const Navbar = () => {
    return (
        <nav className="bg-[#04C99E] p-4 flex justify-between items-center text-2xl font-semibold text-white shadow-lg">
            <div className=" cursor-pointer">
                <SheetMenu />
            </div>
            <Image src="/textwhite.png" alt="logonav" width={300} height={300} />
        </nav>
    );
};

export default Navbar;
