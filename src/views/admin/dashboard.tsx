import { useProducts } from "@/hooks/products/useProducts";
import { useOrders } from "@/hooks/orders/useOrders";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function AdminDashboard() {
  const { data: products = [], isLoading: loadingProducts } = useProducts();
  const { data: orders = [], isLoading: loadingOrders } = useOrders();

  // Calcular totales
  const totalProductos = products.length;
  const totalOrdenes = orders.length;
  const ingresosTotales = orders.reduce((acc, order) => acc + (Number(order.total) || 0), 0);

  // Agrupar órdenes por mes (requiere fecha)
  const ingresosPorMes: Record<string, number> = {};
  orders.forEach(order => {
    const fecha = new Date(order.created_at); // Ajusta si el campo tiene otro nombre
    const mes = `${fecha.getFullYear()}-${(fecha.getMonth() + 1).toString().padStart(2, "0")}`;
    ingresosPorMes[mes] = (ingresosPorMes[mes] || 0) + order.total;
  });

  const chartData = {
    labels: Object.keys(ingresosPorMes),
    datasets: [
      {
        label: "Ingresos por mes",
        data: Object.values(ingresosPorMes),
        fill: false,
        borderWidth: 2
      }
    ]
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Panel Administrativo</h1>

      {loadingProducts || loadingOrders ? (
        <p>Cargando datos...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-white shadow p-4 rounded">
              <h2 className="text-lg font-semibold">Total de Productos</h2>
              <p className="text-2xl">{totalProductos}</p>
            </div>
            <div className="bg-white shadow p-4 rounded">
              <h2 className="text-lg font-semibold">Total de Órdenes</h2>
              <p className="text-2xl">{totalOrdenes}</p>
            </div>
            <div className="bg-white shadow p-4 rounded">
              <h2 className="text-lg font-semibold">Ingresos Totales</h2>
              <p className="text-2xl">
                {new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP" }).format(ingresosTotales)}
              </p>
            </div>
          </div>

          <div className="bg-white shadow p-4 rounded">
            <h2 className="text-lg font-semibold mb-2">Ingresos Mensuales</h2>
            <Line data={chartData} />
          </div>
        </>
      )}
    </div>
  );
}
