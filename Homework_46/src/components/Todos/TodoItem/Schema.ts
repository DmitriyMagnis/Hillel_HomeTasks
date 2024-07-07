import * as Yup from 'yup';

export const TodoItemSchema = Yup.object().shape({
  title: Yup.string()
    .min(5, 'Input is Too Short!')
    .max(50, 'Input is Too Long!')
    .required('This field is Required'),
  status: Yup.boolean(),
});
