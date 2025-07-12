import { useState } from "react"
import { LuChevronDown, LuSearch, LuCircle, LuSparkles } from "react-icons/lu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"


export default function FAQPage() {

  return (
    <div className="min-h-screen">

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-white/50">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-8 mb-16">
            <h2 className="text-4xl md:text-5xl  font-bold text-[#5E4536]">
              Preguntas Frecuentes
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Encuentra respuestas rápidas a las preguntas más comunes sobre NURAE.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              {
                question: "¿Cuánto tiempo tarda el envío?",
                answer:
                  "Los envíos dentro de Colombia tardan de 2-5 días hábiles. Ofrecemos envío gratis en compras mayores a $150.000.",
              },
              {
                question: "¿Puedo devolver un producto?",
                answer:
                  "Sí, aceptamos devoluciones dentro de los 30 días posteriores a la compra, siempre que el producto esté en condiciones originales.",
              },
              {
                question: "¿Los materiales son de calidad?",
                answer:
                  "Absolutamente. Utilizamos solo materiales premium como oro de 18k, plata 925 y cristales de alta calidad.",
              },
              {
                question: "¿Ofrecen asesoría de estilo?",
                answer:
                  "Sí, nuestro equipo de estilistas está disponible para ayudarte a elegir las piezas perfectas para tu estilo personal.",
              },
              {
                question: "¿Tienen tienda física?",
                answer:
                  "Actualmente somos una marca digital, pero estamos planeando abrir nuestro primer showroom en 2025.",
              },
              {
                question: "¿Manejan ventas al mayoreo?",
                answer:
                  "Sí, ofrecemos precios especiales para boutiques y revendedores. Contáctanos para más información.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className=" font-bold text-lg text-gray-800 mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
