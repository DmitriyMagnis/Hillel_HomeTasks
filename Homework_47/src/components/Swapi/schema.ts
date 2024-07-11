import * as yup from 'yup';
export const schema = yup.object().shape({
  peopleId: yup
    .string()
    .required()
    .matches(/^[0-9]+$/, 'Must be only digits'),
});
