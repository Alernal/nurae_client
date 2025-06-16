import { useState } from "react"
import { LuChevronDown, LuSearch, LuCircle, LuSparkles } from "react-icons/lu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const faqCategories = [
  {
    title: "Pedidos y Pagos",
    icon: "💳",
    questions: [
      {
        question: "¿Qué métodos de pago aceptan?",
        answer:
          "Aceptamos tarjetas de crédito y débito (Visa, Mastercard, American Express), PSE, Nequi, Daviplata y pagos en efectivo a través de Efecty y Baloto. También ofrecemos financiación hasta 12 cuotas sin intereses.",
      },
      {
        question: "¿Cómo puedo rastrear mi pedido?",
        answer:
          "Una vez confirmado tu pedido, recibirás un email con el número de seguimiento. También puedes ingresar a tu cuenta en nuestra página web para ver el estado actualizado de tu pedido en tiempo real.",
      },
      {
        question: "¿Puedo modificar o cancelar mi pedido?",
        answer:
          "Puedes modificar o cancelar tu pedido dentro de las primeras 2 horas después de realizarlo. Después de este tiempo, el pedido entra en proceso de preparación y no puede ser modificado.",
      },
      {
        question: "¿Emiten factura?",
        answer:
          "Sí, emitimos factura electrónica para todos los pedidos. La recibirás en tu email registrado una vez que el pedido sea confirmado.",
      },
    ],
  },
  {
    title: "Envíos y Entregas",
    icon: "🚚",
    questions: [
      {
        question: "¿Cuánto tiempo tarda el envío?",
        answer:
          "Los envíos dentro de Bogotá tardan 1-2 días hábiles. Para otras ciudades principales (Medellín, Cali, Barranquilla) 2-3 días hábiles. Para el resto del país 3-5 días hábiles.",
      },
      {
        question: "¿El envío tiene costo?",
        answer:
          "El envío es GRATIS en compras superiores a $150.000 COP. Para compras menores, el costo de envío es de $15.000 COP a nivel nacional.",
      },
      {
        question: "¿Hacen entregas internacionales?",
        answer:
          "Actualmente solo realizamos envíos dentro de Colombia. Estamos trabajando para expandir nuestros envíos a otros países de Latinoamérica próximamente.",
      },
      {
        question: "¿Qué pasa si no estoy en casa al momento de la entrega?",
        answer:
          "Nuestro transportador intentará la entrega hasta 3 veces. Si no te encuentran, puedes coordinar una nueva fecha de entrega o recoger el paquete en la oficina más cercana.",
      },
    ],
  },
  {
    title: "Productos y Calidad",
    icon: "💎",
    questions: [
      {
        question: "¿Qué materiales utilizan?",
        answer:
          "Utilizamos acero inoxidable 316L con baños de oro de 18k, plata 925, cristales de alta calidad y perlas cultivadas. Todos nuestros materiales son hipoalergénicos y libres de níquel.",
      },
      {
        question: "¿Las joyas son resistentes al agua?",
        answer:
          "Nuestras piezas son resistentes al agua y al sudor para uso diario. Sin embargo, recomendamos evitar el contacto prolongado con agua salada, cloro y productos químicos para mantener su brillo original.",
      },
      {
        question: "¿Cómo sé qué talla elegir?",
        answer:
          "Tenemos una guía de tallas detallada en nuestra página web. Para anillos, también ofrecemos un medidor de tallas gratuito que puedes solicitar. Si tienes dudas, nuestro equipo puede asesorarte.",
      },
      {
        question: "¿Ofrecen garantía en sus productos?",
        answer:
          "Sí, todos nuestros productos tienen garantía de 1 año contra defectos de fabricación. La garantía cubre problemas de baño, cierres y estructura, pero no cubre daños por uso inadecuado.",
      },
    ],
  },
  {
    title: "Devoluciones y Cambios",
    icon: "🔄",
    questions: [
      {
        question: "¿Puedo devolver un producto?",
        answer:
          "Sí, aceptamos devoluciones dentro de los 30 días posteriores a la compra. El producto debe estar en condiciones originales, sin usar, con etiquetas y en su empaque original.",
      },
      {
        question: "¿Cómo proceso una devolución?",
        answer:
          "Puedes iniciar el proceso de devolución desde tu cuenta en línea o contactándonos. Te enviaremos una guía de devolución prepagada y procesaremos el reembolso una vez recibamos el producto.",
      },
      {
        question: "¿Puedo cambiar por otra talla o color?",
        answer:
          "Sí, ofrecemos cambios gratuitos por talla o color dentro de los 30 días. El primer cambio es gratuito, cambios adicionales tienen un costo de envío.",
      },
      {
        question: "¿Cuánto tardan en procesar el reembolso?",
        answer:
          "Una vez recibamos y verifiquemos el producto devuelto, procesamos el reembolso en 3-5 días hábiles. El tiempo de reflejo en tu cuenta depende de tu entidad bancaria.",
      },
    ],
  },
  {
    title: "Cuenta y Membresía",
    icon: "👤",
    questions: [
      {
        question: "¿Necesito crear una cuenta para comprar?",
        answer:
          "No es obligatorio, pero recomendamos crear una cuenta para acceder a beneficios exclusivos, rastrear pedidos fácilmente y recibir ofertas personalizadas.",
      },
      {
        question: "¿Qué beneficios tiene ser miembro VIP?",
        answer:
          "Los miembros VIP reciben acceso anticipado a nuevas colecciones, descuentos exclusivos, envío gratis sin mínimo de compra y atención prioritaria.",
      },
      {
        question: "¿Cómo cambio mi información personal?",
        answer:
          "Puedes actualizar tu información personal ingresando a tu cuenta en 'Mi Perfil'. Si tienes problemas, nuestro equipo de soporte puede ayudarte.",
      },
      {
        question: "¿Cómo me suscribo al newsletter?",
        answer:
          "Puedes suscribirte al newsletter en cualquier página de nuestro sitio web o durante el proceso de compra. También puedes hacerlo desde tu cuenta de usuario.",
      },
    ],
  },
]

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (item: string) => {
    setOpenItems((prev) => (prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]))
  }

  const filteredCategories = faqCategories
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    }))
    .filter((category) => category.questions.length > 0)

  return (
    <div className="min-h-screen bg-[#FDF8F4]">

      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="container px-4 md:px-6 relative">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-medium text-[#9A6D4E] shadow-sm border border-[#E8D9CF]">
              <LuCircle className="h-5 w-5" />
              <span className="font-medium">Centro de Ayuda</span>
              <LuSparkles className="h-5 w-5" />
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-[#5E4536] leading-tight">Preguntas Frecuentes</h1>

            <p className="text-xl md:text-2xl text-[#9A6D4E] max-w-3xl mx-auto font-light leading-relaxed">
              Encuentra respuestas rápidas a las preguntas más comunes sobre NURAE. Si no encuentras lo que buscas,
              contáctanos.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <LuSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#9A6D4E]" />
                <Input
                  type="text"
                  placeholder="Busca tu pregunta aquí..."
                  className="pl-12 pr-4 h-14 text-lg border-2 border-[#E8D9CF] focus:border-[#9A6D4E] rounded-2xl bg-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          {filteredCategories.length === 0 ? (
            <div className="text-center space-y-8">
              <div className="text-6xl">🔍</div>
              <h3 className="text-2xl font-bold text-[#5E4536]">No encontramos resultados</h3>
              <p className="text-[#9A6D4E] max-w-md mx-auto">
                Intenta con otros términos de búsqueda o explora nuestras categorías principales.
              </p>
              <Button onClick={() => setSearchTerm("")} className="bg-[#9A6D4E] hover:bg-[#7D5840] text-white">
                Ver Todas las Preguntas
              </Button>
            </div>
          ) : (
            <div className="space-y-12">
              {filteredCategories.map((category, categoryIndex) => (
                <div
                  key={category.title}
                  className="bg-white rounded-3xl p-8 shadow-md border border-[#E8D9CF]"
                  style={{ animationDelay: `${categoryIndex * 0.1}s` }}
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div className="text-4xl">{category.icon}</div>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#5E4536]">{category.title}</h2>
                  </div>

                  <div className="space-y-4">
                    {category.questions.map((faq, index) => {
                      const itemKey = `${category.title}-${index}`
                      const isOpen = openItems.includes(itemKey)

                      return (
                        <Collapsible key={itemKey} open={isOpen} onOpenChange={() => toggleItem(itemKey)}>
                          <CollapsibleTrigger asChild>
                            <Button
                              variant="ghost"
                              className="w-full justify-between p-6 h-auto text-left bg-[#F5EEE8] hover:bg-[#E8D9CF] rounded-2xl border border-[#E8D9CF]"
                            >
                              <span className="font-medium text-lg text-[#5E4536] pr-4">{faq.question}</span>
                              <LuChevronDown
                                className={`h-5 w-5 text-[#9A6D4E] transition-transform duration-200 flex-shrink-0 ${
                                  isOpen ? "rotate-180" : ""
                                }`}
                              />
                            </Button>
                          </CollapsibleTrigger>
                          <CollapsibleContent className="px-6 pb-6">
                            <div className="pt-4 text-[#9A6D4E] leading-relaxed text-base">{faq.answer}</div>
                          </CollapsibleContent>
                        </Collapsible>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 md:py-24 bg-[#F5EEE8]">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-[#5E4536]">¿No encontraste tu respuesta?</h2>
            <p className="text-xl text-[#9A6D4E] leading-relaxed">
              Nuestro equipo de atención al cliente está aquí para ayudarte. Contáctanos y te responderemos lo antes
              posible.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white rounded-2xl p-6 border border-[#E8D9CF] text-center">
                <div className="text-3xl mb-4">💬</div>
                <h3 className="font-bold text-lg mb-2 text-[#5E4536]">Chat en Vivo</h3>
                <p className="text-sm text-[#9A6D4E] mb-4">Lun - Vie: 9AM - 7PM</p>
                <Button className="bg-[#9A6D4E] hover:bg-[#7D5840] text-white w-full">Iniciar Chat</Button>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-[#E8D9CF] text-center">
                <div className="text-3xl mb-4">📧</div>
                <h3 className="font-bold text-lg mb-2 text-[#5E4536]">Email</h3>
                <p className="text-sm text-[#9A6D4E] mb-4">Respuesta en 24 horas</p>
                <Button
                  variant="outline"
                  className="border-[#9A6D4E] text-[#9A6D4E] hover:bg-[#9A6D4E] hover:text-white w-full"
                >
                  Enviar Email
                </Button>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-[#E8D9CF] text-center">
                <div className="text-3xl mb-4">📞</div>
                <h3 className="font-bold text-lg mb-2 text-[#5E4536]">Teléfono</h3>
                <p className="text-sm text-[#9A6D4E] mb-4">+57 1 234 5678</p>
                <Button
                  variant="outline"
                  className="border-[#E76F51] text-[#E76F51] hover:bg-[#E76F51] hover:text-white w-full"
                >
                  Llamar Ahora
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
