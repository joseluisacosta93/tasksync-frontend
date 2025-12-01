import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";
import { useSyncTodos } from "../../sync-api/hooks/use-sync-todos";

export interface EditTodo {
  title: string;
  description?: string;
  completed: boolean;
  id: number;
}

export const useEditTodo = ({ onSuccess }: { onSuccess?: () => void }) => {
  const { syncTodos } = useSyncTodos();
  const { mutate } = useMutation({
    mutationFn: (payload: EditTodo): Promise<void> => editTodo(payload),
    onSuccess: () => {
      syncTodos();
      onSuccess && onSuccess();
    },
  });

  return { mutate };
};

const editTodo = async (payload: EditTodo): Promise<void> => {
  const todosString = (await AsyncStorage.getItem("todos")) || "[]";
  const todos = JSON.parse(todosString) as EditTodo[];
  const newTodos = todos.map((todo) => {
    if (todo.id === payload.id) {
      return {
        ...todo,
        title: payload.title,
        description: payload.description,
        completed: payload.completed,
      };
    }
    return todo;
  });
  AsyncStorage.setItem("todos", JSON.stringify(newTodos)).then(() => {
    Promise.resolve();
  });
};
