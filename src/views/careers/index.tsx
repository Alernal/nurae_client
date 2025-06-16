import { Link } from "react-router-dom";
import {
  LuUsers,
  LuHeart,
  LuStar,
  LuMapPin,
  LuClock,
  LuBriefcase,
  LuGraduationCap,
  LuSparkles,
  LuCrown,
} from "react-icons/lu";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const openPositions = [
  {
    id: 1,
    title: "Diseñadora de Joyas Senior",
    department: "Diseño",
    location: "Bogotá, Colombia",
    type: "Tiempo Completo",
    experience: "3-5 años",
    description:
      "Buscamos una diseñadora apasionada para liderar el desarrollo de nuevas colecciones y mantener la excelencia en diseño que caracteriza a NURAE.",
    requirements: [
      "Título en Diseño de Joyas, Diseño Industrial o afín",
      "Mínimo 3 años de experiencia en diseño de joyería",
      "Dominio de software de diseño (Rhino, CAD)",
      "Conocimiento de materiales y procesos de manufactura",
      "Portfolio sólido con proyectos relevantes",
    ],
    benefits: [
      "Salario competitivo",
      "Seguro médico completo",
      "Días de creatividad libre",
      "Descuentos en productos NURAE",
    ],
  },
  {
    id: 2,
    title: "Especialista en Marketing Digital",
    department: "Marketing",
    location: "Bogotá, Colombia / Remoto",
    type: "Tiempo Completo",
    experience: "2-4 años",
    description:
      "Únete a nuestro equipo de marketing para crear campañas que inspiren y conecten con nuestra comunidad de mujeres empoderadas.",
    requirements: [
      "Título en Marketing, Comunicación o afín",
      "Experiencia en marketing digital y redes sociales",
      "Conocimiento de Google Ads, Facebook Ads",
      "Habilidades en análisis de datos",
      "Creatividad y pensamiento estratégico",
    ],
    benefits: [
      "Modalidad híbrida",
      "Capacitaciones constantes",
      "Ambiente creativo",
      "Oportunidades de crecimiento",
    ],
  },
  {
    id: 3,
    title: "Coordinadora de Atención al Cliente",
    department: "Servicio al Cliente",
    location: "Bogotá, Colombia",
    type: "Tiempo Completo",
    experience: "1-3 años",
    description:
      "Sé la voz de NURAE y ayuda a nuestras clientas a tener la mejor experiencia posible con nuestra marca.",
    requirements: [
      "Bachillerato completo",
      "Experiencia en atención al cliente",
      "Excelentes habilidades de comunicación",
      "Empatía y orientación al servicio",
      "Conocimiento básico de e-commerce",
    ],
    benefits: [
      "Horarios flexibles",
      "Bonos por desempeño",
      "Ambiente de trabajo positivo",
      "Crecimiento profesional",
    ],
  },
];

