import { LuTruck, LuShield, LuRotateCcw, LuAward } from "react-icons/lu"

export function ShippingInfo() {
  const benefits = [
    {
      icon: LuTruck,
      title: "Envío Gratuito",
      description: "En compras mayores a $150.000 COP",
    },
    {
      icon: LuShield,
      title: "Garantía de 30 dias",
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
    </div>
  )
}
