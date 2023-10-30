import * as yup from 'yup';

export const productValidationSchema = yup.object().shape({
  name: yup.string().nullable(),
  description: yup.string().nullable(),
  price: yup.number().integer().nullable(),
  quantity: yup.number().integer().nullable(),
  business_id: yup.string().nullable().required(),
});
