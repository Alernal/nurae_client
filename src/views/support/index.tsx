import type React from "react"
import { useState } from "react"
import { LuMessageCircle, LuPhone, LuMail, LuCalendar } from "react-icons/lu"
import { Button } from "@/components/ui/button"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const supportChannels = [
  {
    title: "Chat en Vivo",
    description: "Respuesta inmediata de nuestros expertos",
    icon: LuMessageCircle,
    color: "text-[var(--color-amarillo)]",
    bgColor: "bg-gray-100",
    availability: "24/7",
    responseTime: "Inmediato",
    action: "Iniciar Chat",
  },
  {
    title: "Llamada Telefónica",
    description: "Habla directamente con nuestro equipo",
    icon: LuPhone,
    color: "text-[var(--color-amarillo)]",
    bgColor: "bg-gray-100",
    availability: "Lun-Dom 9AM-9PM",
    responseTime: "Inmediato",
    action: "Llamar Ahora",
  },
  {
    title: "Email Soporte",
    description: "Envía tu consulta detallada por correo",
    icon: LuMail,
    color: "text-[var(--color-amarillo)]",
    bgColor: "bg-gray-100",
    availability: "24/7",
    responseTime: "2-4 horas",
    action: "Enviar Email",
  },
  {
    title: "Cita Presencial",
    description: "Visita nuestro showroom para asesoría personalizada",
    icon: LuCalendar,
    color: "text-[var(--color-amarillo)]",
    bgColor: "bg-gray-100",
    availability: "Lun-Sáb 10AM-7PM",
    responseTime: "Mismo día",
    action: "Agendar Cita",
  },
]

export default function SupportPage() {

  return (
    <div className="min-h-screen">

      {/* Hero Section */}
      <section className="relative py-20 md:py-40 overflow-hidden bg-[var(--color-marron)]">
        <div className="container px-4 md:px-6 relative">
          <div className="text-center space-y-8">

            <h1 className="text-5xl md:text-7xl text-white font-bold  leading-tight">
              ¿Cómo podemos ayudarte?
            </h1>

            <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto font-light leading-relaxed">
              Nuestro equipo de expertos está aquí para resolver todas tus dudas y brindarte la mejor experiencia.
            </p>
          </div>
        </div>
      </section>

      {/* Support Channels */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-8 mb-16">
            <h2 className="text-4xl md:text-5xl text-[var(--color-marron)] font-bold ">
              Canales de Soporte
            </h2>
            <p className="text-xl text-black max-w-3xl mx-auto">Elige el canal que mejor se adapte a tu consulta</p>
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
                    <CardTitle className=" text-xl">{channel.title}</CardTitle>
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
    </div>
  )
}
