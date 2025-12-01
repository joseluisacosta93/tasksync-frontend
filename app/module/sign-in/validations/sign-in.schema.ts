import * as Yup from "yup";

export const SignInSchema = Yup.object().shape({
  email: Yup.string().required("Required"),
  password: Yup.string().required("Required").min(8, "Min 8 characters"),
});
