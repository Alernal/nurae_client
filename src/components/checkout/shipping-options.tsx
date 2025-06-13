import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { LuTruck, LuClock } from "react-icons/lu"

interface ShippingOptionsProps {
  shippingType: string
  onShippingTypeChange: (type: string) => void
  observations: string
  onObservationsChange: (observations: string) => void
}

export default function ShippingOptions({
  shippingType,
  onShippingTypeChange,
  observations,
  onObservationsChange,
}: ShippingOptionsProps) {
  const shippingOptions = [
    {
      id: "standard",
      name: "Envío Estándar",
      description: "3-5 días hábiles",
      price: "Gratis en compras > $150.000",
      icon: LuTruck,
    },
  ]

  return (
    <Card className="border-amber-200 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-amber-50 to-amber-100 border-b border-amber-200">
        <CardTitle className="flex items-center space-x-2 text-amber-900">
          <LuTruck className="w-5 h-5" />
          <span>Metodos de Envío</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="space-y-4">
          <RadioGroup value={shippingType} onValueChange={onShippingTypeChange} className="space-y-3">
            {shippingOptions.map((option) => {
              const IconComponent = option.icon
              return (
                <div
                  key={option.id}
                  className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-amber-300 transition-colors"
                >
                  <RadioGroupItem value={option.id} id={option.id} className="border-amber-300 text-amber-600" />
                  <IconComponent className="w-5 h-5 text-amber-600" />
                  <div className="flex-1">
                    <Label htmlFor={option.id} className="font-medium text-gray-900 cursor-pointer">
                      {option.name}
                    </Label>
                    <p className="text-sm text-gray-600">{option.description}</p>
                    <p className="text-sm font-medium text-amber-700">{option.price}</p>
                  </div>
                </div>
              )
            })}
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="observations" className="text-gray-700 font-medium">
            Observaciones (Opcional)
          </Label>
          <Textarea
            id="observations"
            value={observations}
            onChange={(e) => onObservationsChange(e.target.value)}
            placeholder="Instrucciones especiales para la entrega..."
            className="border-gray-300 focus:border-amber-500 focus:ring-amber-500 min-h-[80px]"
          />
        </div>
      </CardContent>
    </Card>
  )
}
