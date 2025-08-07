import { useSearchParams, useNavigate } from "react-router-dom";
import { useTransaction } from "@/hooks/useTransaction";
import { useEffect } from "react";
import { useCart } from "@/hooks/useCart";

export default function ConfirmPage() {
    const [searchParams] = useSearchParams();
    const transactionId = searchParams.get("id") || undefined;
    const navigate = useNavigate();
    const { clearCartCloud } = useCart();

    useEffect(() => {
        clearCartCloud();
    }, []);

    const {
        data,
        isLoading,
        isError,
        error,
    } = useTransaction(transactionId);

    const transaction = data?.transaction;
    const order = data?.order;

    useEffect(() => {
        if (transaction?.status === "APPROVED" && order) {
            const timeout = setTimeout(() => {
                navigate(`/order/${order.id}`);
            }, 4000);
            return () => clearTimeout(timeout);
        }
    }, [transaction, order, navigate]);

    if (!transactionId) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
                <div className="max-w-md w-full bg-white shadow rounded-lg p-6 text-center">
                    <p className="text-red-600 font-semibold">ID de transacción no proporcionado.</p>
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
                <div className="max-w-md w-full bg-white shadow rounded-lg p-6 text-center">
                    <p className="text-gray-600">Consultando transacción...</p>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
                <div className="max-w-md w-full bg-white shadow rounded-lg p-6 text-center">
                    <p className="text-red-600 font-semibold">Error al consultar la transacción.</p>
                    <p className="text-sm text-gray-500">{(error as any)?.message || "Intenta nuevamente."}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
            <div className="max-w-2xl w-full bg-white shadow-lg rounded-lg p-6 space-y-6">
                <h1 className="text-2xl font-bold text-center">Confirmación de Pago</h1>

                {/* Estado general */}
                <div className="text-center">
                    <p className="text-sm text-gray-500">Estado de la transacción:</p>
                    <p
                        className={`text-xl font-bold ${transaction?.status === "APPROVED"
                            ? "text-green-600"
                            : ["REJECTED", "DECLINED", "ERROR"].includes(transaction?.status)
                                ? "text-red-600"
                                : "text-yellow-600"
                            }`}
                    >
                        {transaction?.status || "Desconocido"}
                    </p>
                    {transaction?.status_message && (
                        <p className="text-sm text-gray-600 mt-1">{transaction.status_message}</p>
                    )}
                </div>

                {/* Información de la transacción */}
                <div className="overflow-x-auto">
                    <table className="w-full table-auto text-sm border">
                        <tbody>
                            <tr className="border-t">
                                <th
                                    colSpan={2}
                                    className="font-bold px-4 py-2 text-center bg-gray-100 text-gray-800"
                                >
                                    Datos de Pago
                                </th>
                            </tr>
                            <tr className="border-t">
                                <td className="font-medium px-4 py-2 border">Método de pago:</td>
                                <td className="px-4 py-2">{transaction?.payment_method_type || "N/A"}</td>
                            </tr>
                            <tr className="border-t">
                                <td className="font-medium px-4 py-2 border">Referencia:</td>
                                <td className="px-4 py-2">{transaction?.reference}</td>
                            </tr>
                            <tr className="border-t">
                                <td className="font-medium px-4 py-2 border">Email del pagador:</td>
                                <td className="px-4 py-2">{transaction?.customer_email}</td>
                            </tr>
                            <tr className="border-t">
                                <td className="font-medium px-4 py-2 border">Fecha:</td>
                                <td className="px-4 py-2">
                                    {transaction?.created_at &&
                                        new Date(transaction.created_at).toLocaleString("es-CO")}
                                </td>
                            </tr>
                            <tr className="border-t">
                                <td className="font-medium px-4 py-2 border">Valor pagado:</td>
                                <td className="px-4 py-2">
                                    {transaction?.amount_in_cents
                                        ? (transaction.amount_in_cents / 100).toLocaleString("es-CO", {
                                            style: "currency",
                                            currency: "COP",
                                            minimumFractionDigits: 0,
                                        })
                                        : "N/A"}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Información de la orden (si existe) */}
                {order && (
                    <div className="mt-8">
                        <h2 className="text-lg font-semibold mb-4">Resumen de la Orden</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full table-auto text-sm border border-gray-200">
                                <tbody>
                                    <tr className="border-t">
                                        <td className="font-medium px-4 py-2">Número de orden:</td>
                                        <td className="px-4 py-2">#{order.id}</td>
                                    </tr>
                                    <tr className="border-t">
                                        <td className="font-medium px-4 py-2">Estado de la orden:</td>
                                        <td className="px-4 py-2 capitalize">{order.status}</td>
                                    </tr>
                                    <tr className="border-t">
                                        <td className="font-medium px-4 py-2">Total:</td>
                                        <td className="px-4 py-2">
                                            {parseFloat(order.total).toLocaleString("es-CO", {
                                                style: "currency",
                                                currency: "COP",
                                                minimumFractionDigits: 0,
                                            })}
                                        </td>
                                    </tr>
                                    <tr className="border-t">
                                        <td className="font-medium px-4 py-2">Impuestos:</td>
                                        <td className="px-4 py-2">
                                            {parseFloat(order.tax).toLocaleString("es-CO", {
                                                style: "currency",
                                                currency: "COP",
                                                minimumFractionDigits: 0,
                                            })}
                                        </td>
                                    </tr>
                                    <tr className="border-t">
                                        <td className="font-medium px-4 py-2">Envío:</td>
                                        <td className="px-4 py-2">
                                            {parseFloat(order.shipping_cost).toLocaleString("es-CO", {
                                                style: "currency",
                                                currency: "COP",
                                                minimumFractionDigits: 0,
                                            })}
                                        </td>
                                    </tr>
                                    <tr className="border-t">
                                        <td className="font-medium px-4 py-2">Dirección de envío:</td>
                                        <td className="px-4 py-2">
                                            {order.address?.street_address || order.address?.name || "N/A"}
                                        </td>
                                    </tr>
                                    <tr className="border-t">
                                        <td className="font-medium px-4 py-2">Cliente:</td>
                                        <td className="px-4 py-2">
                                            {order.user?.first_name || "N/A"} ({order.user?.email || "N/A"})
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Redirección si fue exitosa */}
                {transaction?.status === "APPROVED" && order && (
                    <div className="text-green-700 text-center font-semibold">
                        ✅ Pago aprobado. Redirigiendo a tu orden...
                    </div>
                )}

                {["REJECTED", "DECLINED", "ERROR"].includes(transaction?.status) && (
                    <div className="text-red-600 text-center font-semibold">
                        ❌ El pago fue rechazado o fallido.
                    </div>
                )}
            </div>
        </div>
    );
}
