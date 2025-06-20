import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { LuUsers, LuHeart, LuStar, LuMapPin, LuClock, LuBriefcase, LuGraduationCap, LuSparkles, LuCrown, } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
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
        description: "Buscamos una diseñadora apasionada para liderar el desarrollo de nuevas colecciones y mantener la excelencia en diseño que caracteriza a NURAE.",
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
        description: "Únete a nuestro equipo de marketing para crear campañas que inspiren y conecten con nuestra comunidad de mujeres empoderadas.",
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
        description: "Sé la voz de NURAE y ayuda a nuestras clientas a tener la mejor experiencia posible con nuestra marca.",
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
        description: "Celebramos la diversidad y creamos un espacio donde todas las voces son valoradas.",
    },
    {
        icon: LuStar,
        title: "Crecimiento Profesional",
        description: "Ofrecemos oportunidades de desarrollo y capacitación continua para tu crecimiento.",
    },
    {
        icon: LuUsers,
        title: "Equipo Colaborativo",
        description: "Trabajamos juntas como una familia, apoyándonos mutuamente para alcanzar nuestros objetivos.",
    },
    {
        icon: LuSparkles,
        title: "Impacto Significativo",
        description: "Tu trabajo contribuye directamente a empoderar mujeres y democratizar el lujo.",
    },
];
export default function CareersPage() {
    return (_jsxs("div", { className: "min-h-screen", style: { backgroundColor: "#FDF8F4" }, children: [_jsxs("section", { className: "relative py-20 md:py-28 overflow-hidden", children: [_jsx("div", { className: "absolute inset-0", style: {
                            background: "linear-gradient(135deg, #E8B059 0%, #C8A080 100%)",
                            opacity: 0.1,
                        } }), _jsx("div", { className: "absolute top-10 left-10 animate-float", style: { color: "#E8B059" }, children: _jsx(LuBriefcase, { className: "h-12 w-12" }) }), _jsx("div", { className: "absolute bottom-20 right-20 animate-float", style: { animationDelay: "1s", color: "#C8A080" }, children: _jsx(LuCrown, { className: "h-16 w-16" }) }), _jsx("div", { className: "container px-4 md:px-6 relative", children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center", children: [_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: "inline-flex items-center gap-3 rounded-full px-6 py-3 text-sm font-medium shadow-lg border", style: {
                                                backgroundColor: "rgba(255, 255, 255, 0.9)",
                                                color: "#9A6D4E",
                                                borderColor: "#E8B059",
                                            }, children: [_jsx(LuBriefcase, { className: "h-5 w-5" }), _jsx("span", { className: "font-display", children: "\u00DAnete a Nuestro Equipo" }), _jsx(LuSparkles, { className: "h-5 w-5 animate-pulse" })] }), _jsx("h1", { className: "text-5xl md:text-7xl font-serif font-bold leading-tight", style: { color: "#5E4536" }, children: "Carreras en NURAE" }), _jsx("p", { className: "text-xl md:text-2xl font-light leading-relaxed", style: { color: "#8B7355" }, children: "\u00DAnete a una empresa que est\u00E1 revolucionando la industria de la joyer\u00EDa y empoderando a mujeres en toda Latinoam\u00E9rica." }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [_jsx(Button, { className: "text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300", style: {
                                                        background: "linear-gradient(135deg, #9A6D4E 0%, #7D5840 100%)",
                                                    }, children: "Ver Vacantes Abiertas" }), _jsx(Button, { variant: "outline", className: "px-8 py-3 rounded-full text-lg font-medium border-2", style: { borderColor: "#9A6D4E", color: "#9A6D4E" }, children: "Conoce Nuestra Cultura" })] })] }), _jsx("div", { className: "relative", children: _jsxs("div", { className: "relative mx-auto w-full max-w-[500px]", children: [_jsx("div", { className: "absolute inset-0 rounded-3xl blur-3xl opacity-30 animate-pulse", style: {
                                                    background: "linear-gradient(135deg, #E8B059 0%, #C8A080 100%)",
                                                } }), _jsx("img", { src: "/placeholder.svg?height=600&width=500&query=NURAE team working together in modern office", width: 500, height: 600, alt: "Equipo NURAE trabajando", className: "relative mx-auto aspect-[5/6] overflow-hidden rounded-3xl object-cover shadow-2xl border-4", style: { borderColor: "rgba(255, 255, 255, 0.5)" } }), _jsx("div", { className: "absolute -top-4 -right-4 text-white p-4 rounded-full shadow-lg animate-bounce", style: { backgroundColor: "#E8B059" }, children: _jsx(LuUsers, { className: "h-8 w-8" }) })] }) })] }) })] }), _jsx("section", { className: "py-16 md:py-24", style: { backgroundColor: "#F5EEE8" }, children: _jsxs("div", { className: "container px-4 md:px-6", children: [_jsxs("div", { className: "text-center space-y-8 mb-16", children: [_jsx("h2", { className: "text-4xl md:text-5xl font-serif font-bold", style: { color: "#5E4536" }, children: "\u00BFPor qu\u00E9 trabajar en NURAE?" }), _jsx("p", { className: "text-xl max-w-3xl mx-auto", style: { color: "#8B7355" }, children: "Somos m\u00E1s que una empresa, somos una comunidad que cree en el poder de las mujeres para cambiar el mundo." })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8", children: benefits.map((benefit, index) => {
                                const IconComponent = benefit.icon;
                                return (_jsxs(Card, { className: "text-center border-0 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2", style: { backgroundColor: "rgba(255, 255, 255, 0.8)" }, children: [_jsxs(CardHeader, { children: [_jsx("div", { className: "mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4", style: {
                                                        background: "linear-gradient(135deg, #9A6D4E 0%, #7D5840 100%)",
                                                    }, children: _jsx(IconComponent, { className: "h-8 w-8 text-white" }) }), _jsx(CardTitle, { className: "font-serif text-xl", style: { color: "#5E4536" }, children: benefit.title })] }), _jsx(CardContent, { children: _jsx(CardDescription, { className: "leading-relaxed", style: { color: "#8B7355" }, children: benefit.description }) })] }, benefit.title));
                            }) })] }) }), _jsx("section", { className: "py-16 md:py-24", children: _jsxs("div", { className: "container px-4 md:px-6", children: [_jsxs("div", { className: "text-center space-y-8 mb-16", children: [_jsx("h2", { className: "text-4xl md:text-5xl font-serif font-bold", style: { color: "#5E4536" }, children: "Vacantes Abiertas" }), _jsx("p", { className: "text-xl max-w-3xl mx-auto", style: { color: "#8B7355" }, children: "Encuentra la oportunidad perfecta para hacer crecer tu carrera mientras contribuyes a nuestra misi\u00F3n." })] }), _jsx("div", { className: "space-y-8", children: openPositions.map((position, index) => (_jsxs(Card, { className: "border-0 shadow-md hover:shadow-lg transition-all duration-300", style: { backgroundColor: "rgba(255, 255, 255, 0.8)" }, children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4", children: [_jsxs("div", { children: [_jsx(CardTitle, { className: "font-serif text-2xl mb-2", style: { color: "#5E4536" }, children: position.title }), _jsxs("div", { className: "flex flex-wrap items-center gap-4 text-sm", style: { color: "#8B7355" }, children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(LuBriefcase, { className: "h-4 w-4" }), position.department] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(LuMapPin, { className: "h-4 w-4" }), position.location] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(LuClock, { className: "h-4 w-4" }), position.type] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(LuGraduationCap, { className: "h-4 w-4" }), position.experience] })] })] }), _jsx(Button, { className: "text-white px-6 py-2 rounded-full", style: {
                                                        background: "linear-gradient(135deg, #9A6D4E 0%, #7D5840 100%)",
                                                    }, children: "Aplicar Ahora" })] }) }), _jsxs(CardContent, { className: "space-y-6", children: [_jsx("p", { className: "leading-relaxed", style: { color: "#5E4536" }, children: position.description }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-medium mb-3", style: { color: "#5E4536" }, children: "Requisitos:" }), _jsx("ul", { className: "space-y-2", children: position.requirements.map((req, idx) => (_jsxs("li", { className: "flex items-start gap-2 text-sm", style: { color: "#8B7355" }, children: [_jsx("span", { className: "w-2 h-2 rounded-full mt-2 flex-shrink-0", style: { backgroundColor: "#9A6D4E" } }), req] }, idx))) })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-medium mb-3", style: { color: "#5E4536" }, children: "Beneficios:" }), _jsx("ul", { className: "space-y-2", children: position.benefits.map((benefit, idx) => (_jsxs("li", { className: "flex items-start gap-2 text-sm", style: { color: "#8B7355" }, children: [_jsx("span", { className: "w-2 h-2 rounded-full mt-2 flex-shrink-0", style: { backgroundColor: "#E8B059" } }), benefit] }, idx))) })] })] })] })] }, position.id))) })] }) }), _jsx("section", { className: "py-16 md:py-24", style: { backgroundColor: "#F5EEE8" }, children: _jsx("div", { className: "container px-4 md:px-6", children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-16 items-center", children: [_jsxs("div", { className: "space-y-8", children: [_jsx("h2", { className: "text-4xl md:text-5xl font-serif font-bold", style: { color: "#5E4536" }, children: "Nuestra Cultura" }), _jsxs("div", { className: "space-y-6 text-lg leading-relaxed", style: { color: "#8B7355" }, children: [_jsx("p", { children: "En NURAE, creemos que las mejores ideas surgen cuando las personas se sienten valoradas, escuchadas y empoderadas para ser aut\u00E9nticas." }), _jsx("p", { children: "Fomentamos un ambiente de colaboraci\u00F3n donde la creatividad florece, la innovaci\u00F3n es celebrada y cada miembro del equipo tiene la oportunidad de crecer profesional y personalmente." }), _jsx("p", { children: "Trabajamos con pasi\u00F3n porque sabemos que cada pieza que creamos tiene el poder de hacer que una mujer se sienta extraordinaria." })] }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [_jsx(Link, { to: "/about", children: _jsx(Button, { className: "text-white px-8 py-3 rounded-full text-lg font-medium", style: {
                                                        background: "linear-gradient(135deg, #9A6D4E 0%, #7D5840 100%)",
                                                    }, children: "Conoce M\u00E1s Sobre Nosotros" }) }), _jsx(Link, { to: "/contact", children: _jsx(Button, { variant: "outline", className: "px-8 py-3 rounded-full text-lg font-medium border-2", style: { borderColor: "#9A6D4E", color: "#9A6D4E" }, children: "Cont\u00E1ctanos" }) })] })] }), _jsxs("div", { className: "relative", children: [_jsx("img", { src: "/placeholder.svg?height=500&width=600&query=NURAE company culture team collaboration", width: 600, height: 500, alt: "Cultura NURAE", className: "rounded-3xl shadow-2xl" }), _jsx("div", { className: "absolute -bottom-6 -left-6 p-6 rounded-2xl shadow-xl", style: { backgroundColor: "rgba(255, 255, 255, 0.9)" }, children: _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "w-12 h-12 rounded-full flex items-center justify-center", style: {
                                                        background: "linear-gradient(135deg, #9A6D4E 0%, #7D5840 100%)",
                                                    }, children: _jsx(LuHeart, { className: "h-6 w-6 text-white" }) }), _jsxs("div", { children: [_jsx("div", { className: "font-serif font-bold text-2xl", style: { color: "#5E4536" }, children: "95%" }), _jsx("div", { className: "text-sm", style: { color: "#8B7355" }, children: "Satisfacci\u00F3n del equipo" })] })] }) })] })] }) }) }), _jsx("section", { className: "py-16 md:py-24", children: _jsx("div", { className: "container px-4 md:px-6", children: _jsxs("div", { className: "text-center space-y-8 max-w-4xl mx-auto", children: [_jsx("h2", { className: "text-4xl md:text-5xl font-serif font-bold", style: { color: "#5E4536" }, children: "\u00BFLista para brillar con nosotras?" }), _jsx("p", { className: "text-xl leading-relaxed", style: { color: "#8B7355" }, children: "Si no encuentras una vacante que se ajuste a tu perfil, env\u00EDanos tu CV. Siempre estamos buscando talento excepcional." }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [_jsx(Button, { className: "text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300", style: {
                                            background: "linear-gradient(135deg, #9A6D4E 0%, #7D5840 100%)",
                                        }, children: "Enviar CV Espont\u00E1neo" }), _jsx(Link, { to: "/contact", children: _jsx(Button, { variant: "outline", className: "px-8 py-3 rounded-full text-lg font-medium border-2", style: { borderColor: "#9A6D4E", color: "#9A6D4E" }, children: "M\u00E1s Informaci\u00F3n" }) })] })] }) }) })] }));
}
