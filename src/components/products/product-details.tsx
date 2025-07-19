interface Product {
  name: string;
  material?: string;
  description?: string;
}

interface ProductDetailsProps {
  product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <div className="space-y-8">


      {/* Descripción */}
      {product.description && (
        <section className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900">Descripción</h3>
          <p className="font-parrafo text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
            {product.description}
          </p>
        </section>
      )}

      {/* Cuidados */}
      <section className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-900">Instrucciones de Cuidado</h3>
        <ul className="font-parrafo text-sm text-gray-700 space-y-1 list-disc list-inside">
          <li>Limpie suavemente con un paño seco</li>
          <li>Evite el contacto con químicos, perfumes y lociones</li>
          <li>Guarde en un lugar seco, preferiblemente en su caja original</li>
          <li>Para limpieza profunda, visite nuestro taller especializado</li>
        </ul>
      </section>

      {/* Garantía */}
      <section className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-900">Garantía de 30 días</h3>
        <p className="font-parrafo text-sm text-gray-700">
          Nuestra garantía cubre defectos de fabricación y materiales.
        </p>
      </section>
    </div>
  );
}
