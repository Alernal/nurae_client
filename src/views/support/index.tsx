import type React from "react"
import { useState } from "react"
import { LuMessageCircle, LuPhone, LuMail, LuSparkles, LuHeadphones, LuCalendar, LuSearch, LuChevronDown } from "react-icons/lu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const supportChannels = [
  {
    title: "Chat en Vivo",
    description: "Respuesta inmediata de nuestros expertos",
    icon: LuMessageCircle,
    color: "text-green-500",
    bgColor: "bg-green-50",
    availability: "24/7",
    responseTime: "Inmediato",
    action: "Iniciar Chat",
  },
  {
    title: "Llamada Telefónica",
    description: "Habla directamente con nuestro equipo",
    icon: LuPhone,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    availability: "Lun-Dom 9AM-9PM",
    responseTime: "Inmediato",
    action: "Llamar Ahora",
  },
  {
    title: "Email Soporte",
    description: "Envía tu consulta detallada por correo",
    icon: LuMail,
    color: "text-purple-500",
    bgColor: "bg-purple-50",
    availability: "24/7",
    responseTime: "2-4 horas",
    action: "Enviar Email",
  },
  {
    title: "Cita Presencial",
    description: "Visita nuestro showroom para asesoría personalizada",
    icon: LuCalendar,
    color: "text-orange-500",
    bgColor: "bg-orange-50",
    availability: "Lun-Sáb 10AM-7PM",
    responseTime: "Mismo día",
    action: "Agendar Cita",
  },
]

const faqCategories = [
  {
    category: "Pedidos y Envíos",
    questions: [
      {
        question: "¿Cuánto tiempo tarda en llegar mi pedido?",
        answer:
          "Los envíos estándar tardan 3-5 días hábiles, mientras que los envíos express llegan en 1-2 días hábiles. Recibirás un número de seguimiento una vez que tu pedido sea despachado.",
      },
      {
        question: "¿Puedo cambiar mi dirección de envío después de hacer el pedido?",
        answer:
          "Sí, puedes cambiar la dirección de envío dentro de las primeras 2 horas después de realizar el pedido. Después de este tiempo, el pedido entra en preparación y no podremos modificar la dirección.",
      },
      {
        question: "¿Hacen envíos internacionales?",
        answer:
          "Actualmente solo realizamos envíos dentro de Colombia. Estamos trabajando para expandir nuestros servicios internacionales próximamente.",
      },
    ],
  },
  {
    category: "Productos y Tallas",
    questions: [
      {
        question: "¿Cómo sé qué talla elegir?",
        answer:
          "Tenemos una guía de tallas detallada para cada tipo de producto. También puedes contactar a nuestro equipo para asesoría personalizada sobre tallas.",
      },
      {
        question: "¿Los productos son hipoalergénicos?",
        answer:
          "Sí, todos nuestros productos están hechos con materiales hipoalergénicos como acero inoxidable 316L y están libres de níquel y plomo.",
      },
      {
        question: "¿Puedo personalizar una joya?",
        answer:
          "Ofrecemos servicios de personalización como grabados. Contacta nuestro equipo para conocer las opciones disponibles y tiempos de entrega.",
      },
    ],
  },
  {
    category: "Pagos y Facturación",
    questions: [
      {
        question: "¿Qué métodos de pago aceptan?",
        answer:
          "Aceptamos tarjetas de crédito y débito (Visa, Mastercard, American Express), PSE, Nequi y transferencias bancarias.",
      },
      {
        question: "¿Emiten factura electrónica?",
        answer:
          "Sí, emitimos factura electrónica para todas las compras. La recibirás en tu email una vez confirmado el pago.",
      },
      {
        question: "¿Puedo pagar en cuotas?",
        answer: "Sí, ofrecemos financiación hasta 12 cuotas sin intereses con tarjetas de crédito participantes.",
      },
    ],
  },
]

