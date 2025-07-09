import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Product {
  name: string
  material?: string
  description?: string
}

interface ProductDetailsProps {
  product: Product
}

export function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Detalles del Producto</h2>

      <Tabs defaultValue="description" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="description">Descripción</TabsTrigger>
          <TabsTrigger value="care">Cuidados</TabsTrigger>
          <TabsTrigger value="warranty">Garantía</TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="mt-6">
          <pre className="whitespace-pre-wrap font-sans text-gray-700 leading-relaxed">
            {product.description}
          </pre>
        </TabsContent>

        <TabsContent value="care" className="mt-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Instrucciones de Cuidado</h4>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• Limpie suavemente con un paño suave y seco</li>
              <li>• Evite el contacto con químicos, perfumes y lociones</li>
              <li>• Guarde en un lugar seco, preferiblemente en su caja original</li>
              <li>• Para limpieza profunda, visite nuestro taller especializado</li>
              <li>• Inspección anual recomendada para mantener la garantía</li>
            </ul>
          </div>
        </TabsContent>

        <TabsContent value="warranty" className="mt-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Garantía de 30 dias</h4>
            <div className="text-sm text-gray-700 space-y-2">
              <p>
                Nuestra garantía cubre defectos de fabricación y materiales. Incluye servicios de
                mantenimiento y reparación sin costo adicional.
              </p>
              <p className="font-medium">La garantía incluye:</p>
              <ul className="space-y-1 ml-4">
                <li>• Reparación de engastes sueltos</li>
                <li>• Pulido y restauración del brillo</li>
                <li>• Reemplazo de piezas defectuosas</li>
                <li>• Ajuste de talla (una vez sin costo)</li>
              </ul>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
