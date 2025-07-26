import type React from "react"

import { useState } from "react"
import { LuMapPin, LuPhone, LuMail, LuClock, LuSend, LuMessageCircle, LuHeart, LuSparkles } from "react-icons/lu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Link } from "react-router-dom"
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa"

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
    <div className="min-h-screen ">
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
                <div className="flex items-start gap-4 ">
                  
                  <div>
                    <h3 className=" font-bold text-lg text-gray-800 mb-2">Dirección</h3>
                    <p className="text-gray-600">
                      Carrera 16 # 15a - 144
                      <br />
                      Sincelejo, Sucre.
                      <br />
                      Colombia, 700002
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4 ">
                  
                  <div>
                    <h3 className=" font-bold text-lg text-gray-800 mb-2">Teléfono</h3>
                    <p className="text-gray-600">
                      WhatsApp: +57 (314) 808 - 7646
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 ">
                  
                  <div>
                    <h3 className=" font-bold text-lg text-gray-800 mb-2">Email</h3>
                    <p className="text-gray-600">
                      contacto@nurae.com.co
                      <br />
                      soporte@nurae.com.co
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4  ">
                  
                  <div>
                    <h3 className=" font-bold text-lg text-gray-800 mb-2">Horarios de Atención</h3>
                    <p className="text-gray-600">
                      Lunes - Viernes: 9:00 AM - 6:00 PM
                      <br />
                      Sábados: 10:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="">
                <h3 className=" font-bold text-lg text-gray-800 mb-4">Síguenos en Redes Sociales</h3>
                <div className="flex gap-4">
                  <Link to="#" className="hover:text-gray-400 text-gray-800 transition-colors">
                    <FaInstagram className="w-10 h-10" />
                  </Link>
                  <Link to="#" className="hover:text-gray-400 text-gray-800 transition-colors">
                    <FaFacebook className="w-10 h-10" />
                  </Link>
                  <Link to="#" className="hover:text-gray-400 text-gray-800 transition-colors">
                    <FaTiktok className="w-10 h-10" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="">
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
                        className="h-12 rounded-none border-1 border-gray-400 focus:border-primary"
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
                        className="h-12 rounded-none border-1 border-gray-400 focus:border-primary"
                        placeholder="tu-email@ejemplo.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Asunto *</label>
                    <Select onValueChange={(value) => handleInputChange("subject", value)}>
                      <SelectTrigger className="h-12 rounded-none border-1 border-gray-400 focus:border-primary">
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
                      className="min-h-32 rounded-none border-1 border-gray-400 focus:border-primary resize-none"
                      placeholder="Cuéntanos cómo podemos ayudarte..."
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-black hover:opacity-90 text-white h-12 rounded-none text-lg font-medium shadow-lg "
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

      
    </div>
  )
}
