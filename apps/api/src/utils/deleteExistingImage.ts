import fs from 'fs';
import path from 'path';

export function deleteExistingImage(existingImage: string | undefined) {
    if (existingImage) {
        const existingImageName = existingImage.split('/').pop();
        if (existingImageName) {
            const imagePath = path.join(__dirname, '../../public/images', existingImageName);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }
    }
}
