import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  LuCircleCheck,
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
          setEmail("");
        },
      }
    );
  };

  return (
    <section className="w-full bg-black py-12 md:py-20 lg:py-28 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative">
        <div className="flex flex-col items-center justify-center text-center gap-6">
          <div className="max-w-[90%] sm:max-w-2xl md:max-w-4xl mx-auto px-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-thin italic font-subtitulo leading-tight text-white">
              Suscríbete a nuestro Boletin
            </h2>
          </div>

          {!submitted ? (
            <div className="w-full max-w-[90%] sm:max-w-md md:max-w-lg mx-auto">
              <form
                className="flex flex-col sm:flex-row gap-3 sm:gap-2 justify-center"
                onSubmit={handleSubmit}
              >
                <Input
                  type="email"
                  placeholder="tu-email@ejemplo.com"
                  className="h-12 w-full sm:w-60 md:w-80 lg:w-100 rounded-none border border-gray-500 text-sm sm:text-base"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                  type="submit"
                  className="bg-white rounded-none text-black hover:bg-white/90 h-12 px-6 w-full sm:w-auto text-sm sm:text-base"
                  disabled={isLoading}
                >
                  Suscribirse
                </Button>
              </form>
              <p className="text-xs sm:text-sm mt-2 text-center text-gray-200">
                Recibe nuestros últimos artículos en tu email
              </p>
            </div>
          ) : (
            <div className="bg-white p-5 sm:p-6 md:p-8 lg:p-10 max-w-[90%] sm:max-w-md md:max-w-lg w-full shadow-lg border-[#5E4536]/30 mx-auto rounded-xl">
              <div className="text-center space-y-6">
                <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-[#5E4536] rounded-full flex items-center justify-center">
                  <LuCircleCheck className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#7D5840]">
                  ¡Gracias por suscribirte!
                </h3>
                <p className="text-sm md:text-base text-[#5C4A42] leading-relaxed px-2 sm:px-0">
                  Te mantendremos informada cuando tengamos novedades o
                  promociones especiales.
                </p>
                <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-[#5E4536] font-medium bg-[#FDF5D7] rounded-full px-3 sm:px-4 py-2">
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
