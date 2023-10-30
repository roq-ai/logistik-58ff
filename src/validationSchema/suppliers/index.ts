import * as yup from 'yup';

export const supplierValidationSchema = yup.object().shape({
  name: yup.string().nullable(),
  contact_number: yup.string().required(),
  address: yup.string().required(),
  business_id: yup.string().nullable().required(),
});
