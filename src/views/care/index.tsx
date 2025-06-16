import {Link} from "react-router-dom"
import { LuSparkles, LuDroplets, LuSun, LuShield, LuClock, LuHeart, LuStar, LuAward } from "react-icons/lu"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const careSteps = [
  {
    title: "Limpieza Diaria",
    description: "Limpia suavemente después de cada uso",
    icon: LuSparkles,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    steps: [
      "Usa un paño suave y seco para limpiar la superficie",
      "Retira cualquier residuo de maquillaje o perfume",
      "Guarda en un lugar seco inmediatamente",
    ],
  },
  {
    title: "Limpieza Profunda",
    description: "Una vez por semana para mantener el brillo",
    icon: LuDroplets,
    color: "text-green-500",
    bgColor: "bg-green-50",
    steps: [
      "Mezcla agua tibia con jabón neutro",
      "Usa un cepillo de dientes suave para áreas difíciles",
      "Enjuaga con agua limpia y seca completamente",
    ],
  },
  {
    title: "Almacenamiento",
    description: "Protege tus joyas cuando no las uses",
    icon: LuShield,
    color: "text-purple-500",
    bgColor: "bg-purple-50",
    steps: [
      "Guarda cada pieza por separado",
      "Usa la caja original o bolsas de tela",
      "Evita lugares húmedos o con cambios de temperatura",
    ],
  },
  {
    title: "Protección",
    description: "Evita daños y desgaste prematuro",
    icon: LuSun,
    color: "text-orange-500",
    bgColor: "bg-orange-50",
    steps: [
      "Quítate las joyas antes de nadar o hacer ejercicio",
      "Aplica perfumes y cosméticos antes de ponerte las joyas",
      "Evita el contacto con productos químicos",
    ],
  },
]

const materialCare = {
  "oro-rosa": {
    name: "Oro Rosa",
    description: "Aleación de oro con cobre que le da su color característico",
    care: [
      "Limpia con paño de microfibra regularmente",
      "Evita productos químicos agresivos",
      "Puede requerir pulido profesional ocasional",
      "Guarda en ambiente seco",
    ],
    avoid: ["Cloro", "Productos de limpieza", "Sudor excesivo", "Perfumes directos"],
  },
  "acero-inoxidable": {
    name: "Acero Inoxidable",
    description: "Material duradero y resistente a la corrosión",
    care: [
      "Limpia con agua y jabón suave",
      "Seca completamente después de la limpieza",
      "Usa paño de pulir para mantener el brillo",
      "Resistente al agua pero seca después del contacto",
    ],
    avoid: ["Productos abrasivos", "Lejía", "Sal marina prolongada", "Rayones con objetos duros"],
  },
  plata: {
    name: "Plata 925",
    description: "Plata esterlina de alta calidad con 92.5% de pureza",
    care: [
      "Limpia con productos específicos para plata",
      "Usa paño de pulir plata regularmente",
      "Guarda en bolsas anti-empañamiento",
      "Usa frecuentemente para evitar oxidación",
    ],
    avoid: ["Humedad excesiva", "Azufre", "Productos de limpieza domésticos", "Almacenamiento en plástico"],
  },
}

const troubleshooting = [
  {
    problem: "Mi joya se ve opaca",
    solution: "Limpia con paño de microfibra y producto específico para el material",
    prevention: "Limpieza regular después de cada uso",
  },
  {
    problem: "Aparecieron manchas verdes",
    solution: "Normal en aleaciones de cobre. Limpia con agua y jabón neutro",
    prevention: "Mantén seco y evita humedad prolongada",
  },
  {
    problem: "Se enredó mi cadena",
    solution: "Usa aceite mineral y una aguja fina para desenredar suavemente",
    prevention: "Guarda colgada o en compartimentos separados",
  },
  {
    problem: "Perdió el brillo original",
    solution: "Lleva a pulido profesional o usa productos de pulido específicos",
    prevention: "Limpieza regular y almacenamiento adecuado",
  },
]

