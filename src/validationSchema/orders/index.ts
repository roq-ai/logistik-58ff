import * as yup from 'yup';

export const orderValidationSchema = yup.object().shape({
  order_number: yup.string().required(),
  quantity: yup.number().integer().required(),
  total_price: yup.number().integer().required(),
  product_id: yup.string().nullable().required(),
  business_id: yup.string().nullable().required(),
});
