import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { LuChevronDown, LuSearch, LuCircle, LuSparkles } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
const faqCategories = [
    {
        title: "Pedidos y Pagos",
        icon: "💳",
        questions: [
            {
                question: "¿Qué métodos de pago aceptan?",
                answer: "Aceptamos tarjetas de crédito y débito (Visa, Mastercard, American Express), PSE, Nequi, Daviplata y pagos en efectivo a través de Efecty y Baloto. También ofrecemos financiación hasta 12 cuotas sin intereses.",
            },
            {
                question: "¿Cómo puedo rastrear mi pedido?",
                answer: "Una vez confirmado tu pedido, recibirás un email con el número de seguimiento. También puedes ingresar a tu cuenta en nuestra página web para ver el estado actualizado de tu pedido en tiempo real.",
            },
            {
                question: "¿Puedo modificar o cancelar mi pedido?",
                answer: "Puedes modificar o cancelar tu pedido dentro de las primeras 2 horas después de realizarlo. Después de este tiempo, el pedido entra en proceso de preparación y no puede ser modificado.",
            },
            {
                question: "¿Emiten factura?",
                answer: "Sí, emitimos factura electrónica para todos los pedidos. La recibirás en tu email registrado una vez que el pedido sea confirmado.",
            },
        ],
    },
    {
        title: "Envíos y Entregas",
        icon: "🚚",
        questions: [
            {
                question: "¿Cuánto tiempo tarda el envío?",
                answer: "Los envíos dentro de Bogotá tardan 1-2 días hábiles. Para otras ciudades principales (Medellín, Cali, Barranquilla) 2-3 días hábiles. Para el resto del país 3-5 días hábiles.",
            },
            {
                question: "¿El envío tiene costo?",
                answer: "El envío es GRATIS en compras superiores a $150.000 COP. Para compras menores, el costo de envío es de $15.000 COP a nivel nacional.",
            },
            {
                question: "¿Hacen entregas internacionales?",
                answer: "Actualmente solo realizamos envíos dentro de Colombia. Estamos trabajando para expandir nuestros envíos a otros países de Latinoamérica próximamente.",
            },
            {
                question: "¿Qué pasa si no estoy en casa al momento de la entrega?",
                answer: "Nuestro transportador intentará la entrega hasta 3 veces. Si no te encuentran, puedes coordinar una nueva fecha de entrega o recoger el paquete en la oficina más cercana.",
            },
        ],
    },
    {
        title: "Productos y Calidad",
        icon: "💎",
        questions: [
            {
                question: "¿Qué materiales utilizan?",
                answer: "Utilizamos acero inoxidable 316L con baños de oro de 18k, plata 925, cristales de alta calidad y perlas cultivadas. Todos nuestros materiales son hipoalergénicos y libres de níquel.",
            },
            {
                question: "¿Las joyas son resistentes al agua?",
                answer: "Nuestras piezas son resistentes al agua y al sudor para uso diario. Sin embargo, recomendamos evitar el contacto prolongado con agua salada, cloro y productos químicos para mantener su brillo original.",
            },
            {
                question: "¿Cómo sé qué talla elegir?",
                answer: "Tenemos una guía de tallas detallada en nuestra página web. Para anillos, también ofrecemos un medidor de tallas gratuito que puedes solicitar. Si tienes dudas, nuestro equipo puede asesorarte.",
            },
            {
                question: "¿Ofrecen garantía en sus productos?",
                answer: "Sí, todos nuestros productos tienen garantía de 1 año contra defectos de fabricación. La garantía cubre problemas de baño, cierres y estructura, pero no cubre daños por uso inadecuado.",
            },
        ],
    },
    {
        title: "Devoluciones y Cambios",
        icon: "🔄",
        questions: [
            {
                question: "¿Puedo devolver un producto?",
                answer: "Sí, aceptamos devoluciones dentro de los 30 días posteriores a la compra. El producto debe estar en condiciones originales, sin usar, con etiquetas y en su empaque original.",
            },
            {
                question: "¿Cómo proceso una devolución?",
                answer: "Puedes iniciar el proceso de devolución desde tu cuenta en línea o contactándonos. Te enviaremos una guía de devolución prepagada y procesaremos el reembolso una vez recibamos el producto.",
            },
            {
                question: "¿Puedo cambiar por otra talla o color?",
                answer: "Sí, ofrecemos cambios gratuitos por talla o color dentro de los 30 días. El primer cambio es gratuito, cambios adicionales tienen un costo de envío.",
            },
            {
                question: "¿Cuánto tardan en procesar el reembolso?",
                answer: "Una vez recibamos y verifiquemos el producto devuelto, procesamos el reembolso en 3-5 días hábiles. El tiempo de reflejo en tu cuenta depende de tu entidad bancaria.",
            },
        ],
    },
    {
        title: "Cuenta y Membresía",
        icon: "👤",
        questions: [
            {
                question: "¿Necesito crear una cuenta para comprar?",
                answer: "No es obligatorio, pero recomendamos crear una cuenta para acceder a beneficios exclusivos, rastrear pedidos fácilmente y recibir ofertas personalizadas.",
            },
            {
                question: "¿Qué beneficios tiene ser miembro VIP?",
                answer: "Los miembros VIP reciben acceso anticipado a nuevas colecciones, descuentos exclusivos, envío gratis sin mínimo de compra y atención prioritaria.",
            },
            {
                question: "¿Cómo cambio mi información personal?",
                answer: "Puedes actualizar tu información personal ingresando a tu cuenta en 'Mi Perfil'. Si tienes problemas, nuestro equipo de soporte puede ayudarte.",
            },
            {
                question: "¿Cómo me suscribo al newsletter?",
                answer: "Puedes suscribirte al newsletter en cualquier página de nuestro sitio web o durante el proceso de compra. También puedes hacerlo desde tu cuenta de usuario.",
            },
        ],
    },
];
export default function FAQPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [openItems, setOpenItems] = useState([]);
    const toggleItem = (item) => {
        setOpenItems((prev) => (prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]));
    };
    const filteredCategories = faqCategories
        .map((category) => ({
        ...category,
        questions: category.questions.filter((q) => q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            q.answer.toLowerCase().includes(searchTerm.toLowerCase())),
    }))
        .filter((category) => category.questions.length > 0);
    return (_jsxs("div", { className: "min-h-screen bg-[#FDF8F4]", children: [_jsx("section", { className: "relative py-20 md:py-28 overflow-hidden", children: _jsx("div", { className: "container px-4 md:px-6 relative", children: _jsxs("div", { className: "text-center space-y-8", children: [_jsxs("div", { className: "inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-medium text-[#9A6D4E] shadow-sm border border-[#E8D9CF]", children: [_jsx(LuCircle, { className: "h-5 w-5" }), _jsx("span", { className: "font-medium", children: "Centro de Ayuda" }), _jsx(LuSparkles, { className: "h-5 w-5" })] }), _jsx("h1", { className: "text-5xl md:text-7xl font-bold text-[#5E4536] leading-tight", children: "Preguntas Frecuentes" }), _jsx("p", { className: "text-xl md:text-2xl text-[#9A6D4E] max-w-3xl mx-auto font-light leading-relaxed", children: "Encuentra respuestas r\u00E1pidas a las preguntas m\u00E1s comunes sobre NURAE. Si no encuentras lo que buscas, cont\u00E1ctanos." }), _jsx("div", { className: "max-w-2xl mx-auto", children: _jsxs("div", { className: "relative", children: [_jsx(LuSearch, { className: "absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#9A6D4E]" }), _jsx(Input, { type: "text", placeholder: "Busca tu pregunta aqu\u00ED...", className: "pl-12 pr-4 h-14 text-lg border-2 border-[#E8D9CF] focus:border-[#9A6D4E] rounded-2xl bg-white", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value) })] }) })] }) }) }), _jsx("section", { className: "py-16 md:py-24", children: _jsx("div", { className: "container px-4 md:px-6", children: filteredCategories.length === 0 ? (_jsxs("div", { className: "text-center space-y-8", children: [_jsx("div", { className: "text-6xl", children: "\uD83D\uDD0D" }), _jsx("h3", { className: "text-2xl font-bold text-[#5E4536]", children: "No encontramos resultados" }), _jsx("p", { className: "text-[#9A6D4E] max-w-md mx-auto", children: "Intenta con otros t\u00E9rminos de b\u00FAsqueda o explora nuestras categor\u00EDas principales." }), _jsx(Button, { onClick: () => setSearchTerm(""), className: "bg-[#9A6D4E] hover:bg-[#7D5840] text-white", children: "Ver Todas las Preguntas" })] })) : (_jsx("div", { className: "space-y-12", children: filteredCategories.map((category, categoryIndex) => (_jsxs("div", { className: "bg-white rounded-3xl p-8 shadow-md border border-[#E8D9CF]", style: { animationDelay: `${categoryIndex * 0.1}s` }, children: [_jsxs("div", { className: "flex items-center gap-4 mb-8", children: [_jsx("div", { className: "text-4xl", children: category.icon }), _jsx("h2", { className: "text-3xl md:text-4xl font-bold text-[#5E4536]", children: category.title })] }), _jsx("div", { className: "space-y-4", children: category.questions.map((faq, index) => {
                                        const itemKey = `${category.title}-${index}`;
                                        const isOpen = openItems.includes(itemKey);
                                        return (_jsxs(Collapsible, { open: isOpen, onOpenChange: () => toggleItem(itemKey), children: [_jsx(CollapsibleTrigger, { asChild: true, children: _jsxs(Button, { variant: "ghost", className: "w-full justify-between p-6 h-auto text-left bg-[#F5EEE8] hover:bg-[#E8D9CF] rounded-2xl border border-[#E8D9CF]", children: [_jsx("span", { className: "font-medium text-lg text-[#5E4536] pr-4", children: faq.question }), _jsx(LuChevronDown, { className: `h-5 w-5 text-[#9A6D4E] transition-transform duration-200 flex-shrink-0 ${isOpen ? "rotate-180" : ""}` })] }) }), _jsx(CollapsibleContent, { className: "px-6 pb-6", children: _jsx("div", { className: "pt-4 text-[#9A6D4E] leading-relaxed text-base", children: faq.answer }) })] }, itemKey));
                                    }) })] }, category.title))) })) }) }), _jsx("section", { className: "py-16 md:py-24 bg-[#F5EEE8]", children: _jsx("div", { className: "container px-4 md:px-6", children: _jsxs("div", { className: "text-center space-y-8 max-w-4xl mx-auto", children: [_jsx("h2", { className: "text-4xl md:text-5xl font-bold text-[#5E4536]", children: "\u00BFNo encontraste tu respuesta?" }), _jsx("p", { className: "text-xl text-[#9A6D4E] leading-relaxed", children: "Nuestro equipo de atenci\u00F3n al cliente est\u00E1 aqu\u00ED para ayudarte. Cont\u00E1ctanos y te responderemos lo antes posible." }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mt-12", children: [_jsxs("div", { className: "bg-white rounded-2xl p-6 border border-[#E8D9CF] text-center", children: [_jsx("div", { className: "text-3xl mb-4", children: "\uD83D\uDCAC" }), _jsx("h3", { className: "font-bold text-lg mb-2 text-[#5E4536]", children: "Chat en Vivo" }), _jsx("p", { className: "text-sm text-[#9A6D4E] mb-4", children: "Lun - Vie: 9AM - 7PM" }), _jsx(Button, { className: "bg-[#9A6D4E] hover:bg-[#7D5840] text-white w-full", children: "Iniciar Chat" })] }), _jsxs("div", { className: "bg-white rounded-2xl p-6 border border-[#E8D9CF] text-center", children: [_jsx("div", { className: "text-3xl mb-4", children: "\uD83D\uDCE7" }), _jsx("h3", { className: "font-bold text-lg mb-2 text-[#5E4536]", children: "Email" }), _jsx("p", { className: "text-sm text-[#9A6D4E] mb-4", children: "Respuesta en 24 horas" }), _jsx(Button, { variant: "outline", className: "border-[#9A6D4E] text-[#9A6D4E] hover:bg-[#9A6D4E] hover:text-white w-full", children: "Enviar Email" })] }), _jsxs("div", { className: "bg-white rounded-2xl p-6 border border-[#E8D9CF] text-center", children: [_jsx("div", { className: "text-3xl mb-4", children: "\uD83D\uDCDE" }), _jsx("h3", { className: "font-bold text-lg mb-2 text-[#5E4536]", children: "Tel\u00E9fono" }), _jsx("p", { className: "text-sm text-[#9A6D4E] mb-4", children: "+57 1 234 5678" }), _jsx(Button, { variant: "outline", className: "border-[#E76F51] text-[#E76F51] hover:bg-[#E76F51] hover:text-white w-full", children: "Llamar Ahora" })] })] })] }) }) })] }));
}
