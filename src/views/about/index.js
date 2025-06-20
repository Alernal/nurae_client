import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { LuHeart, LuUsers, LuAward, LuSparkles, LuCrown, LuStar, LuGlobe } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
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
];
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
];
const milestones = [
    {
        year: "2020",
        title: "Nace NURAE",
        description: "Isabella funda NURAE con la visión de democratizar el lujo en accesorios femeninos.",
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
        description: "NURAE es reconocida como 'Mejor Marca Emergente' en los Premios de Moda Mexicana.",
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
];
export default function AboutPage() {
    return (_jsxs("div", { className: "min-h-screen bg-[#FDF8F4]", children: [_jsx("section", { className: "relative py-20 md:py-28 overflow-hidden", children: _jsx("div", { className: "container px-4 md:px-6 relative", children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center", children: [_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: "inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-medium text-[#9A6D4E] shadow-sm border border-[#E8D9CF]", children: [_jsx(LuSparkles, { className: "h-5 w-5" }), _jsx("span", { className: "font-medium", children: "Nuestra Historia" }), _jsx(LuHeart, { className: "h-5 w-5" })] }), _jsx("h1", { className: "text-5xl md:text-7xl font-bold text-[#5E4536] leading-tight", children: "Sobre NURAE" }), _jsx("p", { className: "text-xl md:text-2xl text-[#9A6D4E] font-light leading-relaxed", children: "Somos m\u00E1s que una marca de accesorios. Somos un movimiento que celebra la individualidad de cada mujer y democratiza el acceso al lujo aut\u00E9ntico." }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [_jsx(Button, { className: "bg-[#9A6D4E] hover:bg-[#7D5840] text-white px-8 py-3 rounded-full text-lg font-medium shadow-md hover:shadow-lg transition-all duration-300", children: "Conoce Nuestros Valores" }), _jsx(Button, { variant: "outline", className: "border-2 border-[#9A6D4E] text-[#9A6D4E] hover:bg-[#9A6D4E] hover:text-white px-8 py-3 rounded-full text-lg font-medium", children: "Ver Nuestro Equipo" })] })] }), _jsx("div", { className: "relative", children: _jsxs("div", { className: "relative mx-auto w-full max-w-[500px]", children: [_jsx("img", { src: "/placeholder.svg?height=600&width=500", width: 500, height: 600, alt: "Fundadora de NURAE", className: "mx-auto aspect-[5/6] overflow-hidden rounded-3xl object-cover shadow-2xl" }), _jsx("div", { className: "absolute -top-4 -right-4 bg-[#E8B059] text-white p-4 rounded-full shadow-lg", children: _jsx(LuCrown, { className: "h-8 w-8" }) })] }) })] }) }) }), _jsx("section", { className: "py-16 md:py-24 bg-[#F5EEE8]", children: _jsxs("div", { className: "container px-4 md:px-6", children: [_jsxs("div", { className: "text-center space-y-8 mb-16", children: [_jsx("h2", { className: "text-4xl md:text-5xl font-bold text-[#5E4536]", children: "Nuestra Misi\u00F3n" }), _jsx("p", { className: "text-xl text-[#9A6D4E] max-w-4xl mx-auto leading-relaxed", children: "Creemos que cada mujer merece sentirse extraordinaria. Por eso creamos accesorios \u00FAnicos que combinan dise\u00F1o excepcional, calidad premium y precios accesibles, para que puedas brillar con tu propia luz sin l\u00EDmites." })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8", children: values.map((value, index) => {
                                const IconComponent = value.icon;
                                return (_jsxs("div", { className: "group text-center space-y-4 p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1", style: { animationDelay: `${index * 0.1}s` }, children: [_jsx("div", { className: "mx-auto w-16 h-16 bg-gradient-to-br from-[#E8B059] to-[#C8A080] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300", children: _jsx(IconComponent, { className: "h-8 w-8 text-white" }) }), _jsx("h3", { className: "font-bold text-xl text-[#5E4536]", children: value.title }), _jsx("p", { className: "text-[#9A6D4E] leading-relaxed", children: value.description })] }, value.title));
                            }) })] }) }), _jsx("section", { className: "py-16 md:py-24", children: _jsx("div", { className: "container px-4 md:px-6", children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-16 items-center", children: [_jsxs("div", { className: "space-y-8", children: [_jsx("h2", { className: "text-4xl md:text-5xl font-bold text-[#5E4536]", children: "Nuestra Historia" }), _jsxs("div", { className: "space-y-6 text-lg text-[#9A6D4E] leading-relaxed", children: [_jsx("p", { children: "NURAE naci\u00F3 en 2020 del sue\u00F1o de Isabella Mart\u00EDnez de crear una marca que celebrara la belleza \u00FAnica de cada mujer. Despu\u00E9s de a\u00F1os trabajando en la industria de la moda de lujo, Isabella se dio cuenta de que los accesorios excepcionales estaban reservados solo para unos pocos." }), _jsx("p", { children: "\"\u00BFPor qu\u00E9 el lujo aut\u00E9ntico no puede ser accesible para todas las mujeres?\" se pregunt\u00F3. Esta pregunta se convirti\u00F3 en la misi\u00F3n de NURAE: democratizar el acceso a accesorios de calidad premium sin comprometer el dise\u00F1o ni la exclusividad." }), _jsx("p", { children: "Hoy, m\u00E1s de 50,000 mujeres forman parte de nuestra comunidad, y cada d\u00EDa trabajamos para crear piezas que no solo complementen su estilo, sino que las empoderen a brillar con confianza." })] }), _jsx(Button, { className: "bg-[#9A6D4E] hover:bg-[#7D5840] text-white px-8 py-3 rounded-full text-lg font-medium shadow-md hover:shadow-lg transition-all duration-300", children: "Lee Nuestra Historia Completa" })] }), _jsxs("div", { className: "relative", children: [_jsx("img", { src: "/placeholder.svg?height=500&width=600", width: 600, height: 500, alt: "Historia de NURAE", className: "rounded-3xl shadow-2xl" }), _jsx("div", { className: "absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl", children: _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "w-12 h-12 bg-gradient-to-r from-[#E8B059] to-[#C8A080] rounded-full flex items-center justify-center", children: _jsx(LuHeart, { className: "h-6 w-6 text-white" }) }), _jsxs("div", { children: [_jsx("div", { className: "font-bold text-2xl text-[#5E4536]", children: "50K+" }), _jsx("div", { className: "text-sm text-[#9A6D4E]", children: "Mujeres empoderadas" })] })] }) })] })] }) }) }), _jsx("section", { className: "py-16 md:py-24 bg-[#F5EEE8]", children: _jsxs("div", { className: "container px-4 md:px-6", children: [_jsxs("div", { className: "text-center space-y-8 mb-16", children: [_jsx("h2", { className: "text-4xl md:text-5xl font-bold text-[#5E4536]", children: "Nuestro Camino" }), _jsx("p", { className: "text-xl text-[#9A6D4E] max-w-3xl mx-auto", children: "Desde nuestros humildes comienzos hasta convertirnos en una marca reconocida, cada paso ha sido guiado por nuestra pasi\u00F3n por empoderar a las mujeres." })] }), _jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#E8B059] to-[#C8A080] rounded-full" }), _jsx("div", { className: "space-y-16", children: milestones.map((milestone, index) => (_jsxs("div", { className: `flex items-center gap-8 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`, style: { animationDelay: `${index * 0.2}s` }, children: [_jsx("div", { className: `flex-1 ${index % 2 === 0 ? "text-right" : "text-left"}`, children: _jsxs("div", { className: "bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300", children: [_jsx("div", { className: "text-3xl font-bold text-[#E8B059] mb-2", children: milestone.year }), _jsx("h3", { className: "text-xl font-bold text-[#5E4536] mb-3", children: milestone.title }), _jsx("p", { className: "text-[#9A6D4E] leading-relaxed", children: milestone.description })] }) }), _jsx("div", { className: "relative z-10 w-6 h-6 bg-gradient-to-r from-[#E8B059] to-[#C8A080] rounded-full border-4 border-white shadow-lg" }), _jsx("div", { className: "flex-1" })] }, milestone.year))) })] })] }) }), _jsx("section", { className: "py-16 md:py-24", children: _jsxs("div", { className: "container px-4 md:px-6", children: [_jsxs("div", { className: "text-center space-y-8 mb-16", children: [_jsx("h2", { className: "text-4xl md:text-5xl font-bold text-[#5E4536]", children: "Nuestro Equipo" }), _jsx("p", { className: "text-xl text-[#9A6D4E] max-w-3xl mx-auto", children: "Conoce a las mujeres extraordinarias que hacen posible la magia de NURAE cada d\u00EDa." })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: teamMembers.map((member, index) => (_jsxs("div", { className: "group text-center space-y-6 bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition-all duration-500 transform hover:-translate-y-1", style: { animationDelay: `${index * 0.2}s` }, children: [_jsxs("div", { className: "relative mx-auto w-48 h-48", children: [_jsx("img", { src: member.image || "/placeholder.svg", alt: member.name, className: "rounded-full object-cover border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-300" }), _jsx("div", { className: "absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-r from-[#E8B059] to-[#C8A080] rounded-full flex items-center justify-center shadow-lg", children: _jsx(LuStar, { className: "h-6 w-6 text-white" }) })] }), _jsxs("div", { className: "space-y-3", children: [_jsx("h3", { className: "font-bold text-2xl text-[#5E4536]", children: member.name }), _jsx("p", { className: "text-[#E8B059] font-medium", children: member.role }), _jsx("p", { className: "text-[#9A6D4E] leading-relaxed", children: member.description })] })] }, member.name))) })] }) }), _jsx("section", { className: "py-16 md:py-24 bg-gradient-to-br from-[#E8B059]/10 to-[#C8A080]/10", children: _jsx("div", { className: "container px-4 md:px-6", children: _jsxs("div", { className: "text-center space-y-8 max-w-4xl mx-auto", children: [_jsx("h2", { className: "text-4xl md:text-5xl font-bold text-[#5E4536]", children: "\u00DAnete a Nuestra Comunidad" }), _jsx("p", { className: "text-xl text-[#9A6D4E] leading-relaxed", children: "Forma parte de una comunidad de mujeres que celebran su individualidad y se apoyan mutuamente. Juntas, brillamos m\u00E1s fuerte." }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [_jsx(Button, { className: "bg-[#9A6D4E] hover:bg-[#7D5840] text-white px-8 py-3 rounded-full text-lg font-medium shadow-md hover:shadow-lg transition-all duration-300", children: "Explorar Colecci\u00F3n" }), _jsx(Button, { variant: "outline", className: "border-2 border-[#9A6D4E] text-[#9A6D4E] hover:bg-[#9A6D4E] hover:text-white px-8 py-3 rounded-full text-lg font-medium", children: "S\u00EDguenos en Instagram" })] })] }) }) })] }));
}
