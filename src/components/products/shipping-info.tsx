import { LuTruck, LuShield, LuRotateCcw, LuAward } from "react-icons/lu"

export function ShippingInfo() {
  const benefits = [
    {
      icon: LuTruck,
      title: "Envío Gratuito",
      description: "En compras mayores a $1,500 MXN",
    },
    {
      icon: LuShield,
      title: "Garantía de por Vida",
      description: "Contra defectos de fabricación",
    },
    {
      icon: LuRotateCcw,
      title: "Devoluciones Fáciles",
      description: "30 días para cambios y devoluciones",
    },
    {
      icon: LuAward,
      title: "Certificado de Autenticidad",
      description: "Incluido con cada pieza",
    },
  ]

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Beneficios de Compra</h3>

      <div className="grid grid-cols-2 gap-3">
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon
          return (
            <div key={index} className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg">
              <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon className="w-3 h-3 text-primary" />
              </div>
              <div>
                <h4 className="text-xs font-medium text-gray-900">{benefit.title}</h4>
                <p className="text-xs text-muted-foreground leading-tight">{benefit.description}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Delivery Info */}
      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="text-xs font-medium text-blue-900 mb-1">Información de Entrega</h4>
        <ul className="text-xs text-blue-800 space-y-0.5">
          <li>• Entrega en 3-5 días hábiles</li>
          <li>• Empaque discreto y seguro</li>
          <li>• Seguimiento en tiempo real</li>
          <li>• Firma requerida al recibir</li>
        </ul>
      </div>
    </div>
  )
}
