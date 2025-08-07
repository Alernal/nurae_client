import {Link} from "react-router-dom"
import { LuRotateCcw, LuClock, LuCircle, LuCircleAlert, LuPackage, LuTruck, LuCreditCard, LuSparkles } from "react-icons/lu"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const returnReasons = [
  {
    title: "Producto defectuoso",
    description: "El producto llegó dañado o con defectos de fabricación",
    icon: LuCircleAlert,
    color: "text-black",
    bgColor: "bg-gray-100",
  },
  {
    title: "Talla incorrecta",
    description: "El producto no tiene la talla que esperabas",
    icon: LuPackage,
    color: "text-black",
    bgColor: "bg-gray-100",
  },
  {
    title: "No cumple expectativas",
    description: "El producto no es como lo esperabas",
    icon: LuRotateCcw,
    color: "text-black",
    bgColor: "bg-gray-100",
  },
  {
    title: "Cambio de opinión",
    description: "Simplemente cambiaste de opinión sobre la compra",
    icon: LuCircle,
    color: "text-black",
    bgColor: "bg-gray-100",
  },
]

const returnProcess = [
  {
    step: "1",
    title: "Solicita la devolución",
    description: "Contacta nuestro servicio al cliente dentro de los 30 días",
    time: "0-1 día",
  },
  {
    step: "2",
    title: "Empaca el producto",
    description: "Incluye todos los accesorios y la caja original",
    time: "1 día",
  },
  {
    step: "3",
    title: "Envía el paquete",
    description: "Usa la etiqueta de envío prepagada que te proporcionamos",
    time: "2-5 días",
  },
  {
    step: "4",
    title: "Recibe tu reembolso",
    description: "Procesamos tu reembolso una vez recibido el producto",
    time: "3-7 días",
  },
]

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Return Policy Overview */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-8 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold">
              Nuestra Política
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Queremos que estés completamente satisfecha con tu compra
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-white/80 backdrop-blur-sm border-pink-100 text-center">
              <CardContent className="p-8">
                <h3 className=" text-xl font-bold text-gray-800 mb-2">30 Días</h3>
                <p className="text-gray-600">Tienes 30 días desde la recepción para solicitar una devolución</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-pink-100 text-center">
              <CardContent className="p-8">
                <h3 className=" text-xl font-bold text-gray-800 mb-2">Envío Gratis</h3>
                <p className="text-gray-600">Proporcionamos etiqueta de envío prepagada para todas las devoluciones</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-pink-100 text-center">
              <CardContent className="p-8">
                <h3 className=" text-xl font-bold text-gray-800 mb-2">Reembolso Completo</h3>
                <p className="text-gray-600">Reembolsamos el 100% del valor del producto en 3-7 días hábiles</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Return Reasons */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-8 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold">
              Motivos de Devolución
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Aceptamos devoluciones por cualquiera de estos motivos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {returnReasons.map((reason, index) => {
              const IconComponent = reason.icon
              return (
                <Card
                  key={reason.title}
                  className="bg-white/80 hover:shadow-lg transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 ${reason.bgColor} rounded-full flex items-center justify-center flex-shrink-0`}
                      >
                        <IconComponent className={`h-6 w-6 ${reason.color}`} />
                      </div>
                      <div>
                        <h3 className=" text-xl font-bold text-gray-800 mb-2">{reason.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{reason.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Return Process */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-8 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold">
              Proceso de Devolución
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Sigue estos sencillos pasos para devolver tu producto
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {returnProcess.map((step, index) => (
              <div key={step.step} className="text-center space-y-4" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center bg-gray-100 text-2xl font-bold">
                  {step.step}
                </div>
                <h3 className=" text-xl font-bold text-gray-800">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
                <Badge variant="outline" className="text-primary border-primary">
                  {step.time}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conditions */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-8 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold">
              Condiciones para Devoluciones
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-center w-4xl mx-auto">
            <Card className="bg-white/80 backdrop-blur-sm border-pink-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2  text-xl">
                  <LuCircle className="h-6 w-6" />
                  Productos Elegibles
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-gray-600">• Productos en condición original y sin usar</p>
                <p className="text-gray-600">• Con etiquetas y empaques originales</p>
                <p className="text-gray-600">• Dentro del período de 30 días</p>
                <p className="text-gray-600">• Con comprobante de compra</p>
                <p className="text-gray-600">• Joyas sin signos de uso o desgaste</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-pink-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2  text-xl">
                  <LuCircleAlert className="h-6 w-6" />
                  Productos No Elegibles
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-gray-600">• Productos personalizados o grabados</p>
                <p className="text-gray-600">• Joyas con signos evidentes de uso</p>
                <p className="text-gray-600">• Productos dañados por mal uso</p>
                <p className="text-gray-600">• Artículos en oferta final (clearance)</p>
                <p className="text-gray-600">• Productos sin empaque original</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-8 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold">
              Preguntas Frecuentes
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              {
                question: "¿Cuánto tiempo toma procesar mi reembolso?",
                answer:
                  "Una vez que recibimos tu producto devuelto, procesamos el reembolso en 3-7 días hábiles. El tiempo puede variar según tu método de pago original.",
              },
              {
                question: "¿Puedo cambiar un producto por otro?",
                answer:
                  "Sí, ofrecemos cambios por talla o color diferente. El proceso es el mismo que una devolución, pero puedes seleccionar el producto de reemplazo.",
              },
              {
                question: "¿Qué pasa si mi producto llegó dañado?",
                answer:
                  "Si tu producto llegó dañado, contáctanos inmediatamente. Proporcionaremos un reemplazo gratuito y cubriremos todos los costos de envío.",
              },
              {
                question: "¿Puedo devolver un regalo?",
                answer:
                  "Sí, los regalos pueden ser devueltos dentro del período de 30 días. El reembolso se procesará como crédito de tienda si no tienes el recibo original.",
              },
            ].map((faq, index) => (
              <Card
                key={index}
                className="bg-white/80 backdrop-blur-sm border-pink-100 hover:shadow-lg transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <CardTitle className=" text-lg text-gray-800">{faq.question}</CardTitle>
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
              ¿Necesitas hacer una devolución?
            </h2>
            <p className="text-xl text-gray-200 leading-relaxed">
              Nuestro equipo de atención al cliente está aquí para ayudarte con el proceso de devolución.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/support">
                <Button
                  variant="outline"
                  className="bg-white hover:opacity-90 border-none text-black px-8 py-3 rounded-none text-lg font-medium"
                >
                  Contactar Soporte
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