export default function SupportPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null)
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: "",
    orderNumber: "",
  })

  const handleFormChange = (field: string, value: string) => {
    setContactForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Tu mensaje ha sido enviado. Te responderemos pronto.")
    setContactForm({
      name: "",
      email: "",
      subject: "",
      category: "",
      message: "",
      orderNumber: "",
    })
  }

  const filteredFAQs = faqCategories
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
    <div className="min-h-screen">

      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-luxury-gradient opacity-10"></div>
        <div className="absolute top-10 left-10 text-pink-300 animate-float">
          <LuHeadphones className="h-12 w-12" />
        </div>
        <div className="absolute bottom-20 right-20 text-purple-300 animate-float" style={{ animationDelay: "1s" }}>
          <LuMessageCircle className="h-16 w-16" />
        </div>

        <div className="container px-4 md:px-6 relative">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-3 rounded-full bg-white/80 backdrop-blur-sm px-6 py-3 text-sm font-medium text-primary shadow-lg border border-pink-200">
              <LuHeadphones className="h-5 w-5" />
              <span className="font-display">Centro de Soporte</span>
              <LuSparkles className="h-5 w-5 animate-pulse" />
            </div>

            <h1 className="text-5xl md:text-7xl font-serif font-bold bg-luxury-gradient bg-clip-text text-transparent leading-tight">
              ¿Cómo podemos ayudarte?
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
              Nuestro equipo de expertos está aquí para resolver todas tus dudas y brindarte la mejor experiencia.
            </p>
          </div>
        </div>
      </section>

      {/* Support Channels */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-8 mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold bg-luxury-gradient bg-clip-text text-transparent">
              Canales de Soporte
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Elige el canal que mejor se adapte a tu consulta</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportChannels.map((channel, index) => {
              const IconComponent = channel.icon
              return (
                <Card
                  key={channel.title}
                  className="bg-white/80 backdrop-blur-sm border-pink-100 hover:shadow-xl transition-all duration-300 text-center"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div
                      className={`w-16 h-16 ${channel.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}
                    >
                      <IconComponent className={`h-8 w-8 ${channel.color}`} />
                    </div>
                    <CardTitle className="font-serif text-xl">{channel.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-600">{channel.description}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Disponibilidad:</span>
                        <span className="font-medium">{channel.availability}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Respuesta:</span>
                        <span className="font-medium">{channel.responseTime}</span>
                      </div>
                    </div>
                    <Button
                      className="w-full bg-luxury-gradient hover:opacity-90 text-white"
                      onClick={() => {
                        if (channel.title === "Email Soporte") {
                          window.open("mailto:soporte@lumina.co", "_blank")
                        } else if (channel.title === "Llamada Telefónica") {
                          window.open("tel:+5712345678", "_blank")
                        } else {
                          alert(`Iniciando ${channel.title}...`)
                        }
                      }}
                    >
                      {channel.action}
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-white/50">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-8 mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold bg-luxury-gradient bg-clip-text text-transparent">
              Preguntas Frecuentes
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Encuentra respuestas rápidas a las consultas más comunes
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <LuSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Busca tu pregunta aquí..."
                  className="pl-12 pr-4 h-14 text-lg border-2 border-pink-200 focus:border-primary rounded-2xl bg-white/80 backdrop-blur-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {filteredFAQs.map((category, categoryIndex) => (
              <Card
                key={category.category}
                className="bg-white/80 backdrop-blur-sm border-pink-100"
                style={{ animationDelay: `${categoryIndex * 0.1}s` }}
              >
                <CardHeader>
                  <CardTitle className="text-2xl font-serif">{category.category}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {category.questions.map((faq, index) => {
                    const itemKey = `${category.category}-${index}`
                    const isOpen = expandedFAQ === itemKey

                    return (
                      <Collapsible
                        key={itemKey}
                        open={isOpen}
                        onOpenChange={() => setExpandedFAQ(isOpen ? null : itemKey)}
                      >
                        <CollapsibleTrigger asChild>
                          <Button
                            variant="ghost"
                            className="w-full justify-between p-4 h-auto text-left bg-gradient-to-r from-pink-50 to-purple-50 hover:from-pink-100 hover:to-purple-100 rounded-xl border border-pink-100"
                          >
                            <span className="font-medium text-lg text-gray-800 pr-4">{faq.question}</span>
                            <LuChevronDown
                              className={`h-5 w-5 text-primary transition-transform duration-200 flex-shrink-0 ${
                                isOpen ? "rotate-180" : ""
                              }`}
                            />
                          </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="px-4 pb-4">
                          <div className="pt-4 text-gray-600 leading-relaxed">{faq.answer}</div>
                        </CollapsibleContent>
                      </Collapsible>
                    )
                  })}
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredFAQs.length === 0 && (
            <div className="text-center space-y-8">
              <div className="text-6xl">🔍</div>
              <h3 className="text-2xl font-serif font-bold text-gray-800">No encontramos resultados</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Intenta con otros términos de búsqueda o contacta directamente a nuestro equipo.
              </p>
              <Button onClick={() => setSearchTerm("")} className="bg-luxury-gradient hover:opacity-90 text-white">
                Ver Todas las Preguntas
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-8 mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold bg-luxury-gradient bg-clip-text text-transparent">
              Envíanos tu Consulta
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Si no encontraste la respuesta que buscas, escríbenos directamente
            </p>
          </div>

          <Card className="bg-white/80 backdrop-blur-sm border-pink-100 max-w-4xl mx-auto">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nombre completo *</Label>
                    <Input
                      id="name"
                      value={contactForm.name}
                      onChange={(e) => handleFormChange("name", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => handleFormChange("email", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Categoría *</Label>
                    <Select value={contactForm.category} onValueChange={(value) => handleFormChange("category", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="order">Pedidos</SelectItem>
                        <SelectItem value="product">Productos</SelectItem>
                        <SelectItem value="shipping">Envíos</SelectItem>
                        <SelectItem value="return">Devoluciones</SelectItem>
                        <SelectItem value="warranty">Garantía</SelectItem>
                        <SelectItem value="other">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="orderNumber">Número de pedido (opcional)</Label>
                    <Input
                      id="orderNumber"
                      value={contactForm.orderNumber}
                      onChange={(e) => handleFormChange("orderNumber", e.target.value)}
                      placeholder="LUM-2024-001234"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="subject">Asunto *</Label>
                  <Input
                    id="subject"
                    value={contactForm.subject}
                    onChange={(e) => handleFormChange("subject", e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="message">Mensaje *</Label>
                  <Textarea
                    id="message"
                    rows={6}
                    value={contactForm.message}
                    onChange={(e) => handleFormChange("message", e.target.value)}
                    placeholder="Describe tu consulta en detalle..."
                    required
                  />
                </div>

                <Button type="submit" className="w-full bg-luxury-gradient hover:opacity-90 text-white h-12">
                  <LuMessageCircle className="mr-2 h-4 w-4" />
                  Enviar Mensaje
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
