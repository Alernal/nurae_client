import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  LuSparkles,
  LuCircleCheck,
  LuGift,
  LuStar,
  LuHeart,
} from "react-icons/lu";
import { useCreateSubscriber } from "@/hooks/useCreateSubscriber";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const { mutate: createSubscriber, isLoading, error } = useCreateSubscriber();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) return;

    createSubscriber(
      { email },
      {
        onSuccess: () => {
          setSubmitted(true);
          setEmail(""); // limpiar el campo
        },
      }
    );
  };

  return (
    <section className="w-full py-20 md:py-28 relative overflow-hidden text-[#7D5840] bg-[#FAF6F2]">
      <div className="container px-4 md:px-6 relative">
        <div className="flex flex-col items-center justify-center text-center gap-6">
          <div className="max-w-4xl">
            <h2 className="text-5xl font-medium leading-tight text-[#7D5840]">
              Suscríbete a nuestro Boletin
            </h2>
          </div>

          {!submitted ? (
            <div className="max-w-md mx-auto">
              <form className="flex gap-2" onSubmit={handleSubmit}>
                <Input
                  type="email"
                  placeholder="tu-email@ejemplo.com"
                  className="h-12 w-60 rounded-xl border-2 border-[#E8D9CF] bg-white focus:border-[#9A6D4E]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                  type="submit"
                  className="bg-[#9A6D4E] hover:bg-[#7D5840] text-white h-12 px-6 rounded-xl"
                  disabled={isLoading}
                >
                  Suscribirse
                </Button>
              </form>
              <p className="text-xs text-[#9A6D4E] mt-2">
                Recibe nuestros últimos artículos en tu email
              </p>
            </div>
          ) : (
            <div className="bg-white p-10 max-w-lg w-full shadow-lg border-[#5E4536]/30">
              <div className="text-center space-y-6">
                <div className="mx-auto w-16 h-16 bg-[#5E4536] rounded-full flex items-center justify-center">
                  <LuCircleCheck className="h-8 w-8 text-white" />
                </div>
                <h3 className=" text-2xl font-bold text-[#7D5840]">
                  ¡Gracias por suscribirte!
                </h3>
                <p className="text-base text-[#5C4A42] leading-relaxed">
                  Te mantendremos informada cuando tengamos novedades o
                  promociones especiales.
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-[#5E4536] font-medium bg-[#FDF5D7] rounded-full px-4 py-2">
                  <span>Revisa tu correo para confirmar tu suscripción</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
