import { useState } from "react";
import { OrdersList } from "@/components/orders/orders-list";
import { OrderDetails } from "@/components/orders/order-details";
import { UpdateOrderStatus } from "@/components/orders/update-order-status";
import { OrderStatusHistory } from "@/components/orders/order-status-history";
import { useOrders } from "@/hooks/orders/useOrders";
import { useCreateOrderHistory } from "@/hooks/orders/useCreateOrderHistory";
import { useOrder } from "@/hooks/orders/useOrder";
import { useDebounce } from "use-debounce";

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "completed"
  | "cancelled";
export type PaymentStatus = "pending" | "approved" | "failed" | "refunded";

export interface OrderProduct {
  id: number;
  product_id: number;
  product_name: string;
  price: number;
  quantity: number;
  total: number;
}

export interface Order {
  id: number;
  user_id: number;
  user: {
    id: number;
    first_name: string;
    last_name: string | null;
    email: string;
    phone: string | null;
  };
  address_id?: number;
  address?: {
    id: number;
    name: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    company: string;
    document_type: string;
    document_number: string;
    fiscal_name: string;
    street_address: string;
    apartment?: string | null;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    is_default: boolean;
    notes?: string | null;
  };
  payment_method: string;
  payment_status: PaymentStatus;
  status: OrderStatus;
  shipping_method?: string;
  shipping_cost: number;
  tax: number;
  subtotal: number;
  total: number;
  transaction_id?: string;
  created_at: string;
  updated_at: string;
  order_items: OrderProduct[];
  status_logs: {
    id: number;
    order_id: number;
    user_id?: number;
    user: {
      id: number;
      first_name: string;
      last_name: string | null;
      email: string;
      phone: string | null;
    };
    status: OrderStatus;
    message?: string;
    tracking_url?: string;
    created_at: string;
  }[];
}

export default function AdminOrdersPage() {
  const createOrderHistory = useCreateOrderHistory();
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [showStatusUpdate, setShowStatusUpdate] = useState(false);
  const [showStatusHistory, setShowStatusHistory] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 2000);
  const [statusFilter, setStatusFilter] = useState<OrderStatus>("pending");
  const [paymentFilter, setPaymentFilter] = useState<PaymentStatus>("approved");

  const {
    data: orders = [],
    isLoading,
    isError,
  } = useOrders({
    search: debouncedSearchTerm,
  });

  const filteredOrders = orders.filter((order) => {
    return (
      order.status === statusFilter &&
      order.payment_status === paymentFilter &&
      (order.user.first_name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        order.user.last_name?.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        order.user.email.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))
    );
  });

  const {
    data: selectedOrder,
    isLoading: isLoadingOrder,
    isError: isOrderError,
  } = useOrder(selectedOrderId);

  const handleOrderSelect = (order: Order) => {
    setSelectedOrderId(order.id);
    setShowStatusUpdate(false);
    setShowStatusHistory(false);
  };

  const handleStatusUpdate = (
    orderId: number,
    newStatus: OrderStatus,
    message?: string,
    trackingUrl?: string
  ) => {
    createOrderHistory.mutate({
      order_id: orderId,
      status: newStatus,
      admin_message: message,
      tracking_url: trackingUrl,
    });

    setShowStatusUpdate(false);
  };

  const handleViewHistory = () => {
    setShowStatusHistory(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Cargando órdenes...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-600">
        Error al cargar órdenes.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Gestión de Órdenes
          </h1>
          <p className="text-gray-600 mt-2">
            Administra y monitorea todas las órdenes del sistema
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lista de órdenes */}
          <div className="lg:col-span-1">
            <OrdersList
              orders={filteredOrders}
              onOrderSelect={handleOrderSelect}
              selectedOrderId={selectedOrderId}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              paymentFilter={paymentFilter}
              onPaymentFilterChange={setPaymentFilter}
            />
          </div>

          {/* Detalles de la orden */}
          <div className="lg:col-span-2">
            {isLoadingOrder && (
              <div className="bg-white rounded-lg shadow-sm border p-8 text-center text-gray-500">
                Cargando detalles de la orden...
              </div>
            )}

            {isOrderError && (
              <div className="bg-white rounded-lg shadow-sm border p-8 text-center text-red-500">
                Error al cargar los detalles de la orden.
              </div>
            )}

            {selectedOrder && !isLoadingOrder && !isOrderError && (
              <OrderDetails
                order={selectedOrder}
                onUpdateStatus={() => setShowStatusUpdate(true)}
                onViewHistory={handleViewHistory}
              />
            )}

            {!selectedOrderId && !isLoadingOrder && !isOrderError && (
              <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
                <div className="text-gray-400 mb-4">
                  <svg
                    className="mx-auto h-12 w-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Selecciona una orden
                </h3>
                <p className="text-gray-500">
                  Elige una orden de la lista para ver sus detalles
                </p>
              </div>
            )}
          </div>
        </div>

        {selectedOrder && (
          <UpdateOrderStatus
            order={selectedOrder}
            open={showStatusUpdate}
            onOpenChange={setShowStatusUpdate}
            onUpdateStatus={handleStatusUpdate}
          />
        )}
        {selectedOrder && (
          <OrderStatusHistory
            order={selectedOrder}
            open={showStatusHistory}
            onOpenChange={setShowStatusHistory}
          />
        )}
      </div>
    </div>
  );
}
