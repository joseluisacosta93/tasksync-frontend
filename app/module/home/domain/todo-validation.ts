import * as Yup from "yup";

export const todoSchema = Yup.object().shape({
  title: Yup.string()
    .required("Campo requerido")
    .max(25, "El nombre no puede superar los 25 caracteres"),
  description: Yup.string().optional(),
  completed: Yup.boolean(),
});
