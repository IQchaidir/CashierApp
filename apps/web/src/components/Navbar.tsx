import { SheetMenu } from './SheetMenu';

const Navbar = () => {
    return (
        <nav className="bg-[#04C99E] p-4 flex justify-between items-center text-2xl font-semibold text-white shadow-lg">
            <div className=" cursor-pointer">
                <SheetMenu />
            </div>
            <div className="">SmartKasir</div>
        </nav>
    );
};

export default Navbar;
