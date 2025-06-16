import { useQuery } from "@tanstack/react-query";
import api from "@/api/client";

export function useReviews() {
  return useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await api.get("/reviews");
      return res.data?.data;
    },
  });
}
