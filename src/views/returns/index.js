import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { LuRotateCcw, LuClock, LuCircle, LuCircleAlert, LuPackage, LuTruck, LuCreditCard, LuSparkles } from "react-icons/lu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
const returnReasons = [
    {
        title: "Producto defectuoso",
        description: "El producto llegó dañado o con defectos de fabricación",
        icon: LuCircleAlert,
        color: "text-red-500",
        bgColor: "bg-red-50",
    },
    {
        title: "Talla incorrecta",
        description: "El producto no tiene la talla que esperabas",
        icon: LuPackage,
        color: "text-blue-500",
        bgColor: "bg-blue-50",
    },
    {
        title: "No cumple expectativas",
        description: "El producto no es como lo esperabas",
        icon: LuRotateCcw,
        color: "text-orange-500",
        bgColor: "bg-orange-50",
    },
    {
        title: "Cambio de opinión",
        description: "Simplemente cambiaste de opinión sobre la compra",
        icon: LuCircle,
        color: "text-green-500",
        bgColor: "bg-green-50",
    },
];
const returnProcess = [
    {
        step: "1",
        title: "Solicita la devolución",
        description: "Contacta nuestro servicio al cliente dentro de los 30 días",
        time: "0-1 día",
    },
    {
        step: "2",
        title: "Empaca el producto",
        description: "Incluye todos los accesorios y la caja original",
        time: "1 día",
    },
    {
        step: "3",
        title: "Envía el paquete",
        description: "Usa la etiqueta de envío prepagada que te proporcionamos",
        time: "2-5 días",
    },
    {
        step: "4",
        title: "Recibe tu reembolso",
        description: "Procesamos tu reembolso una vez recibido el producto",
        time: "3-7 días",
    },
];
export default function ReturnsPage() {
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-orange-50", children: [_jsxs("section", { className: "relative py-20 md:py-28 overflow-hidden", children: [_jsx("div", { className: "absolute inset-0 bg-luxury-gradient opacity-10" }), _jsx("div", { className: "absolute top-10 left-10 text-pink-300 animate-float", children: _jsx(LuRotateCcw, { className: "h-12 w-12" }) }), _jsx("div", { className: "absolute bottom-20 right-20 text-purple-300 animate-float", style: { animationDelay: "1s" }, children: _jsx(LuPackage, { className: "h-16 w-16" }) }), _jsx("div", { className: "container px-4 md:px-6 relative", children: _jsxs("div", { className: "text-center space-y-8", children: [_jsxs("div", { className: "inline-flex items-center gap-3 rounded-full bg-white/80 backdrop-blur-sm px-6 py-3 text-sm font-medium text-primary shadow-lg border border-pink-200", children: [_jsx(LuRotateCcw, { className: "h-5 w-5" }), _jsx("span", { className: "font-display", children: "Pol\u00EDtica de Devoluciones" }), _jsx(LuSparkles, { className: "h-5 w-5 animate-pulse" })] }), _jsx("h1", { className: "text-5xl md:text-7xl font-serif font-bold bg-luxury-gradient bg-clip-text text-transparent leading-tight", children: "Devoluciones F\u00E1ciles" }), _jsx("p", { className: "text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed", children: "Tu satisfacci\u00F3n es nuestra prioridad. Ofrecemos devoluciones gratuitas dentro de 30 d\u00EDas." })] }) })] }), _jsx("section", { className: "py-16 md:py-24", children: _jsxs("div", { className: "container px-4 md:px-6", children: [_jsxs("div", { className: "text-center space-y-8 mb-16", children: [_jsx("h2", { className: "text-4xl md:text-5xl font-serif font-bold bg-luxury-gradient bg-clip-text text-transparent", children: "Nuestra Pol\u00EDtica" }), _jsx("p", { className: "text-xl text-gray-600 max-w-3xl mx-auto", children: "Queremos que est\u00E9s completamente satisfecha con tu compra" })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8 mb-16", children: [_jsx(Card, { className: "bg-white/80 backdrop-blur-sm border-pink-100 text-center", children: _jsxs(CardContent, { className: "p-8", children: [_jsx("div", { className: "w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4", children: _jsx(LuClock, { className: "h-8 w-8 text-green-600" }) }), _jsx("h3", { className: "font-serif text-xl font-bold text-gray-800 mb-2", children: "30 D\u00EDas" }), _jsx("p", { className: "text-gray-600", children: "Tienes 30 d\u00EDas desde la recepci\u00F3n para solicitar una devoluci\u00F3n" })] }) }), _jsx(Card, { className: "bg-white/80 backdrop-blur-sm border-pink-100 text-center", children: _jsxs(CardContent, { className: "p-8", children: [_jsx("div", { className: "w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4", children: _jsx(LuTruck, { className: "h-8 w-8 text-blue-600" }) }), _jsx("h3", { className: "font-serif text-xl font-bold text-gray-800 mb-2", children: "Env\u00EDo Gratis" }), _jsx("p", { className: "text-gray-600", children: "Proporcionamos etiqueta de env\u00EDo prepagada para todas las devoluciones" })] }) }), _jsx(Card, { className: "bg-white/80 backdrop-blur-sm border-pink-100 text-center", children: _jsxs(CardContent, { className: "p-8", children: [_jsx("div", { className: "w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4", children: _jsx(LuCreditCard, { className: "h-8 w-8 text-purple-600" }) }), _jsx("h3", { className: "font-serif text-xl font-bold text-gray-800 mb-2", children: "Reembolso Completo" }), _jsx("p", { className: "text-gray-600", children: "Reembolsamos el 100% del valor del producto en 3-7 d\u00EDas h\u00E1biles" })] }) })] })] }) }), _jsx("section", { className: "py-16 md:py-24 bg-white/50", children: _jsxs("div", { className: "container px-4 md:px-6", children: [_jsxs("div", { className: "text-center space-y-8 mb-16", children: [_jsx("h2", { className: "text-4xl md:text-5xl font-serif font-bold bg-luxury-gradient bg-clip-text text-transparent", children: "Motivos de Devoluci\u00F3n" }), _jsx("p", { className: "text-xl text-gray-600 max-w-3xl mx-auto", children: "Aceptamos devoluciones por cualquiera de estos motivos" })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: returnReasons.map((reason, index) => {
                                const IconComponent = reason.icon;
                                return (_jsx(Card, { className: "bg-white/80 backdrop-blur-sm border-pink-100 hover:shadow-lg transition-all duration-300", style: { animationDelay: `${index * 0.1}s` }, children: _jsx(CardContent, { className: "p-8", children: _jsxs("div", { className: "flex items-start gap-4", children: [_jsx("div", { className: `w-12 h-12 ${reason.bgColor} rounded-full flex items-center justify-center flex-shrink-0`, children: _jsx(IconComponent, { className: `h-6 w-6 ${reason.color}` }) }), _jsxs("div", { children: [_jsx("h3", { className: "font-serif text-xl font-bold text-gray-800 mb-2", children: reason.title }), _jsx("p", { className: "text-gray-600 leading-relaxed", children: reason.description })] })] }) }) }, reason.title));
                            }) })] }) }), _jsx("section", { className: "py-16 md:py-24", children: _jsxs("div", { className: "container px-4 md:px-6", children: [_jsxs("div", { className: "text-center space-y-8 mb-16", children: [_jsx("h2", { className: "text-4xl md:text-5xl font-serif font-bold bg-luxury-gradient bg-clip-text text-transparent", children: "Proceso de Devoluci\u00F3n" }), _jsx("p", { className: "text-xl text-gray-600 max-w-3xl mx-auto", children: "Sigue estos sencillos pasos para devolver tu producto" })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-8", children: returnProcess.map((step, index) => (_jsxs("div", { className: "text-center space-y-4", style: { animationDelay: `${index * 0.2}s` }, children: [_jsx("div", { className: "mx-auto w-16 h-16 bg-luxury-gradient rounded-full flex items-center justify-center text-white text-2xl font-bold", children: step.step }), _jsx("h3", { className: "font-serif text-xl font-bold text-gray-800", children: step.title }), _jsx("p", { className: "text-gray-600", children: step.description }), _jsx(Badge, { variant: "outline", className: "text-primary border-primary", children: step.time })] }, step.step))) })] }) }), _jsx("section", { className: "py-16 md:py-24 bg-white/50", children: _jsxs("div", { className: "container px-4 md:px-6", children: [_jsx("div", { className: "text-center space-y-8 mb-16", children: _jsx("h2", { className: "text-4xl md:text-5xl font-serif font-bold bg-luxury-gradient bg-clip-text text-transparent", children: "Condiciones para Devoluciones" }) }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [_jsxs(Card, { className: "bg-white/80 backdrop-blur-sm border-pink-100", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2 font-serif text-xl text-green-600", children: [_jsx(LuCircle, { className: "h-6 w-6" }), "Productos Elegibles"] }) }), _jsxs(CardContent, { className: "space-y-3", children: [_jsx("p", { className: "text-gray-600", children: "\u2022 Productos en condici\u00F3n original y sin usar" }), _jsx("p", { className: "text-gray-600", children: "\u2022 Con etiquetas y empaques originales" }), _jsx("p", { className: "text-gray-600", children: "\u2022 Dentro del per\u00EDodo de 30 d\u00EDas" }), _jsx("p", { className: "text-gray-600", children: "\u2022 Con comprobante de compra" }), _jsx("p", { className: "text-gray-600", children: "\u2022 Joyas sin signos de uso o desgaste" })] })] }), _jsxs(Card, { className: "bg-white/80 backdrop-blur-sm border-pink-100", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2 font-serif text-xl text-red-600", children: [_jsx(LuCircleAlert, { className: "h-6 w-6" }), "Productos No Elegibles"] }) }), _jsxs(CardContent, { className: "space-y-3", children: [_jsx("p", { className: "text-gray-600", children: "\u2022 Productos personalizados o grabados" }), _jsx("p", { className: "text-gray-600", children: "\u2022 Joyas con signos evidentes de uso" }), _jsx("p", { className: "text-gray-600", children: "\u2022 Productos da\u00F1ados por mal uso" }), _jsx("p", { className: "text-gray-600", children: "\u2022 Art\u00EDculos en oferta final (clearance)" }), _jsx("p", { className: "text-gray-600", children: "\u2022 Productos sin empaque original" })] })] })] })] }) }), _jsx("section", { className: "py-16 md:py-24", children: _jsxs("div", { className: "container px-4 md:px-6", children: [_jsx("div", { className: "text-center space-y-8 mb-16", children: _jsx("h2", { className: "text-4xl md:text-5xl font-serif font-bold bg-luxury-gradient bg-clip-text text-transparent", children: "Preguntas Frecuentes" }) }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto", children: [
                                {
                                    question: "¿Cuánto tiempo toma procesar mi reembolso?",
                                    answer: "Una vez que recibimos tu producto devuelto, procesamos el reembolso en 3-7 días hábiles. El tiempo puede variar según tu método de pago original.",
                                },
                                {
                                    question: "¿Puedo cambiar un producto por otro?",
                                    answer: "Sí, ofrecemos cambios por talla o color diferente. El proceso es el mismo que una devolución, pero puedes seleccionar el producto de reemplazo.",
                                },
                                {
                                    question: "¿Qué pasa si mi producto llegó dañado?",
                                    answer: "Si tu producto llegó dañado, contáctanos inmediatamente. Proporcionaremos un reemplazo gratuito y cubriremos todos los costos de envío.",
                                },
                                {
                                    question: "¿Puedo devolver un regalo?",
                                    answer: "Sí, los regalos pueden ser devueltos dentro del período de 30 días. El reembolso se procesará como crédito de tienda si no tienes el recibo original.",
                                },
                            ].map((faq, index) => (_jsxs(Card, { className: "bg-white/80 backdrop-blur-sm border-pink-100 hover:shadow-lg transition-all duration-300", style: { animationDelay: `${index * 0.1}s` }, children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "font-serif text-lg text-gray-800", children: faq.question }) }), _jsx(CardContent, { children: _jsx("p", { className: "text-gray-600 leading-relaxed", children: faq.answer }) })] }, index))) })] }) }), _jsx("section", { className: "py-16 md:py-24 bg-white/50", children: _jsx("div", { className: "container px-4 md:px-6", children: _jsxs("div", { className: "text-center space-y-8 max-w-4xl mx-auto", children: [_jsx("h2", { className: "text-4xl md:text-5xl font-serif font-bold bg-luxury-gradient bg-clip-text text-transparent", children: "\u00BFNecesitas hacer una devoluci\u00F3n?" }), _jsx("p", { className: "text-xl text-gray-600 leading-relaxed", children: "Nuestro equipo de atenci\u00F3n al cliente est\u00E1 aqu\u00ED para ayudarte con el proceso de devoluci\u00F3n." }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [_jsx(Link, { to: "/contact", children: _jsx(Button, { className: "bg-luxury-gradient hover:opacity-90 text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300", children: "Iniciar Devoluci\u00F3n" }) }), _jsx(Link, { to: "/support", children: _jsx(Button, { variant: "outline", className: "border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-full text-lg font-medium", children: "Contactar Soporte" }) })] })] }) }) })] }));
}
