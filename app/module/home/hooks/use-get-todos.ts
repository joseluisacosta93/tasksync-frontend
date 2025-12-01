import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface Todo {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
}

export const useGetTodos = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["todos"],
    queryFn: () => {
      return getTodos();
    },
  });

  return { data, isLoading, error };
};

export const useRefrestTodos = () => {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: ["todos"] });
};

const getTodos = async () => {
  const todosString = (await AsyncStorage.getItem("todos")) || "[]";
  const todos = JSON.parse(todosString) as Todo[];
  return todos;
};
