import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";
import storeToken from "../../auth/token/store-token";

export interface SyncTodo {
  title: string;
  description?: string;
  completed: boolean;
  id: number;
}

export const useSyncTodos = () => {
  const { mutate } = useMutation({
    mutationFn: (): Promise<void> => syncTodo(),
    onError: (error) => {
      console.log(error);
    },
    onSuccess: () => {},
    retry: 3,
  });

  return { syncTodos: mutate };
};

const syncTodo = async (): Promise<void> => {
  const todosString = (await AsyncStorage.getItem("todos")) || "[]";
  const todos = JSON.parse(todosString) as SyncTodo[];
  const token = await storeToken.getToken();
  try {
    fetch(`${process.env.EXPO_PUBLIC_API_URL}tasks/seed`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(todos),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  } catch (error) {
    console.log(error);
  }
};
