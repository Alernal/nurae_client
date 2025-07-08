import {
  LuHeart,
  LuUsers,
  LuAward,
  LuSparkles,
  LuCrown,
  LuStar,
  LuGlobe,
} from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const teamMembers = [
  {
    name: "Jencky Tapia",
    role: "Fundadora & CEO",
    image: "/images/inicio.png",
    description:
      "Visionaria apasionada por democratizar el lujo y empoderar a las mujeres a través del estilo.",
  },
  {
    name: "Andres Felipe Arrieta",
    role: "Financiero & CFO",
    image: "",
    description:
      "Especialista en finanzas con amplia experiencia en gestión estratégica y optimización de recursos.",
  },
  {
    name: "Juan Pablo Rios",
    role: "Developer & Engineer",
    image: "",
    description:
      "Desarrollador web enfocado en crear experiencias digitales innovadoras y funcionales.",
  },
];

const values = [
  {
    icon: LuHeart,
    title: "Pasión",
    description:
      "Amamos lo que hacemos y se refleja en cada detalle de nuestros diseños.",
  },
  {
    icon: LuUsers,
    title: "Comunidad",
    description:
      "Creamos una comunidad de mujeres que se apoyan y celebran su individualidad.",
  },
  {
    icon: LuAward,
    title: "Calidad",
    description:
      "Utilizamos solo materiales premium para garantizar durabilidad y belleza.",
  },
  {
    icon: LuGlobe,
    title: "Accesibilidad",
    description:
      "Hacemos el lujo accesible para todas las mujeres, sin comprometer la calidad.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <section className="relative md:py-14 py-10 overflow-hidden">
        <div className="container px-4 md:px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-medium text-[#9A6D4E] shadow-sm border border-[#E8D9CF]">
                <span className="font-medium">Nuestra Historia</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold text-[#5E4536] leading-tight">
                Sobre NURAE
              </h1>

              <p className="text-xl md:text-2xl text-[#9A6D4E] font-light leading-relaxed">
                Somos más que una marca de accesorios. Somos un movimiento que
                celebra la individualidad de cada mujer y democratiza el acceso
                al lujo auténtico.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-[#9A6D4E] hover:bg-[#7D5840] text-white px-8 py-3 rounded-full text-lg font-medium shadow-md hover:shadow-lg transition-all duration-300">
                  Conoce Nuestros Valores
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-[#9A6D4E] text-[#9A6D4E] hover:bg-[#9A6D4E] hover:text-white px-8 py-3 rounded-full text-lg font-medium"
                >
                  Ver Nuestro Equipo
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="relative mx-auto w-full max-w-[500px]">
                <img
                  src="/images/inicio.png"
                  width={400}
                  height={500}
                  alt="Fundadora de NURAE"
                  className="mx-auto aspect-[5/6] overflow-hidden rounded-3xl object-cover shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-8 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#5E4536]">
              Nuestra Misión
            </h2>
            <p className="text-xl text-[#9A6D4E] max-w-4xl mx-auto leading-relaxed">
              Creemos que cada mujer merece sentirse extraordinaria. Por eso
              creamos accesorios únicos que combinan diseño excepcional, calidad
              premium y precios accesibles, para que puedas brillar con tu
              propia luz sin límites.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div
                  key={value.title}
                  className="group text-center space-y-4 p-6 bg-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="mx-auto w-16 h-16 bg-[#d4af37] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-bold text-xl text-[#5E4536]">
                    {value.title}
                  </h3>
                  <p className="text-[#9A6D4E] leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold text-[#5E4536]">
                Nuestra Historia
              </h2>
              <div className="space-y-6 text-lg text-[#9A6D4E] leading-relaxed">
                <p>
                  NURAE nació en 2020 del sueño de Isabella Martínez de crear
                  una marca que celebrara la belleza única de cada mujer.
                  Después de años trabajando en la industria de la moda de lujo,
                  Isabella se dio cuenta de que los accesorios excepcionales
                  estaban reservados solo para unos pocos.
                </p>
                <p>
                  "¿Por qué el lujo auténtico no puede ser accesible para todas
                  las mujeres?" se preguntó. Esta pregunta se convirtió en la
                  misión de NURAE: democratizar el acceso a accesorios de
                  calidad premium sin comprometer el diseño ni la exclusividad.
                </p>
                <p>
                  Hoy, más de 50,000 mujeres forman parte de nuestra comunidad,
                  y cada día trabajamos para crear piezas que no solo
                  complementen su estilo, sino que las empoderen a brillar con
                  confianza.
                </p>
              </div>
            </div>

            <div className="relative">
              <img
                src="/images/inicio.png"
                width={600}
                height={500}
                alt="Historia de NURAE"
                className="rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-8 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#5E4536]">
              Nuestro Equipo
            </h2>
            <p className="text-xl text-[#9A6D4E] max-w-3xl mx-auto">
              Conoce a las mujeres extraordinarias que hacen posible la magia de
              NURAE cada día.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={member.name}
                className="group text-center space-y-6 bg-white p-8 shadow-md hover:shadow-lg transition-all duration-500 transform hover:-translate-y-1"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative mx-auto w-48 h-48">
                  <img
                    src={
                      member.image ||
                      "https://definicion.de/wp-content/uploads/2019/07/perfil-de-usuario.png"
                    }
                    alt={member.name}
                    className="rounded-full object-cover border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="space-y-4">
                  <h3 className="font-bold mt-20 text-2xl text-[#5E4536]">
                    {member.name}
                  </h3>
                  <p className="text-[#E8B059] font-medium">{member.role}</p>
                  <p className="text-[#9A6D4E] leading-relaxed">
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#E8B059]/10 to-[#C8A080]/10">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-[#5E4536]">
              Únete a Nuestra Comunidad
            </h2>
            <p className="text-xl text-[#9A6D4E] leading-relaxed">
              Forma parte de una comunidad de mujeres que celebran su
              individualidad y se apoyan mutuamente. Juntas, brillamos más
              fuerte.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/collections"
                className="bg-[#9A6D4E] hover:bg-[#7D5840] text-white px-8 py-3 rounded-full text-lg font-medium shadow-md hover:shadow-lg transition-all duration-300"
              >
                Explorar Colección
              </Link>
              <Link
                to="https://instagram.com/nurae"
                target="_blank"
                className="border-2 border-[#9A6D4E] text-[#9A6D4E] hover:bg-[#9A6D4E] hover:text-white px-8 py-3 rounded-full text-lg font-medium"
              >
                Síguenos en Instagram
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
