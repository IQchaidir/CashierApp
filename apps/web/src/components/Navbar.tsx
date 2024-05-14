import { SheetMenu } from './SheetMenu';

const Navbar = () => {
    return (
        <nav className="bg-blue-500 py-4 flex justify-between items-center text-2xl font-semibold text-white shadow-lg">
            <div className="ml-4 cursor-pointer">
                <SheetMenu />
            </div>
            <div className="">CashierApp</div>
            <div className="mr-4"></div>
        </nav>
    );
};

export default Navbar;
