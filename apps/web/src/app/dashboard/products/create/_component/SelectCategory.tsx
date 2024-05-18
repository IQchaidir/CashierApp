import { useState, useEffect } from 'react';
import useCategory from '@/hooks/category/useGetCategory';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SelectCategoryProps {
    value: string;
    onChange: (value: string) => void;
}

export function SelectCategory({ value, onChange }: SelectCategoryProps) {
    const { data, isLoading } = useCategory();
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    useEffect(() => {
        if (value) {
            setSelectedCategory(value);
        } else if (!selectedCategory && data?.category.categories.length) {
            setSelectedCategory(data.category.categories[0].id.toString());
        }
    }, [value, data]);

    const handleValueChange = (val: string) => {
        setSelectedCategory(val);
        onChange(val);
    };

    return (
        <Select value={selectedCategory} onValueChange={handleValueChange}>
            <SelectTrigger className="w-1/2">
                <SelectValue placeholder={isLoading ? 'Fetching Categories' : 'Choose a Category'} />
            </SelectTrigger>
            <SelectContent>
                {data?.category.categories.map((category: { id: number; name: string }) => (
                    <SelectItem key={category.id} value={category.id.toString()}>
                        {category.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
