import * as Yup from 'yup';

export const AddSchema = Yup.object().shape({
  addValue: Yup.string()
    .min(5, 'Input is Too Short!')
    .max(50, 'Input is Too Long!')
    .required('This field is Required'),
});
