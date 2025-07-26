import { Link } from "react-router-dom";
import {
  LuPackage,
  LuShield,
} from "react-icons/lu";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Shipping Process */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-8 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold">
              Proceso de Envío
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Así es como procesamos y enviamos tu pedido
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Confirmación",
                description: "Verificamos tu pedido y procesamos el pago",
                time: "Inmediato",
              },
              {
                step: "2",
                title: "Preparación",
                description: "Empacamos cuidadosamente tu pedido",
                time: "2-4 horas",
              },
              {
                step: "3",
                title: "Envío",
                description: "Tu pedido sale de nuestro centro de distribución",
                time: "24 horas",
              },
              {
                step: "4",
                title: "Entrega",
                description: "Recibes tu pedido en la dirección indicada",
                time: "1-5 días",
              },
            ].map((step, index) => (
              <div
                key={step.step}
                className="text-center space-y-4"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="mx-auto w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center  text-2xl font-bold">
                  {step.step}
                </div>
                <h3 className=" text-xl font-bold text-gray-800">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
                <div className="text-sm text-primary font-medium">
                  {step.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-8 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold">
              Preguntas Frecuentes sobre Envíos
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              {
                question:
                  "¿Puedo cambiar la dirección de envío después de hacer el pedido?",
                answer:
                  "Sí, puedes cambiar la dirección dentro de las primeras 2 horas después de realizar el pedido. Después de este tiempo, el pedido entra en preparación.",
              },
              {
                question:
                  "¿Qué pasa si no estoy en casa al momento de la entrega?",
                answer:
                  "El transportador intentará la entrega hasta 3 veces. Si no te encuentran, puedes coordinar una nueva fecha o recoger en la oficina más cercana.",
              },
              {
                question: "¿Hacen entregas en días festivos?",
                answer:
                  "No realizamos entregas en días festivos nacionales. Los tiempos de entrega se extienden automáticamente en estos casos.",
              },
              {
                question: "¿Puedo solicitar entrega en horario específico?",
                answer:
                  "Para envíos express ofrecemos ventanas de entrega de 2 horas. Para envíos estándar, la entrega es en horario laboral (8AM-6PM).",
              },
            ].map((faq, index) => (
              <Card
                key={index}
                className="bg-white/80 backdrop-blur-sm border-pink-100 hover:shadow-lg transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <CardTitle className=" text-lg text-gray-800">
                    {faq.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-black text-white">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold">
              ¿Tienes más preguntas?
            </h2>
            <p className="text-xl text-gray-200 leading-relaxed">
              Nuestro equipo de atención al cliente está aquí para ayudarte con
              cualquier duda sobre envíos y entregas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/support">
                <Button className="bg-white hover:opacity-90 text-black px-8 py-3 rounded-none text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300">
                  Contactar Soporte
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