const benefits = [
  {
    icon: LuHeart,
    title: "Ambiente Inclusivo",
    description:
      "Celebramos la diversidad y creamos un espacio donde todas las voces son valoradas.",
  },
  {
    icon: LuStar,
    title: "Crecimiento Profesional",
    description:
      "Ofrecemos oportunidades de desarrollo y capacitación continua para tu crecimiento.",
  },
  {
    icon: LuUsers,
    title: "Equipo Colaborativo",
    description:
      "Trabajamos juntas como una familia, apoyándonos mutuamente para alcanzar nuestros objetivos.",
  },
  {
    icon: LuSparkles,
    title: "Impacto Significativo",
    description:
      "Tu trabajo contribuye directamente a empoderar mujeres y democratizar el lujo.",
  },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FDF8F4" }}>
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, #E8B059 0%, #C8A080 100%)",
            opacity: 0.1,
          }}
        ></div>
        <div
          className="absolute top-10 left-10 animate-float"
          style={{ color: "#E8B059" }}
        >
          <LuBriefcase className="h-12 w-12" />
        </div>
        <div
          className="absolute bottom-20 right-20 animate-float"
          style={{ animationDelay: "1s", color: "#C8A080" }}
        >
          <LuCrown className="h-16 w-16" />
        </div>

        <div className="container px-4 md:px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div
                className="inline-flex items-center gap-3 rounded-full px-6 py-3 text-sm font-medium shadow-lg border"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  color: "#9A6D4E",
                  borderColor: "#E8B059",
                }}
              >
                <LuBriefcase className="h-5 w-5" />
                <span className="font-display">Únete a Nuestro Equipo</span>
                <LuSparkles className="h-5 w-5 animate-pulse" />
              </div>

              <h1
                className="text-5xl md:text-7xl font-serif font-bold leading-tight"
                style={{ color: "#5E4536" }}
              >
                Carreras en NURAE
              </h1>

              <p
                className="text-xl md:text-2xl font-light leading-relaxed"
                style={{ color: "#8B7355" }}
              >
                Únete a una empresa que está revolucionando la industria de la
                joyería y empoderando a mujeres en toda Latinoamérica.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  className="text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                  style={{
                    background:
                      "linear-gradient(135deg, #9A6D4E 0%, #7D5840 100%)",
                  }}
                >
                  Ver Vacantes Abiertas
                </Button>
                <Button
                  variant="outline"
                  className="px-8 py-3 rounded-full text-lg font-medium border-2"
                  style={{ borderColor: "#9A6D4E", color: "#9A6D4E" }}
                >
                  Conoce Nuestra Cultura
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="relative mx-auto w-full max-w-[500px]">
                <div
                  className="absolute inset-0 rounded-3xl blur-3xl opacity-30 animate-pulse"
                  style={{
                    background:
                      "linear-gradient(135deg, #E8B059 0%, #C8A080 100%)",
                  }}
                ></div>
                <img
                  src="/placeholder.svg?height=600&width=500&query=NURAE team working together in modern office"
                  width={500}
                  height={600}
                  alt="Equipo NURAE trabajando"
                  className="relative mx-auto aspect-[5/6] overflow-hidden rounded-3xl object-cover shadow-2xl border-4"
                  style={{ borderColor: "rgba(255, 255, 255, 0.5)" }}
                />
                <div
                  className="absolute -top-4 -right-4 text-white p-4 rounded-full shadow-lg animate-bounce"
                  style={{ backgroundColor: "#E8B059" }}
                >
                  <LuUsers className="h-8 w-8" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section
        className="py-16 md:py-24"
        style={{ backgroundColor: "#F5EEE8" }}
      >
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-8 mb-16">
            <h2
              className="text-4xl md:text-5xl font-serif font-bold"
              style={{ color: "#5E4536" }}
            >
              ¿Por qué trabajar en NURAE?
            </h2>
            <p
              className="text-xl max-w-3xl mx-auto"
              style={{ color: "#8B7355" }}
            >
              Somos más que una empresa, somos una comunidad que cree en el
              poder de las mujeres para cambiar el mundo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <Card
                  key={benefit.title}
                  className="text-center border-0 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
                >
                  <CardHeader>
                    <div
                      className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4"
                      style={{
                        background:
                          "linear-gradient(135deg, #9A6D4E 0%, #7D5840 100%)",
                      }}
                    >
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle
                      className="font-serif text-xl"
                      style={{ color: "#5E4536" }}
                    >
                      {benefit.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription
                      className="leading-relaxed"
                      style={{ color: "#8B7355" }}
                    >
                      {benefit.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-8 mb-16">
            <h2
              className="text-4xl md:text-5xl font-serif font-bold"
              style={{ color: "#5E4536" }}
            >
              Vacantes Abiertas
            </h2>
            <p
              className="text-xl max-w-3xl mx-auto"
              style={{ color: "#8B7355" }}
            >
              Encuentra la oportunidad perfecta para hacer crecer tu carrera
              mientras contribuyes a nuestra misión.
            </p>
          </div>

          <div className="space-y-8">
            {openPositions.map((position, index) => (
              <Card
                key={position.id}
                className="border-0 shadow-md hover:shadow-lg transition-all duration-300"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
              >
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <CardTitle
                        className="font-serif text-2xl mb-2"
                        style={{ color: "#5E4536" }}
                      >
                        {position.title}
                      </CardTitle>
                      <div
                        className="flex flex-wrap items-center gap-4 text-sm"
                        style={{ color: "#8B7355" }}
                      >
                        <div className="flex items-center gap-1">
                          <LuBriefcase className="h-4 w-4" />
                          {position.department}
                        </div>
                        <div className="flex items-center gap-1">
                          <LuMapPin className="h-4 w-4" />
                          {position.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <LuClock className="h-4 w-4" />
                          {position.type}
                        </div>
                        <div className="flex items-center gap-1">
                          <LuGraduationCap className="h-4 w-4" />
                          {position.experience}
                        </div>
                      </div>
                    </div>
                    <Button
                      className="text-white px-6 py-2 rounded-full"
                      style={{
                        background:
                          "linear-gradient(135deg, #9A6D4E 0%, #7D5840 100%)",
                      }}
                    >
                      Aplicar Ahora
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="leading-relaxed" style={{ color: "#5E4536" }}>
                    {position.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4
                        className="font-medium mb-3"
                        style={{ color: "#5E4536" }}
                      >
                        Requisitos:
                      </h4>
                      <ul className="space-y-2">
                        {position.requirements.map((req, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-sm"
                            style={{ color: "#8B7355" }}
                          >
                            <span
                              className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                              style={{ backgroundColor: "#9A6D4E" }}
                            ></span>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4
                        className="font-medium mb-3"
                        style={{ color: "#5E4536" }}
                      >
                        Beneficios:
                      </h4>
                      <ul className="space-y-2">
                        {position.benefits.map((benefit, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-sm"
                            style={{ color: "#8B7355" }}
                          >
                            <span
                              className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                              style={{ backgroundColor: "#E8B059" }}
                            ></span>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section
        className="py-16 md:py-24"
        style={{ backgroundColor: "#F5EEE8" }}
      >
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2
                className="text-4xl md:text-5xl font-serif font-bold"
                style={{ color: "#5E4536" }}
              >
                Nuestra Cultura
              </h2>
              <div
                className="space-y-6 text-lg leading-relaxed"
                style={{ color: "#8B7355" }}
              >
                <p>
                  En NURAE, creemos que las mejores ideas surgen cuando las
                  personas se sienten valoradas, escuchadas y empoderadas para
                  ser auténticas.
                </p>
                <p>
                  Fomentamos un ambiente de colaboración donde la creatividad
                  florece, la innovación es celebrada y cada miembro del equipo
                  tiene la oportunidad de crecer profesional y personalmente.
                </p>
                <p>
                  Trabajamos con pasión porque sabemos que cada pieza que
                  creamos tiene el poder de hacer que una mujer se sienta
                  extraordinaria.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/about">
                  <Button
                    className="text-white px-8 py-3 rounded-full text-lg font-medium"
                    style={{
                      background:
                        "linear-gradient(135deg, #9A6D4E 0%, #7D5840 100%)",
                    }}
                  >
                    Conoce Más Sobre Nosotros
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button
                    variant="outline"
                    className="px-8 py-3 rounded-full text-lg font-medium border-2"
                    style={{ borderColor: "#9A6D4E", color: "#9A6D4E" }}
                  >
                    Contáctanos
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <img
                src="/placeholder.svg?height=500&width=600&query=NURAE company culture team collaboration"
                width={600}
                height={500}
                alt="Cultura NURAE"
                className="rounded-3xl shadow-2xl"
              />
              <div
                className="absolute -bottom-6 -left-6 p-6 rounded-2xl shadow-xl"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{
                      background:
                        "linear-gradient(135deg, #9A6D4E 0%, #7D5840 100%)",
                    }}
                  >
                    <LuHeart className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div
                      className="font-serif font-bold text-2xl"
                      style={{ color: "#5E4536" }}
                    >
                      95%
                    </div>
                    <div className="text-sm" style={{ color: "#8B7355" }}>
                      Satisfacción del equipo
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <h2
              className="text-4xl md:text-5xl font-serif font-bold"
              style={{ color: "#5E4536" }}
            >
              ¿Lista para brillar con nosotras?
            </h2>
            <p className="text-xl leading-relaxed" style={{ color: "#8B7355" }}>
              Si no encuentras una vacante que se ajuste a tu perfil, envíanos
              tu CV. Siempre estamos buscando talento excepcional.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                style={{
                  background:
                    "linear-gradient(135deg, #9A6D4E 0%, #7D5840 100%)",
                }}
              >
                Enviar CV Espontáneo
              </Button>
              <Link to="/contact">
                <Button
                  variant="outline"
                  className="px-8 py-3 rounded-full text-lg font-medium border-2"
                  style={{ borderColor: "#9A6D4E", color: "#9A6D4E" }}
                >
                  Más Información
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
