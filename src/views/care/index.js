import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { LuSparkles, LuDroplets, LuSun, LuShield, LuClock, LuHeart, LuStar, LuAward } from "react-icons/lu";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
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
];
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
};
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
];
export default function CarePage() {
    return (_jsxs("div", { className: "min-h-screen", children: [_jsxs("section", { className: "relative py-20 md:py-28 overflow-hidden", children: [_jsx("div", { className: "absolute inset-0 bg-luxury-gradient opacity-10" }), _jsx("div", { className: "absolute top-10 left-10 text-red-300 animate-float", children: _jsx(LuSparkles, { className: "h-12 w-12" }) }), _jsx("div", { className: "absolute bottom-20 right-20 text-purple-300 animate-float", style: { animationDelay: "1s" }, children: _jsx(LuHeart, { className: "h-16 w-16" }) }), _jsx("div", { className: "container px-4 md:px-6 relative", children: _jsxs("div", { className: "text-center space-y-8", children: [_jsxs("div", { className: "inline-flex items-center gap-3 rounded-full bg-white/80 backdrop-blur-sm px-6 py-3 text-sm font-medium text-primary shadow-lg border border-pink-200", children: [_jsx(LuSparkles, { className: "h-5 w-5" }), _jsx("span", { className: "font-display", children: "Cuidado de Joyas" }), _jsx(LuHeart, { className: "h-5 w-5 animate-pulse" })] }), _jsx("h1", { className: "text-5xl md:text-7xl font-serif font-bold bg-luxury-gradient bg-clip-text text-transparent leading-tight", children: "Cuida tus Joyas" }), _jsx("p", { className: "text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed", children: "Mant\u00E9n tus piezas L\u00DAMINA brillando como el primer d\u00EDa con nuestros consejos de cuidado profesional." })] }) })] }), _jsx("section", { className: "py-16 md:py-24", children: _jsxs("div", { className: "container px-4 md:px-6", children: [_jsxs("div", { className: "text-center space-y-8 mb-16", children: [_jsx("h2", { className: "text-4xl md:text-5xl font-serif font-bold bg-luxury-gradient bg-clip-text text-transparent", children: "Rutina de Cuidado" }), _jsx("p", { className: "text-xl text-gray-600 max-w-3xl mx-auto", children: "Sigue estos pasos para mantener tus joyas en perfecto estado" })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: careSteps.map((step, index) => {
                                const IconComponent = step.icon;
                                return (_jsxs(Card, { className: "bg-white/80 backdrop-blur-sm border-pink-100 hover:shadow-xl transition-all duration-300", style: { animationDelay: `${index * 0.1}s` }, children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: `w-16 h-16 ${step.bgColor} rounded-full flex items-center justify-center`, children: _jsx(IconComponent, { className: `h-8 w-8 ${step.color}` }) }), _jsxs("div", { children: [_jsx(CardTitle, { className: "font-serif text-xl", children: step.title }), _jsx(CardDescription, { children: step.description })] })] }) }), _jsx(CardContent, { className: "space-y-3", children: step.steps.map((stepItem, stepIndex) => (_jsxs("div", { className: "flex items-start gap-3", children: [_jsx("div", { className: "w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5", children: stepIndex + 1 }), _jsx("p", { className: "text-gray-700 leading-relaxed", children: stepItem })] }, stepIndex))) })] }, step.title));
                            }) })] }) }), _jsx("section", { className: "py-16 md:py-24 bg-white/50", children: _jsxs("div", { className: "container px-4 md:px-6", children: [_jsxs("div", { className: "text-center space-y-8 mb-16", children: [_jsx("h2", { className: "text-4xl md:text-5xl font-serif font-bold bg-luxury-gradient bg-clip-text text-transparent", children: "Cuidado por Material" }), _jsx("p", { className: "text-xl text-gray-600 max-w-3xl mx-auto", children: "Cada material requiere cuidados espec\u00EDficos para mantener su belleza" })] }), _jsxs(Tabs, { defaultValue: "oro-rosa", className: "w-full", children: [_jsxs(TabsList, { className: "grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm rounded-2xl p-2 border border-pink-100 max-w-2xl mx-auto", children: [_jsx(TabsTrigger, { value: "oro-rosa", className: "rounded-xl data-[state=active]:bg-luxury-gradient data-[state=active]:text-white", children: "Oro Rosa" }), _jsx(TabsTrigger, { value: "acero-inoxidable", className: "rounded-xl data-[state=active]:bg-luxury-gradient data-[state=active]:text-white", children: "Acero Inoxidable" }), _jsx(TabsTrigger, { value: "plata", className: "rounded-xl data-[state=active]:bg-luxury-gradient data-[state=active]:text-white", children: "Plata 925" })] }), Object.entries(materialCare).map(([key, material]) => (_jsx(TabsContent, { value: key, className: "mt-12", children: _jsxs(Card, { className: "bg-white/80 backdrop-blur-sm border-pink-100 max-w-4xl mx-auto", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { className: "font-serif text-2xl text-center", children: material.name }), _jsx(CardDescription, { className: "text-center text-lg", children: material.description })] }), _jsxs(CardContent, { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [_jsxs("div", { children: [_jsxs("h4", { className: "font-serif text-xl font-bold text-green-600 mb-4 flex items-center gap-2", children: [_jsx(LuShield, { className: "h-5 w-5" }), "Cuidados Recomendados"] }), _jsx("ul", { className: "space-y-3", children: material.care.map((item, index) => (_jsxs("li", { className: "flex items-start gap-3", children: [_jsx("div", { className: "w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" }), _jsx("span", { className: "text-gray-700", children: item })] }, index))) })] }), _jsxs("div", { children: [_jsxs("h4", { className: "font-serif text-xl font-bold text-red-600 mb-4 flex items-center gap-2", children: [_jsx(LuClock, { className: "h-5 w-5" }), "Evita Estos Elementos"] }), _jsx("ul", { className: "space-y-3", children: material.avoid.map((item, index) => (_jsxs("li", { className: "flex items-start gap-3", children: [_jsx("div", { className: "w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" }), _jsx("span", { className: "text-gray-700", children: item })] }, index))) })] })] })] }) }, key)))] })] }) }), _jsx("section", { className: "py-16 md:py-24", children: _jsxs("div", { className: "container px-4 md:px-6", children: [_jsxs("div", { className: "text-center space-y-8 mb-16", children: [_jsx("h2", { className: "text-4xl md:text-5xl font-serif font-bold bg-luxury-gradient bg-clip-text text-transparent", children: "Soluci\u00F3n de Problemas" }), _jsx("p", { className: "text-xl text-gray-600 max-w-3xl mx-auto", children: "Respuestas a los problemas m\u00E1s comunes con las joyas" })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto", children: troubleshooting.map((item, index) => (_jsxs(Card, { className: "bg-white/80 backdrop-blur-sm border-pink-100 hover:shadow-lg transition-all duration-300", style: { animationDelay: `${index * 0.1}s` }, children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "font-serif text-lg text-red-600 flex items-center gap-2", children: [_jsx(LuStar, { className: "h-5 w-5" }), item.problem] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("h5", { className: "font-medium text-green-600 mb-2", children: "Soluci\u00F3n:" }), _jsx("p", { className: "text-gray-700", children: item.solution })] }), _jsxs("div", { children: [_jsx("h5", { className: "font-medium text-blue-600 mb-2", children: "Prevenci\u00F3n:" }), _jsx("p", { className: "text-gray-700", children: item.prevention })] })] })] }, index))) })] }) }), _jsx("section", { className: "py-16 md:py-24 bg-white/50", children: _jsxs("div", { className: "container px-4 md:px-6", children: [_jsxs("div", { className: "text-center space-y-8 mb-16", children: [_jsx("h2", { className: "text-4xl md:text-5xl font-serif font-bold bg-luxury-gradient bg-clip-text text-transparent", children: "Servicio Profesional" }), _jsx("p", { className: "text-xl text-gray-600 max-w-3xl mx-auto", children: "Para cuidados especializados, conf\u00EDa en nuestros expertos" })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: [_jsx(Card, { className: "bg-white/80 backdrop-blur-sm border-pink-100 text-center", children: _jsxs(CardContent, { className: "p-8", children: [_jsx("div", { className: "w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4", children: _jsx(LuSparkles, { className: "h-8 w-8 text-yellow-600" }) }), _jsx("h3", { className: "font-serif text-xl font-bold text-gray-800 mb-4", children: "Pulido Profesional" }), _jsx("p", { className: "text-gray-600 mb-4", children: "Restauramos el brillo original de tus joyas con t\u00E9cnicas profesionales." }), _jsx(Badge, { className: "bg-yellow-100 text-yellow-800", children: "Desde $25.000" })] }) }), _jsx(Card, { className: "bg-white/80 backdrop-blur-sm border-pink-100 text-center", children: _jsxs(CardContent, { className: "p-8", children: [_jsx("div", { className: "w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4", children: _jsx(LuShield, { className: "h-8 w-8 text-blue-600" }) }), _jsx("h3", { className: "font-serif text-xl font-bold text-gray-800 mb-4", children: "Limpieza Ultras\u00F3nica" }), _jsx("p", { className: "text-gray-600 mb-4", children: "Limpieza profunda que elimina residuos dif\u00EDciles de alcanzar." }), _jsx(Badge, { className: "bg-blue-100 text-blue-800", children: "Desde $15.000" })] }) }), _jsx(Card, { className: "bg-white/80 backdrop-blur-sm border-pink-100 text-center", children: _jsxs(CardContent, { className: "p-8", children: [_jsx("div", { className: "w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4", children: _jsx(LuAward, { className: "h-8 w-8 text-green-600" }) }), _jsx("h3", { className: "font-serif text-xl font-bold text-gray-800 mb-4", children: "Revisi\u00F3n Completa" }), _jsx("p", { className: "text-gray-600 mb-4", children: "Inspecci\u00F3n detallada y mantenimiento preventivo de tus joyas." }), _jsx(Badge, { className: "bg-green-100 text-green-800", children: "Gratis" })] }) })] })] }) }), _jsx("section", { className: "py-16 md:py-24", children: _jsxs("div", { className: "container px-4 md:px-6", children: [_jsxs("div", { className: "text-center space-y-8 mb-16", children: [_jsx("h2", { className: "text-4xl md:text-5xl font-serif font-bold bg-luxury-gradient bg-clip-text text-transparent", children: "Kit de Cuidado L\u00DAMINA" }), _jsx("p", { className: "text-xl text-gray-600 max-w-3xl mx-auto", children: "Todo lo que necesitas para mantener tus joyas perfectas" })] }), _jsx(Card, { className: "bg-white/80 backdrop-blur-sm border-pink-100 max-w-4xl mx-auto", children: _jsx(CardContent, { className: "p-8", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8 items-center", children: [_jsxs("div", { className: "space-y-6", children: [_jsx("h3", { className: "font-serif text-2xl font-bold text-gray-800", children: "Kit Completo de Cuidado" }), _jsxs("ul", { className: "space-y-3", children: [_jsxs("li", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-2 h-2 bg-primary rounded-full" }), _jsx("span", { children: "Pa\u00F1o de microfibra premium" })] }), _jsxs("li", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-2 h-2 bg-primary rounded-full" }), _jsx("span", { children: "Soluci\u00F3n de limpieza especializada" })] }), _jsxs("li", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-2 h-2 bg-primary rounded-full" }), _jsx("span", { children: "Cepillo de cerdas suaves" })] }), _jsxs("li", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-2 h-2 bg-primary rounded-full" }), _jsx("span", { children: "Bolsas de almacenamiento anti-empa\u00F1amiento" })] }), _jsxs("li", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-2 h-2 bg-primary rounded-full" }), _jsx("span", { children: "Gu\u00EDa de cuidado detallada" })] })] }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("span", { className: "text-3xl font-serif font-bold text-primary", children: "$45.000" }), _jsx(Badge, { className: "bg-green-100 text-green-600", children: "Env\u00EDo Gratis" })] }), _jsx(Button, { onClick: () => (window.location.href = "/products/care-kit"), className: "bg-luxury-gradient hover:opacity-90 text-white px-8 py-3 rounded-full", children: "Comprar Kit de Cuidado" })] }), _jsx("div", { className: "relative aspect-square bg-gradient-to-br from-pink-100 to-purple-100 rounded-xl flex items-center justify-center", children: _jsx("img", { src: "/placeholder.svg?height=400&width=400", alt: "Kit de cuidado L\u00DAMINA", width: 400, height: 400, className: "object-contain" }) })] }) }) })] }) }), _jsx("section", { className: "py-16 md:py-24 bg-white/50", children: _jsx("div", { className: "container px-4 md:px-6", children: _jsxs("div", { className: "text-center space-y-8 max-w-4xl mx-auto", children: [_jsx("h2", { className: "text-4xl md:text-5xl font-serif font-bold bg-luxury-gradient bg-clip-text text-transparent", children: "\u00BFNecesitas ayuda con el cuidado?" }), _jsx("p", { className: "text-xl text-gray-600 leading-relaxed", children: "Nuestros expertos en joyer\u00EDa est\u00E1n disponibles para asesorarte sobre el cuidado espec\u00EDfico de tus piezas." }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [_jsx(Link, { to: "/expert-consultation", children: _jsx(Button, { className: "bg-luxury-gradient hover:opacity-90 text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300", children: "Consultar Experto" }) }), _jsx(Link, { to: "/support-contact", children: _jsx(Button, { variant: "outline", className: "border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-full text-lg font-medium", children: "Agendar Servicio" }) })] })] }) }) })] }));
}
