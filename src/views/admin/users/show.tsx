import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "@/hooks/user/useUser";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LuArrowLeft } from "react-icons/lu";
import { Separator } from "@/components/ui/separator";

export default function ShowUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const userId = Number(id);

  const { data: user, isLoading } = useUser(userId);

  if (isLoading) return <p>Cargando usuario...</p>;
  if (!user) return <p>Usuario no encontrado.</p>;

  const cartSubtotal = user.cart?.products.reduce(
    (acc, product) => acc + Number(product.price) * product.pivot.quantity,
    0
  );

  return (
    <div className="container mx-auto p-6 space-y-8">
      <Button variant="outline" size="icon" onClick={() => navigate("/admin/users")}>
        <LuArrowLeft className="h-4 w-4" />
      </Button>

      {/* 👤 DATOS DE USUARIO */}
      <Card>
        <CardHeader>
          <CardTitle>{user.first_name} {user.last_name || ""}</CardTitle>
          <CardDescription>{user.email}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <p><strong>Teléfono:</strong> {user.phone || "No especificado"}</p>
          <p><strong>Género:</strong> {user.gender || "No especificado"}</p>
          <p><strong>Rol:</strong> {user.role}</p>
          <p><strong>Verificado:</strong> {user.is_verified ? "Sí" : "No"}</p>
          <p><strong>Creado:</strong> {new Date(user.created_at).toLocaleString()}</p>
          {user.profile_image_url && (
            <img
              src={`https://nurae-api.alernal.com.co/${user.profile_image_url}`}
              alt={`${user.first_name} profile`}
              className="w-24 h-24 object-cover rounded mt-2"
            />
          )}
        </CardContent>
      </Card>

      <Separator />

      {/* 🏠 DIRECCIONES */}
      <Card>
        <CardHeader>
          <CardTitle>Direcciones</CardTitle>
        </CardHeader>
        <CardContent>
          {user.addresses.length === 0 ? (
            <p>Sin direcciones.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Ciudad</TableHead>
                  <TableHead>Dirección</TableHead>
                  <TableHead>Teléfono</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {user.addresses.map((address) => (
                  <TableRow key={address.id}>
                    <TableCell>{address.name}</TableCell>
                    <TableCell>{address.city}, {address.state}</TableCell>
                    <TableCell>{address.street_address}</TableCell>
                    <TableCell>{address.phone}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Separator />

      {/* 🛒 CARRITO */}
      <Card>
        <CardHeader>
          <CardTitle>Carrito</CardTitle>
          {user.cart && (
            <CardDescription>
              Última actualización: {new Date(user.cart.created_at).toLocaleString()}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {user.cart && user.cart.products.length > 0 ? (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Imagen</TableHead>
                    <TableHead>Producto</TableHead>
                    <TableHead>Cantidad</TableHead>
                    <TableHead>Precio Unitario</TableHead>
                    <TableHead>Subtotal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {user.cart.products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        {product.images.length > 0 && (
                          <img
                            src={`https://nurae-api.alernal.com.co/${product.images[0].url}`}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                        )}
                      </TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.pivot.quantity}</TableCell>
                      <TableCell>${product.price}</TableCell>
                      <TableCell>${(Number(product.price) * product.pivot.quantity).toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="text-right mt-4">
                <strong>Total carrito:</strong> ${cartSubtotal.toFixed(2)}
              </div>
            </>
          ) : (
            <p>Sin productos en el carrito.</p>
          )}
        </CardContent>
      </Card>

      <Separator />

      {/* 📦 ÓRDENES */}
      <Card>
        <CardHeader>
          <CardTitle>Órdenes</CardTitle>
        </CardHeader>
        <CardContent>
          {user.orders.length === 0 ? (
            <p>Este usuario no ha realizado órdenes.</p>
          ) : (
            user.orders.map((order) => (
              <Card key={order.id} className="p-4 mb-4 space-y-2">
                <p><strong>Estado:</strong> {order.status} — <strong>Pago:</strong> {order.payment_status}</p>
                <p><strong>Total:</strong> ${order.total}</p>
                <p><strong>Dirección:</strong> {order.address.street_address}, {order.address.city}</p>
                <p><strong>Creado:</strong> {new Date(order.created_at).toLocaleString()}</p>
                <Separator className="my-2" />

                <h4 className="font-semibold">Historial de cambios de estado:</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Estado</TableHead>
                      <TableHead>Mensaje</TableHead>
                      <TableHead>Usuario que actualizó</TableHead>
                      <TableHead>Fecha</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {order.status_logs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell>{log.status}</TableCell>
                        <TableCell>{log.message}</TableCell>
                        <TableCell>{log.user ? `${log.user.first_name} ${log.user.last_name || ""}` : "Sistema"}</TableCell>
                        <TableCell>{new Date(log.created_at).toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
