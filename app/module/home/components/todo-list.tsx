import { AddPrimaryButton } from "@/app/components/ui/buttons/add-primary-buttom";
import { SimpleLoading } from "@/app/components/ui/loading/simple-loadiing";
import { ModalBottom } from "@/app/components/ui/modals/modal-bottom";
import { Write } from "@/app/components/ui/text/write";
import { useMemo, useState } from "react";
import { ScrollView, View } from "react-native";
import { useGetTodos } from "../hooks/use-get-todos";
import CreateModalContent from "./create-modal-content";
import Todo from "./todo";

export default function TodoList() {
  const { data: todoList, isLoading } = useGetTodos();

  const [isVisible, setIsVisible] = useState(false);
  const openModal = useMemo(() => {
    return () => {
      setIsVisible(true);
    };
  }, []);
  const closeModal = useMemo(() => {
    return () => {
      setIsVisible(false);
    };
  }, []);
  if (isLoading) {
    return <SimpleLoading />;
  }

  return (
    <ScrollView>
      <View style={{ flexDirection: "column" }}>
        {todoList?.map((todo) => (
          <View key={todo.id} style={{ paddingBlock: 10 }}>
            <Todo
              title={todo.title}
              description={todo.description}
              completed={todo.completed}
              id={todo.id}
            />
          </View>
        ))}
        {todoList?.length === 0 && (
          <View style={{ paddingBlock: 10, alignItems: "center" }}>
            <Write text={" Aun no tienes tareas"}></Write>
          </View>
        )}
        <AddPrimaryButton
          text={"Añadir Tarea"}
          onclick={openModal}
        ></AddPrimaryButton>
      </View>
      <ModalBottom isVisible={isVisible} onCloseModal={closeModal}>
        <CreateModalContent closeModal={closeModal} />
      </ModalBottom>
    </ScrollView>
  );
}
