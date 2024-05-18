import * as Yup from 'yup';

export const validateDebit = Yup.object().shape({
    cardNumber: Yup.string()
        .required('Nomor kartu wajib diisi')
        .matches(/^\d{16}$/, 'Nomor kartu harus terdiri dari 16 digit')
        .max(16, 'Nomor kartu tidak boleh lebih dari 16 digit'),
});

export const validateNewCashier = Yup.object({
    user_name: Yup.string().max(20, 'Must be 20 letters or less').required('Username is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string()
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
            'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number.',
        )
        .required('Password is required'),
});

export const imageSchema = Yup.mixed()
    .required('File gambar harus diunggah')
    .test('fileType', 'Jenis file harus dalam jpeg, jpg atau png', (value: any) => {
        if (!value) return true;
        const supportedFormats = ['image/jpeg', 'image/jpg', 'image/png'];
        return supportedFormats.includes(value.type);
    })
    .test('fileSize', 'Ukuran file tidak boleh lebih dari 1MB', (value: any) => {
        if (!value) return true;
        return value.size <= 1024 * 1024;
    });

export const validateNewProduct = Yup.object({
    name: Yup.string().max(30, 'Must be 30 letters or less').required('Product name is required'),
    price: Yup.number().required('Price is required').positive('Price must positive'),
    weight: Yup.number().required('Weight is required').positive('Weight must positive'),
    category: Yup.string().required('Category is required'),
    description: Yup.string().required('Description is required'),
    file: imageSchema,
});
