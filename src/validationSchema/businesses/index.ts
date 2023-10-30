import * as yup from 'yup';

export const businessValidationSchema = yup.object().shape({
  description: yup.string().nullable(),
  address: yup.string().nullable(),
  contact_number: yup.string().nullable(),
  name: yup.string().required(),
  user_id: yup.string().nullable().required(),
});
