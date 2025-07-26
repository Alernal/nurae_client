import type React from "react"
import { useState } from "react"
import { LuMessageCircle, LuPhone, LuMail, LuCalendar } from "react-icons/lu"
import { Button } from "@/components/ui/button"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const supportChannels = [
  {
    title: "Chat en Vivo",
    description: "Recibe respuestas en minutos a tus preguntas",
    icon: LuMessageCircle,
    color: "text-black",
    bgColor: "bg-gray-100",
    availability: "24/7",
    responseTime: "Inmediato",
    action: "Iniciar Chat",
  },
  {
    title: "Llamada Telefónica",
    description: "Recibe atención personalizada en minutos",
    icon: LuPhone,
    color: "text-black",
    bgColor: "bg-gray-100",
    availability: "Lun-Sab 9AM-6PM",
    responseTime: "En pocos minutos",
    action: "Llamar Ahora",
  },
  {
    title: "Email Soporte",
    description: "Recibe una respuesta detallada en unas horas",
    icon: LuMail,
    color: "text-black",
    bgColor: "bg-gray-100",
    availability: "24/7",
    responseTime: "2-4 horas",
    action: "Enviar Email",
  },
]

export default function SupportPage() {

  return (
    <div className="min-h-screen">
      {/* Support Channels */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-8 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold ">
              Canales de Soporte
            </h2>
            <p className="text-xl text-black max-w-3xl mx-auto">Elige el canal que mejor se adapte a tu consulta</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
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
