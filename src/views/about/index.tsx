import { LuHeart, LuUsers, LuAward, LuSparkles, LuCrown, LuStar, LuGlobe } from "react-icons/lu"
import { Button } from "@/components/ui/button"

const teamMembers = [
  {
    name: "Isabella Martínez",
    role: "Fundadora & CEO",
    image: "/placeholder.svg?height=300&width=300",
    description: "Visionaria apasionada por democratizar el lujo y empoderar a las mujeres a través del estilo.",
  },
  {
    name: "Sofía Hernández",
    role: "Directora de Diseño",
    image: "/placeholder.svg?height=300&width=300",
    description: "Artista con más de 10 años de experiencia creando piezas únicas que celebran la feminidad.",
  },
  {
    name: "Carmen López",
    role: "Directora de Calidad",
    image: "/placeholder.svg?height=300&width=300",
    description: "Experta en materiales premium que garantiza la excelencia en cada pieza que creamos.",
  },
]

const values = [
  {
    icon: LuHeart,
    title: "Pasión",
    description: "Amamos lo que hacemos y se refleja en cada detalle de nuestros diseños.",
  },
  {
    icon: LuUsers,
    title: "Comunidad",
    description: "Creamos una comunidad de mujeres que se apoyan y celebran su individualidad.",
  },
  {
    icon: LuAward,
    title: "Calidad",
    description: "Utilizamos solo materiales premium para garantizar durabilidad y belleza.",
  },
  {
    icon: LuGlobe,
    title: "Accesibilidad",
    description: "Hacemos el lujo accesible para todas las mujeres, sin comprometer la calidad.",
  },
]

