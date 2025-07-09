import type React from "react"

import { useState } from "react"
import { LuMapPin, LuPhone, LuMail, LuClock, LuSend, LuMessageCircle, LuHeart, LuSparkles } from "react-icons/lu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    setIsSubmitted(true)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="container px-4 md:px-6 relative">
          <div className="text-center space-y-8">
            <h1 className="text-5xl md:text-7xl  font-bold text-[var(--color-marron)] leading-tight">
              Hablemos
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
              Estamos aquí para ayudarte. Ya sea que tengas una pregunta, necesites asesoría de estilo o quieras
              compartir tu experiencia con LÚMINA.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl  font-bold">
                  Información de Contacto
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Nuestro equipo está disponible para ayudarte con cualquier consulta. No dudes en contactarnos por
                  cualquiera de estos medios.
                </p>
              </div>

              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start gap-4 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center flex-shrink-0">
                    <LuMapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className=" font-bold text-lg text-gray-800 mb-2">Dirección</h3>
                    <p className="text-gray-600">
                      Av. Reforma 123, Piso 15
                      <br />
                      Col. Centro, Ciudad de México
                      <br />
                      México, 06000
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center flex-shrink-0">
                    <LuPhone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className=" font-bold text-lg text-gray-800 mb-2">Teléfono</h3>
                    <p className="text-gray-600">
                      +52 55 1234 5678
                      <br />
                      WhatsApp: +52 55 8765 4321
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center flex-shrink-0">
                    <LuMail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className=" font-bold text-lg text-gray-800 mb-2">Email</h3>
                    <p className="text-gray-600">
                      hola@lumina.mx
                      <br />
                      soporte@lumina.mx
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center flex-shrink-0">
                    <LuClock className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className=" font-bold text-lg text-gray-800 mb-2">Horarios de Atención</h3>
                    <p className="text-gray-600">
                      Lunes - Viernes: 9:00 AM - 7:00 PM
                      <br />
                      Sábados: 10:00 AM - 6:00 PM
                      <br />
                      Domingos: 11:00 AM - 5:00 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl">
                <h3 className=" font-bold text-lg text-gray-800 mb-4">Síguenos en Redes Sociales</h3>
                <div className="flex gap-4">
                  <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-full px-6 py-2">
                    Instagram
                  </Button>
                  <Button
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-white rounded-full px-6 py-2"
                  >
                    Facebook
                  </Button>
                  <Button
                    variant="outline"
                    className="border-secondary text-secondary hover:bg-secondary hover:text-white rounded-full px-6 py-2"
                  >
                    TikTok
                  </Button>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold">
                      Envíanos un Mensaje
                    </h2>
                    <p className="text-gray-600">
                      Completa el formulario y nos pondremos en contacto contigo lo antes posible.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nombre *</label>
                      <Input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="h-12 rounded-xl border-2 border-[#D4AF37] focus:border-primary"
                        placeholder="Tu nombre completo"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                      <Input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="h-12 rounded-xl border-2 border-[#D4AF37] focus:border-primary"
                        placeholder="tu-email@ejemplo.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Asunto *</label>
                    <Select onValueChange={(value) => handleInputChange("subject", value)}>
                      <SelectTrigger className="h-12 rounded-xl border-2 border-[#D4AF37] focus:border-primary">
                        <SelectValue placeholder="Selecciona un asunto" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">Consulta General</SelectItem>
                        <SelectItem value="order">Estado de Pedido</SelectItem>
                        <SelectItem value="return">Devoluciones</SelectItem>
                        <SelectItem value="styling">Asesoría de Estilo</SelectItem>
                        <SelectItem value="wholesale">Ventas al Mayoreo</SelectItem>
                        <SelectItem value="press">Prensa y Medios</SelectItem>
                        <SelectItem value="other">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mensaje *</label>
                    <Textarea
                      required
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      className="min-h-32 rounded-xl border-2 border-[#D4AF37] focus:border-primary resize-none"
                      placeholder="Cuéntanos cómo podemos ayudarte..."
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#D4AF37] hover:opacity-90 text-white h-12 rounded-xl text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <LuSend className="mr-2 h-5 w-5" />
                    Enviar Mensaje
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    Al enviar este formulario, aceptas nuestra política de privacidad y términos de servicio.
                  </p>
                </form>
              ) : (
                <div className="text-center space-y-6 py-12">
                  <div className="mx-auto w-20 h-20 bg-[#D4AF37] rounded-full flex items-center justify-center">
                    <LuHeart className="h-10 w-10 text-white" />
                  </div>
                  <h3 className=" text-3xl font-bold text-gray-800">¡Mensaje Enviado!</h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Gracias por contactarnos. Hemos recibido tu mensaje y nuestro equipo se pondrá en contacto contigo
                    dentro de las próximas 24 horas.
                  </p>
                  <div className="flex items-center justify-center gap-2 text-sm text-primary font-medium bg-pink-50 rounded-full px-4 py-2">
                    <LuSparkles className="h-4 w-4" />
                    <span>Revisa tu email para la confirmación</span>
                    <LuSparkles className="h-4 w-4" />
                  </div>
                  <Button
                    onClick={() => setIsSubmitted(false)}
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-white"
                  >
                    Enviar Otro Mensaje
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-white/50">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-8 mb-16">
            <h2 className="text-4xl md:text-5xl  font-bold text-transparent">
              Preguntas Frecuentes
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Encuentra respuestas rápidas a las preguntas más comunes sobre LÚMINA.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              {
                question: "¿Cuánto tiempo tarda el envío?",
                answer:
                  "Los envíos dentro de México tardan de 2-5 días hábiles. Ofrecemos envío gratis en compras mayores a $999.",
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

          <div className="text-center mt-12">
            <Button className="bg-[#D4AF37] hover:opacity-90 text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300">
              Ver Todas las FAQ
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
