import {
  LuShield,
  LuTruck,
  LuCreditCard,
  LuHeartHandshake,
  LuAward,
  LuSparkles,
} from "react-icons/lu";

export function TrustBadges() {
  const badges = [
    {
      icon: LuShield,
      title: "Compra Segura",
      description: "Protección SSL 256-bit",
    },
    {
      icon: LuTruck,
      title: "Envío Gratis",
      description: "En compras +$150.000",
    },
    {
      icon: LuCreditCard,
      title: "Hasta 12 Cuotas",
      description: "Sin intereses",
    },
    {
      icon: LuHeartHandshake,
      title: "Garantía",
      description: "30 días de devolución",
    },
    {
      icon: LuAward,
      title: "Calidad Premium",
      description: "Materiales certificados",
    },
    {
      icon: LuSparkles,
      title: "Diseño Único",
      description: "Exclusivo LÚMINA",
    },
  ];

  return (
    <section className="w-full py-6 bg-white border-y border-[#D4AF37]">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {badges.map((badge, index) => {
            const IconComponent = badge.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center space-y-3 p-4 rounded-xl hover:bg-[#fdf9f3] transition-all duration-300 group"
              >
                <div className="p-3 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-white transition-all duration-300">
                  <IconComponent className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-[#2C1810]">{badge.title}</h3>
                  <p className="text-xs text-gray-600 mt-1">{badge.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
