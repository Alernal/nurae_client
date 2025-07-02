import { useOrders } from "@/hooks/orders/useOrders";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function ClientDashboard() {
  const { data: orders = [], isLoading: loadingOrders } = useOrders();

  // Calcular métricas
  const totalOrdenes = orders.length;
  const totalGastado = orders.reduce((acc, order) => acc + (Number(order.total) || 0), 0);

  console.log(orders)

  // Agrupar órdenes por mes
  const gastosPorMes: Record<string, number> = {};
  orders.forEach(order => {
    const fecha = new Date(order.created_at);
    const mes = `${fecha.getFullYear()}-${(fecha.getMonth() + 1).toString().padStart(2, "0")}`;
    gastosPorMes[mes] = (gastosPorMes[mes] || 0) + (Number(order.total) || 0);
  });

  const chartData = {
    labels: Object.keys(gastosPorMes),
    datasets: [
      {
        label: "Gasto mensual",
        data: Object.values(gastosPorMes),
        fill: false,
        borderWidth: 2
      }
    ]
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Resumen de Compras</h1>

      {loadingOrders ? (
        <p>Cargando tus órdenes...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="bg-white shadow p-4 rounded">
              <h2 className="text-lg font-semibold">Total de Órdenes</h2>
              <p className="text-2xl">{totalOrdenes}</p>
            </div>
            <div className="bg-white shadow p-4 rounded">
              <h2 className="text-lg font-semibold">Total Gastado</h2>
              <p className="text-2xl">
                {new Intl.NumberFormat("es-CO", {
                  style: "currency",
                  currency: "COP"
                }).format(totalGastado)}
              </p>
            </div>
          </div>

          <div className="bg-white shadow p-4 rounded">
            <h2 className="text-lg font-semibold mb-2">Gasto Mensual</h2>
            <Line data={chartData} />
          </div>
        </>
      )}
    </div>
  );
}
