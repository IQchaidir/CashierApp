import { Input } from '@/components/ui/input';
import { ImagePlus, X } from 'lucide-react';
import { useState } from 'react';

type Props = {
    id: string;
    file: File | null;
    setFile: React.Dispatch<React.SetStateAction<File | null>>;
    setRemovedFile: (arg: string) => void;
    imageUrl?: string;
};

export default function EditImage({ id, file, setFile, setRemovedFile, imageUrl = '' }: Props) {
    const [image, setImage] = useState(imageUrl);
    const [fileName, setFileName] = useState(imageUrl ? '' : 'No selected file');
    const [error, setError] = useState('');

    return (
        <div className="flex flex-col items-center">
            <div className="relative w-[100px] h-[100px]">
                <X
                    className="absolute right-0 top-0 text-cyan-200 z-10 cursor-pointer"
                    onClick={() => {
                        setImage('');
                        setFileName('No selected file');
                        setError('');
                        setRemovedFile('');
                    }}
                />
                <div
                    className="flex items-center justify-center w-[100px] h-[100px] border-dashed border-blue-200 border-2 rounded-md cursor-pointer"
                    onClick={() => document.getElementById(id)?.click()}
                >
                    <Input
                        type="file"
                        accept="image/*"
                        id={id}
                        className="hidden"
                        onChange={async ({ target: { files } }) => {
                            try {
                                if (files && files[0]) {
                                    setFileName(files[0]?.name);
                                    setImage(URL.createObjectURL(files[0]));
                                    setFile(files[0]);
                                }
                            } catch (error: any) {
                                setError(error.message);
                            }
                        }}
                    />
                    {image ? (
                        <img src={image} width={100} height={100} alt="" />
                    ) : (
                        <ImagePlus className="text-cyan-200" />
                    )}
                </div>
            </div>
            <section>
                <span className="text-slate-800 text-xs">{fileName}</span>
            </section>
        </div>
    );
}
