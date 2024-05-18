'use client';
import { SearchIcon } from 'lucide-react';
import { useDebouncedCallback } from 'use-debounce';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

interface SearchInputProps {
    initialSearch: string;
    onSearchChange: (term: string) => void;
    setCurrentPage: any;
}

const SearchInput: React.FC<SearchInputProps> = ({ initialSearch, onSearchChange, setCurrentPage }) => {
    const [input, setInput] = useState(initialSearch);
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const updateSearchParams = useDebouncedCallback((term: string) => {
        setInput(term);
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('search', term);
            params.delete('page');
            setCurrentPage(1);
        } else {
            params.delete('search');
        }
        router.replace(`${pathname}?${params.toString()}`);
    }, 300);

    useEffect(() => {
        updateSearchParams(input);
    }, [input]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value;
        setInput(term);
        onSearchChange(term);
    };

    return (
        <div className="flex items-center rounded-sm bg-white">
            <SearchIcon className="w-6 h-6 p-1" />
            <input
                type="search"
                placeholder="Cari..."
                value={input}
                className="flex-1 px-2 py-1 bg-transparent outline-none"
                onChange={handleInputChange}
            />
        </div>
    );
};

export default SearchInput;