export default function CarePage() {
  return (
    <div className="min-h-screen">

      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-luxury-gradient opacity-10"></div>
        <div className="absolute top-10 left-10 text-red-300 animate-float">
          <LuSparkles className="h-12 w-12" />
        </div>
        <div className="absolute bottom-20 right-20 text-purple-300 animate-float" style={{ animationDelay: "1s" }}>
          <LuHeart className="h-16 w-16" />
        </div>

        <div className="container px-4 md:px-6 relative">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-3 rounded-full bg-white/80 backdrop-blur-sm px-6 py-3 text-sm font-medium text-primary shadow-lg border border-pink-200">
              <LuSparkles className="h-5 w-5" />
              <span className="font-display">Cuidado de Joyas</span>
              <LuHeart className="h-5 w-5 animate-pulse" />
            </div>

            <h1 className="text-5xl md:text-7xl font-serif font-bold bg-luxury-gradient bg-clip-text text-transparent leading-tight">
              Cuida tus Joyas
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
              Mantén tus piezas LÚMINA brillando como el primer día con nuestros consejos de cuidado profesional.
            </p>
          </div>
        </div>
      </section>

      {/* Care Steps */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-8 mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold bg-luxury-gradient bg-clip-text text-transparent">
              Rutina de Cuidado
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Sigue estos pasos para mantener tus joyas en perfecto estado
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {careSteps.map((step, index) => {
              const IconComponent = step.icon
              return (
                <Card
                  key={step.title}
                  className="bg-white/80 backdrop-blur-sm border-pink-100 hover:shadow-xl transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 ${step.bgColor} rounded-full flex items-center justify-center`}>
                        <IconComponent className={`h-8 w-8 ${step.color}`} />
                      </div>
                      <div>
                        <CardTitle className="font-serif text-xl">{step.title}</CardTitle>
                        <CardDescription>{step.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {step.steps.map((stepItem, stepIndex) => (
                      <div key={stepIndex} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">
                          {stepIndex + 1}
                        </div>
                        <p className="text-gray-700 leading-relaxed">{stepItem}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Material-Specific Care */}
      <section className="py-16 md:py-24 bg-white/50">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-8 mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold bg-luxury-gradient bg-clip-text text-transparent">
              Cuidado por Material
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Cada material requiere cuidados específicos para mantener su belleza
            </p>
          </div>

          <Tabs defaultValue="oro-rosa" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm rounded-2xl p-2 border border-pink-100 max-w-2xl mx-auto">
              <TabsTrigger
                value="oro-rosa"
                className="rounded-xl data-[state=active]:bg-luxury-gradient data-[state=active]:text-white"
              >
                Oro Rosa
              </TabsTrigger>
              <TabsTrigger
                value="acero-inoxidable"
                className="rounded-xl data-[state=active]:bg-luxury-gradient data-[state=active]:text-white"
              >
                Acero Inoxidable
              </TabsTrigger>
              <TabsTrigger
                value="plata"
                className="rounded-xl data-[state=active]:bg-luxury-gradient data-[state=active]:text-white"
              >
                Plata 925
              </TabsTrigger>
            </TabsList>

            {Object.entries(materialCare).map(([key, material]) => (
              <TabsContent key={key} value={key} className="mt-12">
                <Card className="bg-white/80 backdrop-blur-sm border-pink-100 max-w-4xl mx-auto">
                  <CardHeader>
                    <CardTitle className="font-serif text-2xl text-center">{material.name}</CardTitle>
                    <CardDescription className="text-center text-lg">{material.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-serif text-xl font-bold text-green-600 mb-4 flex items-center gap-2">
                        <LuShield className="h-5 w-5" />
                        Cuidados Recomendados
                      </h4>
                      <ul className="space-y-3">
                        {material.care.map((item, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-serif text-xl font-bold text-red-600 mb-4 flex items-center gap-2">
                        <LuClock className="h-5 w-5" />
                        Evita Estos Elementos
                      </h4>
                      <ul className="space-y-3">
                        {material.avoid.map((item, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Troubleshooting */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-8 mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold bg-luxury-gradient bg-clip-text text-transparent">
              Solución de Problemas
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Respuestas a los problemas más comunes con las joyas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {troubleshooting.map((item, index) => (
              <Card
                key={index}
                className="bg-white/80 backdrop-blur-sm border-pink-100 hover:shadow-lg transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <CardTitle className="font-serif text-lg text-red-600 flex items-center gap-2">
                    <LuStar className="h-5 w-5" />
                    {item.problem}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h5 className="font-medium text-green-600 mb-2">Solución:</h5>
                    <p className="text-gray-700">{item.solution}</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-600 mb-2">Prevención:</h5>
                    <p className="text-gray-700">{item.prevention}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Care */}
      <section className="py-16 md:py-24 bg-white/50">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-8 mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold bg-luxury-gradient bg-clip-text text-transparent">
              Servicio Profesional
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Para cuidados especializados, confía en nuestros expertos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white/80 backdrop-blur-sm border-pink-100 text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <LuSparkles className="h-8 w-8 text-yellow-600" />
                </div>
                <h3 className="font-serif text-xl font-bold text-gray-800 mb-4">Pulido Profesional</h3>
                <p className="text-gray-600 mb-4">
                  Restauramos el brillo original de tus joyas con técnicas profesionales.
                </p>
                <Badge className="bg-yellow-100 text-yellow-800">Desde $25.000</Badge>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-pink-100 text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <LuShield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-serif text-xl font-bold text-gray-800 mb-4">Limpieza Ultrasónica</h3>
                <p className="text-gray-600 mb-4">Limpieza profunda que elimina residuos difíciles de alcanzar.</p>
                <Badge className="bg-blue-100 text-blue-800">Desde $15.000</Badge>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-pink-100 text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <LuAward className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-serif text-xl font-bold text-gray-800 mb-4">Revisión Completa</h3>
                <p className="text-gray-600 mb-4">Inspección detallada y mantenimiento preventivo de tus joyas.</p>
                <Badge className="bg-green-100 text-green-800">Gratis</Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Care Kit */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-8 mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold bg-luxury-gradient bg-clip-text text-transparent">
              Kit de Cuidado LÚMINA
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Todo lo que necesitas para mantener tus joyas perfectas
            </p>
          </div>

          <Card className="bg-white/80 backdrop-blur-sm border-pink-100 max-w-4xl mx-auto">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <h3 className="font-serif text-2xl font-bold text-gray-800">Kit Completo de Cuidado</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Paño de microfibra premium</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Solución de limpieza especializada</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Cepillo de cerdas suaves</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Bolsas de almacenamiento anti-empañamiento</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Guía de cuidado detallada</span>
                    </li>
                  </ul>
                  <div className="flex items-center gap-4">
                    <span className="text-3xl font-serif font-bold text-primary">$45.000</span>
                    <Badge className="bg-green-100 text-green-600">Envío Gratis</Badge>
                  </div>
                  <Button
                    onClick={() => (window.location.href = "/products/care-kit")}
                    className="bg-luxury-gradient hover:opacity-90 text-white px-8 py-3 rounded-full"
                  >
                    Comprar Kit de Cuidado
                  </Button>
                </div>
                <div className="relative aspect-square bg-gradient-to-br from-pink-100 to-purple-100 rounded-xl flex items-center justify-center">
                  <img
                    src="/placeholder.svg?height=400&width=400"
                    alt="Kit de cuidado LÚMINA"
                    width={400}
                    height={400}
                    className="object-contain"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-white/50">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-serif font-bold bg-luxury-gradient bg-clip-text text-transparent">
              ¿Necesitas ayuda con el cuidado?
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Nuestros expertos en joyería están disponibles para asesorarte sobre el cuidado específico de tus piezas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/expert-consultation">
                <Button className="bg-luxury-gradient hover:opacity-90 text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300">
                  Consultar Experto
                </Button>
              </Link>
              <Link to="/support-contact">
                <Button
                  variant="outline"
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-full text-lg font-medium"
                >
                  Agendar Servicio
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
