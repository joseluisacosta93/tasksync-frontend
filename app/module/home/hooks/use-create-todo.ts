import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";
import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";
import { useSyncTodos } from "../../sync-api/hooks/use-sync-todos";

export interface Todo {
  title: string;
  description?: string;
  completed: boolean;
}

export const useCreateTodo = ({ onSuccess }: { onSuccess?: () => void }) => {
  const { syncTodos } = useSyncTodos();
  const { mutate, isPending } = useMutation({
    mutationFn: (payload: Todo): Promise<void> => createTodo(payload),
    onSuccess: () => {
      syncTodos();
      onSuccess && onSuccess();
    },
  });

  return { mutate, isPending };
};

const createTodo = async (payload: Todo): Promise<void> => {
  let { status } = await requestForegroundPermissionsAsync();
  if (status !== "granted") {
    alert("Permiso de ubicación denegado. No se puede obtener la posición.");
    return;
  }

  const location = await getCurrentPositionAsync({});
  const { latitude, longitude } = location.coords;

  const id = Math.floor(Math.random() * 10000);
  const todosString = (await AsyncStorage.getItem("todos")) || "[]";
  const todos = JSON.parse(todosString) as Todo[];

  AsyncStorage.setItem(
    "todos",
    JSON.stringify([
      ...todos,
      {
        ...payload,
        latitude,
        longitude,
        id,
      },
    ])
  ).then(() => {
    Promise.resolve();
  });
};
