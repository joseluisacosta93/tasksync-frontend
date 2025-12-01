import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";
import { useSyncTodos } from "../../sync-api/hooks/use-sync-todos";

interface Todo {
  title: string;
  description?: string;
  completed: boolean;
  id: number;
}

export const useDeleteTodo = ({ onSuccess }: { onSuccess?: () => void }) => {
  const { syncTodos } = useSyncTodos();
  const { mutate } = useMutation({
    mutationFn: (payload: Todo): Promise<void> => deleteTodo(payload),
    onSuccess: () => {
      syncTodos();
      onSuccess && onSuccess();
    },
  });

  return { mutate };
};

const deleteTodo = async (payload: Todo): Promise<void> => {
  const todosString = (await AsyncStorage.getItem("todos")) || "[]";
  const todos = JSON.parse(todosString) as Todo[];
  const newTodos = todos.filter((todo) => todo.id !== payload.id);
  AsyncStorage.setItem("todos", JSON.stringify(newTodos)).then(() => {
    Promise.resolve();
  });
};
