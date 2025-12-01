import { useQuery, useQueryClient } from "@tanstack/react-query";
import storeToken from "../../auth/token/store-token";
import { Todo } from "../../home/interfaces/todo.interface";

export const useGetTodosFromApi = (session: string | null | undefined) => {
  const { data, isLoading, error, refetch } = useQuery<Todo[]>({
    queryKey: ["todos-from-api", session],
    queryFn: () => {
      return getTodos().then((response) => {
        return response;
      });
    },
    retry: 3,
  });
  return { todoListFromApi: data, isLoading, error, refetch };
};

const getTodos = async () => {
  try {
    const token = await storeToken.getToken();
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 1000);
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}tasks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      signal: controller.signal,
    });
    if (response.ok) {
      clearTimeout(id);
      return response.json();
    }
    return [] as Todo[];
  } catch (error) {
    return Promise.reject({
      message: "Error al obtener tareas",
      error,
      data: null,
    });
  }
};

export function useInvalidateTodos() {
  const queryClient = useQueryClient();
  return () => {
    queryClient.invalidateQueries({
      queryKey: ["todos-from-api"],
    });
  };
}
