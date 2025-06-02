import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"

const formatPrice = (price: number) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)

export default function FilterSidebar({
  categories,
  materials,
  selectedCategories,
  setSelectedCategories,
  selectedMaterials,
  setSelectedMaterials,
  priceRange,
  setPriceRange,
}: any) {
  return (
    <div className="space-y-6">
      <h3 className="font-serif font-bold text-xl text-primary">Filtros</h3>

      <div className="space-y-4">
        <h4 className="font-medium text-gray-800">Categorías</h4>
        <Separator />
        <div className="space-y-3">
          {categories.map((category: string) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedCategories([...selectedCategories, category])
                  } else {
                    setSelectedCategories(selectedCategories.filter((c: string) => c !== category))
                  }
                }}
              />
              <Label htmlFor={category} className="text-sm cursor-pointer">
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium text-gray-800">Rango de Precio</h4>
        <Separator />
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          max={300000}
          step={10000}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-gray-600">
          <span>{formatPrice(priceRange[0])}</span>
          <span>{formatPrice(priceRange[1])}</span>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium text-gray-800">Material</h4>
        <Separator />
        <div className="space-y-3">
          {materials.map((material: string) => (
            <div key={material} className="flex items-center space-x-2">
              <Checkbox
                id={material}
                checked={selectedMaterials.includes(material)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedMaterials([...selectedMaterials, material])
                  } else {
                    setSelectedMaterials(selectedMaterials.filter((m: string) => m !== material))
                  }
                }}
              />
              <Label htmlFor={material} className="text-sm cursor-pointer">
                {material}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Button
        variant="outline"
        className="w-full"
        onClick={() => {
          setSelectedCategories([])
          setSelectedMaterials([])
          setPriceRange([0, 300000])
        }}
      >
        Limpiar Filtros
      </Button>
    </div>
  )
}
