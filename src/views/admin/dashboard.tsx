import { useProducts } from "@/hooks/products/useProducts";
import { useOrders } from "@/hooks/orders/useOrders";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function AdminDashboard() {
  const { data: products = [], isLoading: loadingProducts } = useProducts({ paginate: false });
  const { data: orders = [], isLoading: loadingOrders } = useOrders();

  const totalProductos = products.length;
  const totalOrdenes = orders.length;
  const ingresosTotales = orders.reduce((acc, order) => acc + (Number(order.total) || 0), 0);

  // Ingresos por mes
  const ingresosPorMes: Record<string, number> = {};
  orders.forEach((order) => {
    const fecha = new Date(order.created_at);
    const mes = `${fecha.getFullYear()}-${(fecha.getMonth() + 1).toString().padStart(2, "0")}`;
    ingresosPorMes[mes] = (ingresosPorMes[mes] || 0) + order.total;
  });

  const chartIngresos = {
    labels: Object.keys(ingresosPorMes),
    datasets: [
      {
        label: "Ingresos mensuales (COP)",
        data: Object.values(ingresosPorMes),
        borderColor: "#9A6D4E",
        backgroundColor: "#E8D9CF",
        tension: 0.4,
        fill: true,
        borderWidth: 2,
        pointRadius: 4,
      },
    ],
  };

  // Productos por categoría
  const productosPorCategoria: Record<string, number> = {};
  products.forEach((p) => {
    productosPorCategoria[p.category] = (productosPorCategoria[p.category] || 0) + 1;
  });

  const chartCategorias = {
    labels: Object.keys(productosPorCategoria),
    datasets: [
      {
        label: "Productos por categoría",
        data: Object.values(productosPorCategoria),
        backgroundColor: ["#9A6D4E", "#D5B23D", "#7D5840", "#E8D9CF", "#5E4536"],
        borderWidth: 1,
      },
    ],
  };

  // Reviews por producto
  const reviewsPorProducto = products
    .filter((p) => p.reviews?.length)
    .map((p) => ({
      name: p.name,
      count: p.reviews.length,
    }))
    .sort((a, b) => b.count - a.count);

  const chartReviews = {
    labels: reviewsPorProducto.map((r) => r.name),
    datasets: [
      {
        label: "Cantidad de reseñas",
        data: reviewsPorProducto.map((r) => r.count),
        backgroundColor: "#D5B23D",
      },
    ],
  };

  // Tabla de últimas reseñas
  const tablaReviews = products
    .flatMap((p) =>
      (p.reviews || []).map((r) => ({
        producto: p.name,
        usuario: `${r.user?.first_name ?? "Anónimo"}`,
        comentario: r.comment,
        estrellas: r.rating,
      }))
    )
    .slice(0, 3);

  // Productos con mayor potencial de ingresos
  const topIngresos = products
    .map((p) => ({
      name: p.name,
      estimado: Number(p.price) * (p.stock_count || 0),
    }))
    .sort((a, b) => b.estimado - a.estimado)
    .slice(0, 5);

  const chartTopIngresos = {
    labels: topIngresos.map((p) => p.name),
    datasets: [
      {
        label: "Potencial de ingresos (COP)",
        data: topIngresos.map((p) => p.estimado),
        backgroundColor: "#7D5840",
      },
    ],
  };

  return (
    <div className="space-y-8 min-h-screen">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-[#5E4536]">Panel de Control</h1>
        <p className="text-sm text-[#7D5840]">Resumen general de productos, ventas y actividad reciente.</p>
      </header>

      {loadingProducts || loadingOrders ? (
        <p className="text-[#7D5840]">Cargando datos...</p>
      ) : (
        <>
          {/* Métricas principales */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white border border-[#E8D9CF] p-6 rounded-xl shadow-sm">
              <h2 className="text-sm font-medium text-[#9A6D4E] uppercase">Productos</h2>
              <p className="text-3xl font-bold text-[#5E4536]">{totalProductos}</p>
            </div>

            <div className="bg-white border border-[#E8D9CF] p-6 rounded-xl shadow-sm">
              <h2 className="text-sm font-medium text-[#9A6D4E] uppercase">Órdenes</h2>
              <p className="text-3xl font-bold text-[#5E4536]">{totalOrdenes}</p>
            </div>

            <div className="bg-white border border-[#E8D9CF] p-6 rounded-xl shadow-sm">
              <h2 className="text-sm font-medium text-[#9A6D4E] uppercase">Ingresos</h2>
              <p className="text-2xl font-bold text-[#5E4536]">
                {new Intl.NumberFormat("es-CO", {
                  style: "currency",
                  currency: "COP",
                }).format(ingresosTotales)}
              </p>
            </div>
          </div>

          {/* Gráfico de ingresos */}
          <div className="bg-white border border-[#E8D9CF] p-4 rounded-xl shadow-sm">
            <h2 className="text-lg font-bold text-[#5E4536] mb-2">Ingresos por Mes</h2>
            <Line data={chartIngresos} height={150} />
          </div>

          {/* Categorías y Reviews */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-[#E8D9CF] p-4 rounded-xl shadow-sm">
              <h2 className="text-lg font-bold text-[#5E4536] mb-2">Distribución por Categoría</h2>
              <Pie data={chartCategorias} />
            </div>

            {tablaReviews.length > 0 && (
              <div className="bg-white border border-[#E8D9CF] p-4 rounded-xl shadow-sm overflow-x-auto">
                <h2 className="text-lg font-bold text-[#5E4536] mb-2">Últimas Reseñas</h2>
                <table className="min-w-full text-sm">
                  <thead className="text-left text-[#7D5840] border-b border-[#E8D9CF]">
                    <tr>
                      <th className="py-1 px-2">Producto</th>
                      <th className="py-1 px-2">Usuario</th>
                      <th className="py-1 px-2">Comentario</th>
                      <th className="py-1 px-2">⭐</th>
                    </tr>
                  </thead>
                  <tbody className="text-[#5E4536]">
                    {tablaReviews.map((r, i) => (
                      <tr key={i} className="border-b border-[#F5EEE8]">
                        <td className="py-1 px-2">{r.producto}</td>
                        <td className="py-1 px-2">{r.usuario}</td>
                        <td className="py-1 px-2">{r.comentario}</td>
                        <td className="py-1 px-2">{r.estrellas}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
