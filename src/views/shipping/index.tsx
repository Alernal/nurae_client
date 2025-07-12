import { Link } from "react-router-dom";
import {
  LuTruck,
  LuClock,
  LuMapPin,
  LuPackage,
  LuShield,
  LuCircle,
  LuSparkles,
} from "react-icons/lu";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const shippingOptions = [
  {
    name: "Envío Estándar",
    time: "3-5 días hábiles",
    cost: "$15.000 COP",
    description: "Perfecto para pedidos regulares",
    icon: LuTruck,
    features: [
      "Seguimiento incluido",
      "Seguro básico",
      "Entrega en horario laboral",
    ],
  },
  {
    name: "Envío Express",
    time: "1-2 días hábiles",
    cost: "$25.000 COP",
    description: "Para cuando lo necesitas rápido",
    icon: LuClock,
    features: [
      "Seguimiento en tiempo real",
      "Seguro completo",
      "Entrega prioritaria",
    ],
  },
  {
    name: "Envío Gratis",
    time: "3-5 días hábiles",
    cost: "GRATIS",
    description: "En compras superiores a $150.000",
    icon: LuPackage,
    features: [
      "Sin costo adicional",
      "Seguimiento incluido",
      "Mismo servicio estándar",
    ],
  },
];

const deliveryZones = [
  {
    zone: "Sucre",
    time: "1-2 días hábiles",
    coverage: "Sincelejo, Corozal, Sampués, San Onofre",
  },
  {
    zone: "Ciudades Principales",
    time: "2-3 días hábiles",
    coverage: "Medellín, Cali, Barranquilla, Cartagena, Bucaramanga",
  },
  {
    zone: "Resto del País",
    time: "3-5 días hábiles",
    coverage: "Todas las demás ciudades y municipios",
  },
];

export default function ShippingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-36 md:py-28 overflow-hidden bg-[var(--color-marron)]">
        <div className="container px-4 md:px-6 relative">
          <div className="text-center space-y-8">
            <h1 className="text-5xl md:text-7xl  font-bold text-white leading-tight">
              Envíos y Entregas
            </h1>

            <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto font-light leading-relaxed">
              Llevamos tus joyas favoritas hasta la puerta de tu casa de forma
              segura y rápida en toda Colombia.
            </p>
          </div>
        </div>
      </section>

      {/* Shipping Options */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-8 mb-16">
            <h2 className="text-4xl md:text-5xl  font-bold text-[#5E4536]">
              Opciones de Envío
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Elige la opción que mejor se adapte a tus necesidades
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {shippingOptions.map((option, index) => {
              const IconComponent = option.icon;
              return (
                <Card
                  key={option.name}
                  className="bg-white/80 backdrop-blur-sm border-pink-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="mx-auto w-16 h-16 bg-luxury-gradient rounded-full flex items-center justify-center mb-4">
                      <IconComponent className="h-15 w-15 text-[var(--color-amarillo)]" />
                    </div>
                    <CardTitle className=" text-2xl text-gray-800">
                      {option.name}
                    </CardTitle>
                    <div className="text-3xl font-bold text-primary">
                      {option.cost}
                    </div>
                    <CardDescription className="text-lg">
                      {option.time}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-600">{option.description}</p>
                    <ul className="space-y-2">
                      {option.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2 text-sm text-gray-600"
                        >
                          <LuCircle className="h-4 w-4 text-[var(--color-amarillo)]" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Delivery Zones */}
      <section className="py-16 md:py-24 bg-white/50">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-8 mb-16">
            <h2 className="text-4xl md:text-5xl  font-bold text-[#5E4536]">
              Zonas de Entrega
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tiempos de entrega según tu ubicación en Colombia
            </p>
          </div>

          <div className="space-y-6">
            {deliveryZones.map((zone, index) => (
              <Card
                key={zone.zone}
                className="bg-white/80 backdrop-blur-sm border-pink-100 hover:shadow-lg transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                    <div className="flex-1">
                      <h3 className=" text-2xl font-bold text-gray-800 mb-2">
                        {zone.zone}
                      </h3>
                      <p className="text-gray-600 mb-2">{zone.coverage}</p>
                      <div className="inline-flex items-center gap-2 bg-green-100 px-3 py-1 rounded-full text-sm font-medium">
                        <LuClock className="h-4 w-4" />
                        {zone.time}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Shipping Process */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-8 mb-16">
            <h2 className="text-4xl md:text-5xl  font-bold text-[#5E4536]">
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
                <div className="mx-auto w-16 h-16 rounded-full shadow-xl flex items-center justify-center text-[var(--color-amarillo)] text-2xl font-bold">
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

      {/* Important Information */}
      <section className="py-16 md:py-24 bg-white/50">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-8 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#5E4536]">
              Información Importante
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-white/80 backdrop-blur-sm border-pink-100">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <LuShield className="h-8 w-8 text-[var(--color-amarillo)]" />
                  <CardTitle className=" text-xl">
                    Seguridad y Protección
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-gray-600">
                  • Todos los envíos incluyen seguro contra pérdida o daño
                </p>
                <p className="text-gray-600">
                  • Empaque discreto para proteger tu privacidad
                </p>
                <p className="text-gray-600">
                  • Seguimiento en tiempo real de tu pedido
                </p>
                <p className="text-gray-600">
                  • Firma requerida para la entrega
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-pink-100">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <LuPackage className="h-8 w-8 text-[var(--color-amarillo)]" />
                  <CardTitle className=" text-xl">
                    Empaque Especial
                  </CardTitle>
                </div> 
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-gray-600">
                  • Caja de regalo NURAE incluida
                </p>
                <p className="text-gray-600">
                  • Materiales de empaque sostenibles
                </p>
                <p className="text-gray-600">
                  • Protección extra para productos frágiles
                </p>
                <p className="text-gray-600">
                  • Tarjeta de cuidado y garantía incluida
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-8 mb-16">
            <h2 className="text-4xl md:text-5xl text-[var(--color-marron)] font-bold">
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
      <section className="py-16 md:py-24 bg-white/50">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl text-[var(--color-marron)] font-bold">
              ¿Tienes más preguntas?
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Nuestro equipo de atención al cliente está aquí para ayudarte con
              cualquier duda sobre envíos y entregas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/support">
                <Button className="bg-[var(--color-marron)] hover:opacity-90 text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300">
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
