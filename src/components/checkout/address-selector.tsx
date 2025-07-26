import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { LuPlus, LuMapPin, LuPencil, LuTrash2 } from "react-icons/lu"

export interface Address {
  id: number
  name: string
  first_name: string
  last_name: string
  email: string
  phone: string
  company?: string
  document_type?: string
  document_number?: string
  fiscal_name?: string
  street_address: string
  apartment?: string
  city: string
  state: string
  postal_code: string
  country: string
  is_default: boolean
  notes?: string
}

interface AddressSelectorProps {
  addresses: Address[]
  selectedAddressId: number | null
  onSelectAddress: (address: Address) => void
  onAddNewClick: () => void
  onEditAddress?: (address: Address) => void
  onDeleteAddress?: (addressId: number) => void
  type: "billing" | "shipping"
}

export default function AddressSelector({
  addresses = [],
  selectedAddressId,
  onSelectAddress,
  onAddNewClick,
  onEditAddress,
  onDeleteAddress,
  type,
}: AddressSelectorProps) {
  const [hoveredAddressId, setHoveredAddressId] = useState<number | null>(null)

  return (
    <div className="space-y-4">
      {(addresses && addresses.length > 0) ? (
        <RadioGroup
          value={selectedAddressId?.toString() || ""}
          onValueChange={(value) => {
            const address = addresses.find((a) => a.id === Number.parseInt(value))
            if (address) onSelectAddress(address)
          }}
          className="space-y-3"
        >
          {addresses.map((address) => (
            <div
              key={address.id}
              className="relative"
              onMouseEnter={() => setHoveredAddressId(address.id)}
              onMouseLeave={() => setHoveredAddressId(null)}
            >
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <RadioGroupItem
                      value={address.id.toString()}
                      id={`address-${address.id}`}
                      className="mt-1 border-black"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <Label
                          htmlFor={`address-${address.id}`}
                          className="font-medium text-gray-900 cursor-pointer flex items-center gap-2"
                        >
                          {address.first_name} {address.last_name}
                          {address.is_default && (
                            <span className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-none">
                              Predeterminada
                            </span>
                          )}
                        </Label>
                      </div>
                      <div className="mt-1 text-sm text-gray-600 space-y-1">
                        <p>
                          {address.street_address}
                          {address.apartment ? `, ${address.apartment}` : ""}
                        </p>
                        <p>
                          {address.city}, {address.state}, {address.postal_code}
                        </p>
                        <p>{address.country}</p>
                        <p className="text-gray-500">
                          {address.phone} • {address.email}
                        </p>
                        {type === "billing" && address.document_type && (
                          <p className="text-gray-500">
                            {address.document_type}: {address.document_number}
                          </p>
                        )}
                        {address.notes && <p className="italic text-gray-500">"{address.notes}"</p>}
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <LuMapPin className="w-5 h-5" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Botones de editar/eliminar que aparecen al hacer hover */}
              {hoveredAddressId === address.id && (onEditAddress || onDeleteAddress) && (
                <div className="absolute top-2 right-2 flex space-x-1">
                  {onEditAddress && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full bg-white border border-gray-200 hover:bg-amber-50 hover:text-amber-600"
                      onClick={(e) => {
                        e.stopPropagation()
                        onEditAddress(address)
                      }}
                    >
                      <LuPencil className="h-4 w-4" />
                      <span className="sr-only">Editar</span>
                    </Button>
                  )}
                  {onDeleteAddress && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full bg-white border border-gray-200 hover:bg-red-50 hover:text-red-600"
                      onClick={(e) => {
                        e.stopPropagation()
                        onDeleteAddress(address.id)
                      }}
                    >
                      <LuTrash2 className="h-4 w-4" />
                      <span className="sr-only">Eliminar</span>
                    </Button>
                  )}
                </div>
              )}
            </div>
          ))}
        </RadioGroup>
      ) : (
        <div className="text-center p-6 border border-dashed border-gray-300 bg-gray-50">
          <LuMapPin className="w-10 h-10 text-gray-400 mx-auto mb-2" />
          <h3 className="text-gray-600 font-medium">No hay direcciones guardadas</h3>
          <p className="text-gray-500 text-sm mt-1">Agrega una nueva dirección para continuar</p>
        </div>
      )}
    </div>
  )
}
