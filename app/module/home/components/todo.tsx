import { SvgButton } from "@/app/components/ui/buttons/svg-buttom";
import { SimpleCard } from "@/app/components/ui/cards/simple-card";
import { IconSymbol } from "@/app/components/ui/icon-symbol";
import { ModalBottom } from "@/app/components/ui/modals/modal-bottom";
import { Write } from "@/app/components/ui/text/write";
import { useColor } from "@/theme/hooks/useColor";
import { useMemo, useState } from "react";
import { View } from "react-native";
import { useDeleteTodo } from "../hooks/use-delete-todo";
import { useRefrestTodos } from "../hooks/use-get-todos";
import { DeleteModalContent } from "./delete-modal-content";
import { EditTodoModalContent } from "./edit-todo-modal-content";

export default function Todo({
  title,
  description,
  completed,
  id,
}: {
  title: string;
  description?: string;
  completed: boolean;
  id: number;
}) {
  const color = useColor();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const closeModalEditModal = useMemo(() => {
    return () => {
      setIsEditModalVisible(false);
    };
  }, []);
  const closeModalDeleteModal = useMemo(() => {
    return () => {
      setIsDeleteModalVisible(false);
    };
  }, []);

  const openModalEditModal = useMemo(() => {
    return () => {
      setIsEditModalVisible(true);
    };
  }, []);
  const openModalDeleteModal = useMemo(() => {
    return () => {
      setIsDeleteModalVisible(true);
    };
  }, []);
  const refreshTodos = useRefrestTodos();

  const { mutate: deleteTodo } = useDeleteTodo({
    onSuccess: () => {
      refreshTodos();
      closeModalDeleteModal();
    },
  });
  const onDeleteTodo = () => {
    deleteTodo({ id, title, description, completed });
  };
  return (
    <SimpleCard>
      <View
        style={{
          padding: 10,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Write
            text={title}
            fontSize={20}
            style={{ textDecorationLine: completed ? "line-through" : "none" }}
          ></Write>
          <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
            <SvgButton onPress={openModalEditModal}>
              <IconSymbol size={28} name="x.circle.fill" color={color.text} />
            </SvgButton>
            <SvgButton onPress={openModalDeleteModal}>
              <IconSymbol
                size={28}
                name="xmark.circle.fill"
                color={color.error}
              />
            </SvgButton>
          </View>
        </View>

        <Write
          text={description ?? ""}
          fontSize={16}
          style={{
            textDecorationLine: completed ? "line-through" : "none",
            marginLeft: 10,
          }}
        ></Write>
      </View>
      <ModalBottom
        isVisible={isEditModalVisible}
        onCloseModal={closeModalEditModal}
      >
        <EditTodoModalContent
          title={title}
          description={description}
          completed={completed}
          id={id}
          closeModal={closeModalEditModal}
        />
      </ModalBottom>
      <ModalBottom
        isVisible={isDeleteModalVisible}
        onCloseModal={closeModalDeleteModal}
      >
        <DeleteModalContent
          onConfirm={onDeleteTodo}
          onCancel={closeModalDeleteModal}
        />
      </ModalBottom>
    </SimpleCard>
  );
}
