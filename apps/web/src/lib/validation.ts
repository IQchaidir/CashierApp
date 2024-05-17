import * as Yup from 'yup';

export const validateDebit = Yup.object().shape({
    cardNumber: Yup.string()
        .required('Nomor kartu wajib diisi')
        .matches(/^\d{16}$/, 'Nomor kartu harus terdiri dari 16 digit')
        .max(16, 'Nomor kartu tidak boleh lebih dari 16 digit'),
});
