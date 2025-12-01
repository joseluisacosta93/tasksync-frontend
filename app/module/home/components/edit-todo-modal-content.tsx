import { MainButton } from "@/app/components/ui/buttons/main-button";
import { FormField } from "@/app/components/ui/forms/form-Field";
import { Input } from "@/app/components/ui/input/input";
import { SimpleSwitch } from "@/app/components/ui/switches/simple-switch";
import { Write } from "@/app/components/ui/text/write";
import { Formik } from "formik";
import { View } from "react-native";
import { todoSchema } from "../domain/todo-validation";
import { EditTodo, useEditTodo } from "../hooks/use-edit-todos";
import { useRefrestTodos } from "../hooks/use-get-todos";

export function EditTodoModalContent({
  title,
  description,
  completed,
  id,
  closeModal,
}: {
  title: string;
  description?: string;
  completed: boolean;
  id: number;
  closeModal: () => void;
}) {
  const refreshTodos = useRefrestTodos();
  const { mutate: editTodo } = useEditTodo({
    onSuccess: () => {
      refreshTodos();
      closeModal();
    },
  });
  const onEditTodo = (values: EditTodo) => {
    editTodo({
      id,
      title: values.title,
      description: values.description,
      completed: values.completed,
    });
  };
  return (
    <Formik
      initialValues={{ title, description, completed: completed }}
      onSubmit={(values) => {
        onEditTodo({ ...values, id });
      }}
      validationSchema={todoSchema}
    >
      {({ handleChange, handleSubmit, values, setFieldValue, errors }) => (
        <View style={{ paddingBlock: 10 }}>
          <FormField
            error={errors.title}
            label="Titulo"
            labelStyle={{ fontSize: 18, paddingBottom: 3, paddingLeft: 10 }}
          >
            <Input
              value={values.title}
              onChangeText={handleChange("title")}
              boxStyle={{ width: "100%", height: 50 }}
              placeholder="Titulo de la tarea"
            ></Input>
          </FormField>

          <FormField
            error={errors.description}
            label="Description"
            labelStyle={{ fontSize: 18, paddingBottom: 3, paddingLeft: 10 }}
          >
            <Input
              value={values.description}
              onChangeText={handleChange("description")}
              boxStyle={{ width: "100%", height: 50 }}
              placeholder="Descripción"
            ></Input>
          </FormField>

          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Write text={"Completada"}></Write>
            <SimpleSwitch
              onChange={(value) => setFieldValue("completed", value)}
              value={values.completed}
            ></SimpleSwitch>
          </View>
          <View style={{ paddingBottom: 30 }}>
            <MainButton
              title="Guardar"
              onPress={handleSubmit}
              disabled={Object.keys(errors).length > 0}
            />
          </View>
        </View>
      )}
    </Formik>
  );
}
