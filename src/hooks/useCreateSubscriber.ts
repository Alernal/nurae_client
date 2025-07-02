import { useMutation } from "@tanstack/react-query";
import api from "@/api/client";
import { toast } from "sonner";

type SubscriberInput = {
  email: string;
};

export function useCreateSubscriber() {
  return useMutation({
    mutationFn: async ({ email }: SubscriberInput) => {
      const res = await api.post("/subscribers", { email });
      return res.data;
    },

    onSuccess: () => {
      toast.success("¡Suscripción realizada correctamente!");
    },

    onError: (error: any) => {
      const message = error?.response?.data?.message || "Error al suscribirse al boletín";
      toast.error(message);
    },
  });
}