const milestones = [
  {
    year: "2020",
    title: "Nace LÚMINA",
    description: "Isabella funda LÚMINA con la visión de democratizar el lujo en accesorios femeninos.",
  },
  {
    year: "2021",
    title: "Primera Colección",
    description: "Lanzamos nuestra primera colección con 25 piezas únicas que se agotaron en 48 horas.",
  },
  {
    year: "2022",
    title: "10,000 Clientas",
    description: "Alcanzamos las 10,000 clientas felices y expandimos nuestro catálogo a 100+ productos.",
  },
  {
    year: "2023",
    title: "Reconocimiento Nacional",
    description: "LÚMINA es reconocida como 'Mejor Marca Emergente' en los Premios de Moda Mexicana.",
  },
  {
    year: "2024",
    title: "Expansión Digital",
    description: "Lanzamos nuestra plataforma digital renovada y alcanzamos 50,000+ seguidoras.",
  },
  {
    year: "2025",
    title: "Futuro Brillante",
    description: "Continuamos innovando y expandiendo para llegar a más mujeres en toda Latinoamérica.",
  },
]

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-luxury-gradient opacity-10"></div>
        <div className="absolute top-10 left-10 text-pink-300 animate-float">
          <LuHeart className="h-12 w-12" />
        </div>
        <div className="absolute bottom-20 right-20 text-purple-300 animate-float" style={{ animationDelay: "1s" }}>
          <LuCrown className="h-16 w-16" />
        </div>

        <div className="container px-4 md:px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 rounded-full bg-white/80 backdrop-blur-sm px-6 py-3 text-sm font-medium text-primary shadow-lg border border-pink-200">
                <LuSparkles className="h-5 w-5 animate-pulse" />
                <span className="font-display">Nuestra Historia</span>
                <LuHeart className="h-5 w-5" />
              </div>

              <h1 className="text-5xl md:text-7xl font-serif font-bold bg-luxury-gradient bg-clip-text text-transparent leading-tight">
                Sobre LÚMINA
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed">
                Somos más que una marca de accesorios. Somos un movimiento que celebra la individualidad de cada mujer y
                democratiza el acceso al lujo auténtico.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-luxury-gradient hover:opacity-90 text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300">
                  Conoce Nuestros Valores
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-full text-lg font-medium"
                >
                  Ver Nuestro Equipo
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="relative mx-auto w-full max-w-[500px]">
                <div className="absolute inset-0 bg-luxury-gradient rounded-3xl blur-3xl opacity-30 animate-pulse"></div>
                <img
                  src="https://imagenes.elpais.com/resizer/v2/5SX5XJ5WIJHFND6QFBVOYXILUM.jpg?auth=0c21f51f9d558e7b8ceb3f9a9e556c66dd2e4cde34199bb13338912f138c4d71&width=980&height=980&focal=1821%2C1180"
                  width={500}
                  height={600}
                  alt="Fundadora de LÚMINA"
                  className="relative mx-auto aspect-[5/6] overflow-hidden rounded-3xl object-cover shadow-2xl border-4 border-white/50"
                />
                <div className="absolute -top-4 -right-4 bg-accent text-white p-4 rounded-full shadow-lg animate-bounce">
                  <LuCrown className="h-8 w-8" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24 bg-white/50">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-8 mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold bg-luxury-gradient bg-clip-text text-transparent">
              Nuestra Misión
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Creemos que cada mujer merece sentirse extraordinaria. Por eso creamos accesorios únicos que combinan
              diseño excepcional, calidad premium y precios accesibles, para que puedas brillar con tu propia luz sin
              límites.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <div
                  key={value.title}
                  className="group text-center space-y-4 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="h-8 w-8 text-black" />
                  </div>
                  <h3 className="font-serif font-bold text-xl text-gray-800">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-serif font-bold bg-luxury-gradient bg-clip-text text-transparent">
                Nuestra Historia
              </h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  LÚMINA nació en 2020 del sueño de Isabella Martínez de crear una marca que celebrara la belleza única
                  de cada mujer. Después de años trabajando en la industria de la moda de lujo, Isabella se dio cuenta
                  de que los accesorios excepcionales estaban reservados solo para unos pocos.
                </p>
                <p>
                  "¿Por qué el lujo auténtico no puede ser accesible para todas las mujeres?" se preguntó. Esta pregunta
                  se convirtió en la misión de LÚMINA: democratizar el acceso a accesorios de calidad premium sin
                  comprometer el diseño ni la exclusividad.
                </p>
                <p>
                  Hoy, más de 50,000 mujeres forman parte de nuestra comunidad, y cada día trabajamos para crear piezas
                  que no solo complementen su estilo, sino que las empoderen a brillar con confianza.
                </p>
              </div>
              <Button className="bg-luxury-gradient hover:opacity-90 text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300">
                Lee Nuestra Historia Completa
              </Button>
            </div>

            <div className="relative">
              <img
                src="/placeholder.svg?height=500&width=600"
                width={600}
                height={500}
                alt="Historia de LÚMINA"
                className="rounded-3xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-luxury-gradient rounded-full flex items-center justify-center">
                    <LuHeart className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-serif font-bold text-2xl text-gray-800">50K+</div>
                    <div className="text-sm text-gray-600">Mujeres empoderadas</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-24 bg-white/50">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-8 mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold bg-luxury-gradient bg-clip-text text-transparent">
              Nuestro Camino
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Desde nuestros humildes comienzos hasta convertirnos en una marca reconocida, cada paso ha sido guiado por
              nuestra pasión por empoderar a las mujeres.
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary to-secondary rounded-full"></div>

            <div className="space-y-16">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={`flex items-center gap-8 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? "text-right" : "text-left"}`}>
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="text-3xl font-serif font-bold text-primary mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-serif font-bold text-gray-800 mb-3">{milestone.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{milestone.description}</p>
                    </div>
                  </div>

                  {/* Timeline Dot */}
                  <div className="relative z-10 w-6 h-6 bg-luxury-gradient rounded-full border-4 border-white shadow-lg"></div>

                  <div className="flex-1"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-8 mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold bg-luxury-gradient bg-clip-text text-transparent">
              Nuestro Equipo
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Conoce a las mujeres extraordinarias que hacen posible la magia de LÚMINA cada día.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={member.name}
                className="group text-center space-y-6 bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative mx-auto w-48 h-48">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="rounded-full object-cover border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-luxury-gradient rounded-full flex items-center justify-center shadow-lg">
                    <LuStar className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="font-serif font-bold text-2xl text-gray-800">{member.name}</h3>
                  <p className="text-primary font-medium">{member.role}</p>
                  <p className="text-gray-600 leading-relaxed">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-serif font-bold bg-luxury-gradient bg-clip-text text-transparent">
              Únete a Nuestra Comunidad
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Forma parte de una comunidad de mujeres que celebran su individualidad y se apoyan mutuamente. Juntas,
              brillamos más fuerte.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-luxury-gradient hover:opacity-90 text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300">
                Explorar Colección
              </Button>
              <Button
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-full text-lg font-medium"
              >
                Síguenos en Instagram
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
