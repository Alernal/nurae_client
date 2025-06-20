import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { LuTruck, LuClock, LuMapPin, LuPackage, LuShield, LuCircle, LuSparkles, } from "react-icons/lu";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
const shippingOptions = [
    {
        name: "Envío Estándar",
        time: "3-5 días hábiles",
        cost: "$15.000 COP",
        description: "Perfecto para pedidos regulares",
        icon: LuTruck,
        features: [
            "Seguimiento incluido",
            "Seguro básico",
            "Entrega en horario laboral",
        ],
    },
    {
        name: "Envío Express",
        time: "1-2 días hábiles",
        cost: "$25.000 COP",
        description: "Para cuando lo necesitas rápido",
        icon: LuClock,
        features: [
            "Seguimiento en tiempo real",
            "Seguro completo",
            "Entrega prioritaria",
        ],
    },
    {
        name: "Envío Gratis",
        time: "3-5 días hábiles",
        cost: "GRATIS",
        description: "En compras superiores a $150.000",
        icon: LuPackage,
        features: [
            "Sin costo adicional",
            "Seguimiento incluido",
            "Mismo servicio estándar",
        ],
    },
];
const deliveryZones = [
    {
        zone: "Bogotá y Área Metropolitana",
        time: "1-2 días hábiles",
        coverage: "Bogotá, Soacha, Chía, Cajicá, Zipaquirá",
    },
    {
        zone: "Ciudades Principales",
        time: "2-3 días hábiles",
        coverage: "Medellín, Cali, Barranquilla, Cartagena, Bucaramanga",
    },
    {
        zone: "Resto del País",
        time: "3-5 días hábiles",
        coverage: "Todas las demás ciudades y municipios",
    },
];
export default function ShippingPage() {
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-orange-50", children: [_jsxs("section", { className: "relative py-20 md:py-28 overflow-hidden", children: [_jsx("div", { className: "absolute inset-0 bg-luxury-gradient opacity-10" }), _jsx("div", { className: "absolute top-10 left-10 text-pink-300 animate-float", children: _jsx(LuTruck, { className: "h-12 w-12" }) }), _jsx("div", { className: "absolute bottom-20 right-20 text-purple-300 animate-float", style: { animationDelay: "1s" }, children: _jsx(LuPackage, { className: "h-16 w-16" }) }), _jsx("div", { className: "container px-4 md:px-6 relative", children: _jsxs("div", { className: "text-center space-y-8", children: [_jsxs("div", { className: "inline-flex items-center gap-3 rounded-full bg-white/80 backdrop-blur-sm px-6 py-3 text-sm font-medium text-primary shadow-lg border border-pink-200", children: [_jsx(LuTruck, { className: "h-5 w-5" }), _jsx("span", { className: "font-display", children: "Informaci\u00F3n de Env\u00EDos" }), _jsx(LuSparkles, { className: "h-5 w-5 animate-pulse" })] }), _jsx("h1", { className: "text-5xl md:text-7xl font-serif font-bold bg-luxury-gradient bg-clip-text text-transparent leading-tight", children: "Env\u00EDos y Entregas" }), _jsx("p", { className: "text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed", children: "Llevamos tus joyas favoritas hasta la puerta de tu casa de forma segura y r\u00E1pida en toda Colombia." })] }) })] }), _jsx("section", { className: "py-16 md:py-24", children: _jsxs("div", { className: "container px-4 md:px-6", children: [_jsxs("div", { className: "text-center space-y-8 mb-16", children: [_jsx("h2", { className: "text-4xl md:text-5xl font-serif font-bold bg-luxury-gradient bg-clip-text text-transparent", children: "Opciones de Env\u00EDo" }), _jsx("p", { className: "text-xl text-gray-600 max-w-3xl mx-auto", children: "Elige la opci\u00F3n que mejor se adapte a tus necesidades" })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: shippingOptions.map((option, index) => {
                                const IconComponent = option.icon;
                                return (_jsxs(Card, { className: "bg-white/80 backdrop-blur-sm border-pink-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center", style: { animationDelay: `${index * 0.1}s` }, children: [_jsxs(CardHeader, { children: [_jsx("div", { className: "mx-auto w-16 h-16 bg-luxury-gradient rounded-full flex items-center justify-center mb-4", children: _jsx(IconComponent, { className: "h-8 w-8 text-white" }) }), _jsx(CardTitle, { className: "font-serif text-2xl text-gray-800", children: option.name }), _jsx("div", { className: "text-3xl font-bold text-primary", children: option.cost }), _jsx(CardDescription, { className: "text-lg", children: option.time })] }), _jsxs(CardContent, { className: "space-y-4", children: [_jsx("p", { className: "text-gray-600", children: option.description }), _jsx("ul", { className: "space-y-2", children: option.features.map((feature, idx) => (_jsxs("li", { className: "flex items-center gap-2 text-sm text-gray-600", children: [_jsx(LuCircle, { className: "h-4 w-4 text-green-500" }), feature] }, idx))) })] })] }, option.name));
                            }) })] }) }), _jsx("section", { className: "py-16 md:py-24 bg-white/50", children: _jsxs("div", { className: "container px-4 md:px-6", children: [_jsxs("div", { className: "text-center space-y-8 mb-16", children: [_jsx("h2", { className: "text-4xl md:text-5xl font-serif font-bold bg-luxury-gradient bg-clip-text text-transparent", children: "Zonas de Entrega" }), _jsx("p", { className: "text-xl text-gray-600 max-w-3xl mx-auto", children: "Tiempos de entrega seg\u00FAn tu ubicaci\u00F3n en Colombia" })] }), _jsx("div", { className: "space-y-6", children: deliveryZones.map((zone, index) => (_jsx(Card, { className: "bg-white/80 backdrop-blur-sm border-pink-100 hover:shadow-lg transition-all duration-300", style: { animationDelay: `${index * 0.1}s` }, children: _jsx(CardContent, { className: "p-8", children: _jsxs("div", { className: "flex flex-col md:flex-row items-start md:items-center gap-6", children: [_jsx("div", { className: "w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center flex-shrink-0", children: _jsx(LuMapPin, { className: "h-8 w-8 text-white" }) }), _jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "font-serif text-2xl font-bold text-gray-800 mb-2", children: zone.zone }), _jsx("p", { className: "text-gray-600 mb-2", children: zone.coverage }), _jsxs("div", { className: "inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium", children: [_jsx(LuClock, { className: "h-4 w-4" }), zone.time] })] })] }) }) }, zone.zone))) })] }) }), _jsx("section", { className: "py-16 md:py-24", children: _jsxs("div", { className: "container px-4 md:px-6", children: [_jsxs("div", { className: "text-center space-y-8 mb-16", children: [_jsx("h2", { className: "text-4xl md:text-5xl font-serif font-bold bg-luxury-gradient bg-clip-text text-transparent", children: "Proceso de Env\u00EDo" }), _jsx("p", { className: "text-xl text-gray-600 max-w-3xl mx-auto", children: "As\u00ED es como procesamos y enviamos tu pedido" })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-8", children: [
                                {
                                    step: "1",
                                    title: "Confirmación",
                                    description: "Verificamos tu pedido y procesamos el pago",
                                    time: "Inmediato",
                                },
                                {
                                    step: "2",
                                    title: "Preparación",
                                    description: "Empacamos cuidadosamente tu pedido",
                                    time: "2-4 horas",
                                },
                                {
                                    step: "3",
                                    title: "Envío",
                                    description: "Tu pedido sale de nuestro centro de distribución",
                                    time: "24 horas",
                                },
                                {
                                    step: "4",
                                    title: "Entrega",
                                    description: "Recibes tu pedido en la dirección indicada",
                                    time: "1-5 días",
                                },
                            ].map((step, index) => (_jsxs("div", { className: "text-center space-y-4", style: { animationDelay: `${index * 0.2}s` }, children: [_jsx("div", { className: "mx-auto w-16 h-16 bg-luxury-gradient rounded-full flex items-center justify-center text-white text-2xl font-bold", children: step.step }), _jsx("h3", { className: "font-serif text-xl font-bold text-gray-800", children: step.title }), _jsx("p", { className: "text-gray-600", children: step.description }), _jsx("div", { className: "text-sm text-primary font-medium", children: step.time })] }, step.step))) })] }) }), _jsx("section", { className: "py-16 md:py-24 bg-white/50", children: _jsxs("div", { className: "container px-4 md:px-6", children: [_jsx("div", { className: "text-center space-y-8 mb-16", children: _jsx("h2", { className: "text-4xl md:text-5xl font-serif font-bold bg-luxury-gradient bg-clip-text text-transparent", children: "Informaci\u00F3n Importante" }) }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [_jsxs(Card, { className: "bg-white/80 backdrop-blur-sm border-pink-100", children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(LuShield, { className: "h-8 w-8 text-green-500" }), _jsx(CardTitle, { className: "font-serif text-xl", children: "Seguridad y Protecci\u00F3n" })] }) }), _jsxs(CardContent, { className: "space-y-3", children: [_jsx("p", { className: "text-gray-600", children: "\u2022 Todos los env\u00EDos incluyen seguro contra p\u00E9rdida o da\u00F1o" }), _jsx("p", { className: "text-gray-600", children: "\u2022 Empaque discreto para proteger tu privacidad" }), _jsx("p", { className: "text-gray-600", children: "\u2022 Seguimiento en tiempo real de tu pedido" }), _jsx("p", { className: "text-gray-600", children: "\u2022 Firma requerida para la entrega" })] })] }), _jsxs(Card, { className: "bg-white/80 backdrop-blur-sm border-pink-100", children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(LuPackage, { className: "h-8 w-8 text-blue-500" }), _jsx(CardTitle, { className: "font-serif text-xl", children: "Empaque Especial" })] }) }), _jsxs(CardContent, { className: "space-y-3", children: [_jsx("p", { className: "text-gray-600", children: "\u2022 Caja de regalo L\u00DAMINA incluida" }), _jsx("p", { className: "text-gray-600", children: "\u2022 Materiales de empaque sostenibles" }), _jsx("p", { className: "text-gray-600", children: "\u2022 Protecci\u00F3n extra para productos fr\u00E1giles" }), _jsx("p", { className: "text-gray-600", children: "\u2022 Tarjeta de cuidado y garant\u00EDa incluida" })] })] })] })] }) }), _jsx("section", { className: "py-16 md:py-24", children: _jsxs("div", { className: "container px-4 md:px-6", children: [_jsx("div", { className: "text-center space-y-8 mb-16", children: _jsx("h2", { className: "text-4xl md:text-5xl font-serif font-bold bg-luxury-gradient bg-clip-text text-transparent", children: "Preguntas Frecuentes sobre Env\u00EDos" }) }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto", children: [
                                {
                                    question: "¿Puedo cambiar la dirección de envío después de hacer el pedido?",
                                    answer: "Sí, puedes cambiar la dirección dentro de las primeras 2 horas después de realizar el pedido. Después de este tiempo, el pedido entra en preparación.",
                                },
                                {
                                    question: "¿Qué pasa si no estoy en casa al momento de la entrega?",
                                    answer: "El transportador intentará la entrega hasta 3 veces. Si no te encuentran, puedes coordinar una nueva fecha o recoger en la oficina más cercana.",
                                },
                                {
                                    question: "¿Hacen entregas en días festivos?",
                                    answer: "No realizamos entregas en días festivos nacionales. Los tiempos de entrega se extienden automáticamente en estos casos.",
                                },
                                {
                                    question: "¿Puedo solicitar entrega en horario específico?",
                                    answer: "Para envíos express ofrecemos ventanas de entrega de 2 horas. Para envíos estándar, la entrega es en horario laboral (8AM-6PM).",
                                },
                            ].map((faq, index) => (_jsxs(Card, { className: "bg-white/80 backdrop-blur-sm border-pink-100 hover:shadow-lg transition-all duration-300", style: { animationDelay: `${index * 0.1}s` }, children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "font-serif text-lg text-gray-800", children: faq.question }) }), _jsx(CardContent, { children: _jsx("p", { className: "text-gray-600 leading-relaxed", children: faq.answer }) })] }, index))) })] }) }), _jsx("section", { className: "py-16 md:py-24 bg-white/50", children: _jsx("div", { className: "container px-4 md:px-6", children: _jsxs("div", { className: "text-center space-y-8 max-w-4xl mx-auto", children: [_jsx("h2", { className: "text-4xl md:text-5xl font-serif font-bold bg-luxury-gradient bg-clip-text text-transparent", children: "\u00BFTienes m\u00E1s preguntas?" }), _jsx("p", { className: "text-xl text-gray-600 leading-relaxed", children: "Nuestro equipo de atenci\u00F3n al cliente est\u00E1 aqu\u00ED para ayudarte con cualquier duda sobre env\u00EDos y entregas." }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [_jsx(Link, { to: "/support-contact", children: _jsx(Button, { className: "bg-luxury-gradient hover:opacity-90 text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300", children: "Contactar Soporte" }) }), _jsx(Link, { to: "/faq", children: _jsx(Button, { variant: "outline", className: "border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-full text-lg font-medium", children: "Ver M\u00E1s FAQ" }) })] })] }) }) })] }));
}
