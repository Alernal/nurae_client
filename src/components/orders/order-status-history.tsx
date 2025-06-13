import {
  LuClock,
  LuUser,
  LuMessageSquare,
  LuExternalLink,
  LuTruck,
} from "react-icons/lu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import type { Order } from "@/views/admin/orders";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

interface OrderStatusHistoryProps {
  order: Order;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const statusLabels = {
  pending: "Pendiente",
  processing: "Procesando",
  shipped: "Enviado",
  completed: "Completado",
  cancelled: "Cancelado",
};

export function OrderStatusHistory({
  order,
  open,
  onOpenChange,
}: OrderStatusHistoryProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-CO", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  function getTimeAgoFromBogota(dateString: string): string {
    const now = dayjs().tz("America/Bogota");
    const eventTime = dayjs.utc(dateString).tz("America/Bogota");

    const diffInMinutes = now.diff(eventTime, "minute");
    const diffInHours = now.diff(eventTime, "hour");
    const diffInDays = now.diff(eventTime, "day");

    if (diffInMinutes < 60) {
      return `hace ${diffInMinutes} minuto${diffInMinutes !== 1 ? "s" : ""}`;
    } else if (diffInHours < 24) {
      return `hace ${diffInHours} hora${diffInHours !== 1 ? "s" : ""}`;
    } else {
      return `hace ${diffInDays} día${diffInDays !== 1 ? "s" : ""}`;
    }
  }

  const sortedHistory = [...order.status_logs].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Historial de Estados</DialogTitle>
          <DialogDescription>
            Cambios registrados para la orden #{order.id}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[400px] pr-4">
          <div className="space-y-4">
            {sortedHistory.map((entry, index) => (
              <div key={entry.id} className="relative">
                {/* Línea de conexión del timeline */}
                {index < sortedHistory.length - 1 && (
                  <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-200" />
                )}

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center">
                    {entry.status === "shipped" ? (
                      <LuTruck className="h-5 w-5 text-purple-500" />
                    ) : (
                      <LuClock className="h-5 w-5 text-gray-400" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={`${statusColors[entry.status]}`}>
                        {statusLabels[entry.status]}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        {getTimeAgoFromBogota(entry.created_at)}
                      </span>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 space-y-3 border border-gray-100">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">
                          {formatDate(entry.created_at)}
                        </p>
                        {entry.user?.first_name && (
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <LuUser className="h-3 w-3" />
                            {entry.user?.first_name}
                          </div>
                        )}
                      </div>

                      {entry.message && (
                        <div className="flex items-start gap-2">
                          <LuMessageSquare className="h-4 w-4 text-gray-400 mt-0.5" />
                          <p className="text-sm text-gray-700 whitespace-pre-line">
                            {entry.message}
                          </p>
                        </div>
                      )}

                      {entry.status === "shipped" && entry.tracking_url && (
                        <div className="pt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 text-sm"
                            onClick={() =>
                              window.open(entry.tracking_url!, "_blank")
                            }
                          >
                            <LuExternalLink className="h-3 w-3 mr-1" />
                            Ver información de envío
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {index < sortedHistory.length - 1 && (
                  <Separator className="my-4" />
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
