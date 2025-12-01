import { useMutation } from "@tanstack/react-query";
import { useSession } from "../../auth/session.provider";
export const useLogin = () => {
  const { signIn } = useSession();
  console.log("API URL:", process.env.EXPO_PUBLIC_API_URL);
  const { mutate, isPending, error } = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      return await fetch(`${process.env.EXPO_PUBLIC_API_URL}auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    },
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      signIn(data.token);
    },
  });

  return { loginApi: mutate, isPending, error };
};
