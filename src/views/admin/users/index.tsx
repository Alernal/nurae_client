import { useUsers } from "@/hooks/user/useUsers";
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
import { LuEye } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

export default function AdminUsers() {
  const { data: users = [], isLoading, isError } = useUsers();

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Usuarios</h1>
          <p className="text-gray-500 text-sm">
            Administración general de usuarios registrados
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-gray-800">Listado</CardTitle>
          <CardDescription className="text-gray-500 text-sm">
            {users.length} usuario(s) registrado(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-center text-gray-500 py-8">Cargando...</p>
          ) : isError ? (
            <p className="text-center text-red-600 py-8">
              Error al cargar usuarios
            </p>
          ) : (
            <div className="border border-gray-200">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Rol</TableHead>
                    <TableHead>Verificado</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium text-gray-800">#{user.id}</TableCell>
                      <TableCell className="text-gray-800">
                        {user.first_name} {user.last_name ?? ""}
                        <div className="text-xs text-gray-500">
                          {user.phone ?? "Sin teléfono"}
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-800">{user.email}</TableCell>
                      <TableCell>
                        <Badge className="bg-blue-100 text-blue-700">{user.role}</Badge>
                      </TableCell>
                      <TableCell>
                        {user.is_verified ? (
                          <Badge className="bg-green-100 text-green-700">Sí</Badge>
                        ) : (
                          <Badge className="bg-gray-100 text-gray-600">No</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {user.status ? (
                          <Badge className="bg-green-100 text-green-700">Activo</Badge>
                        ) : (
                          <Badge className="bg-red-100 text-red-700">Inactivo</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button asChild variant="ghost" size="icon">
                          <Link to={`/admin/users/${user.id}`}>
                            <LuEye className="w-4 h-4" />
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {users.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No hay usuarios registrados.
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
