import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addressSchema,
  type AddressFormValues,
} from "@/schemas/addresses/createAddressSchema";
import { useColombiaData } from "@/lib/useColombiaData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useEffect, useMemo, useRef } from "react";

interface Props {
  onSubmit: (data: AddressFormValues) => void;
  defaultValues?: Partial<AddressFormValues>;
}

const normalize = (s: string) =>
  s ? s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim() : "";


export function AddressForm({ onSubmit, defaultValues }: Props) {
  const { data: colombia, loading: loadingCo, error: errorCo } = useColombiaData();
  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      name: "",
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      company: "",
      document_type: "",
      document_number: "",
      fiscal_name: "",
      street_address: "",
      apartment: "",
      city: "",
      state: "",
      postal_code: "",
      country: "",
      is_default: false,
      notes: "",
      ...defaultValues,
    },
  });

  const selectedState: string = useWatch({ control: form.control, name: "state" }) || "";
  const selectedCity: string = useWatch({ control: form.control, name: "city" }) || "";

  // Opciones de departamentos
  const departamentos = useMemo(
    () => colombia.map((d) => d.departamento),
    [colombia]
  );

  // Ciudades del departamento seleccionado
  const ciudadesDelDepto = useMemo(() => {
    const dpto = colombia.find(
      (d) => d.departamento.toLowerCase() === selectedState.toLowerCase()
    );
    return dpto ? dpto.ciudades : [];
  }, [colombia, selectedState]);

  useEffect(() => {
    if (loadingCo || !selectedState) return;
    const matchDep = departamentos.find((dep) => normalize(dep) === normalize(selectedState));
    if (matchDep && matchDep !== selectedState) {
      form.setValue("state", matchDep, { shouldDirty: false, shouldValidate: false });
    }
  }, [loadingCo, departamentos, selectedState, form]);

  const prevStateRef = useRef<string>("");
  useEffect(() => {
    if (loadingCo) return;

    const prevState = prevStateRef.current;
    const deptoCambio = prevState && prevState !== selectedState;
    prevStateRef.current = selectedState;

    // Si no hay departamento, no hay ciudades válidas
    if (!selectedState) {
      form.setValue("city", "", { shouldDirty: false, shouldValidate: false });
      return;
    }

    // Si hay ciudad seleccionada, intenta mapearla a la versión oficial (case/tildes)
    if (selectedCity) {
      const matchCity = ciudadesDelDepto.find((c) => normalize(c) === normalize(selectedCity));
      if (matchCity) {
        if (matchCity !== selectedCity) {
          form.setValue("city", matchCity, { shouldDirty: false, shouldValidate: false });
        }
      } else if (deptoCambio) {
        // Solo limpiar si el usuario cambió el dpto y la ciudad ya no pertenece
        form.setValue("city", "", { shouldDirty: true, shouldValidate: true });
      }
    }
  }, [loadingCo, selectedState, selectedCity, ciudadesDelDepto, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

        {/* SECCIÓN 1: INFORMACIÓN DE LA PERSONA */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Información del titular</h2>
          <Separator />

          <div className="grid md:grid-cols-2 gap-4">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre de referencia</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: Casa, Oficina, Cliente X" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="company"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Empresa (opcional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre de la empresa" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="first_name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: Juan" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="last_name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apellido</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: Pérez" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="correo@ejemplo.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="phone"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono</FormLabel>
                  <FormControl>
                    <Input placeholder="+57 300 1234567" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <FormField
              name="document_type"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de documento</FormLabel>
                  <Select value={field.value ?? ""} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un tipo..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="CC">Cédula (CC)</SelectItem>
                      <SelectItem value="NIT">NIT</SelectItem>
                      <SelectItem value="RUC">RUC</SelectItem>
                      <SelectItem value="RFC">RFC</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="document_number"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de documento</FormLabel>
                  <FormControl>
                    <Input placeholder="1234567890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="fiscal_name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Razón social</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre legal completo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* SECCIÓN 2: INFORMACIÓN DE ENVÍO */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Dirección de envío</h2>
          <Separator />

          <div className="grid md:grid-cols-2 gap-4">
            <FormField
              name="street_address"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dirección</FormLabel>
                  <FormControl>
                    <Input placeholder="Calle 123 #45-67" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="apartment"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apartamento (opcional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Apto 101" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Departamento / Estado */}
            <FormField
              name="state"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Departamento / Estado</FormLabel>
                  <FormControl>
                    <Select
                      disabled={loadingCo || !!errorCo}
                      value={field.value || undefined}
                      onValueChange={(val) => {
                        // set y dispara onChange para RHF
                        field.onChange(val);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={loadingCo ? "Cargando..." : "Selecciona un departamento"} />
                      </SelectTrigger>
                      <SelectContent>
                        {departamentos.map((dep) => (
                          <SelectItem key={dep} value={dep}>{dep}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  {errorCo && <p className="text-xs text-red-600">No se pudo cargar la lista. Puedes intentar de nuevo.</p>}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Ciudad / Municipio */}
            <FormField
              name="city"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ciudad / Municipio</FormLabel>
                  <FormControl>
                    <Select
                      disabled={!selectedState || ciudadesDelDepto.length === 0}
                      value={field.value || undefined}
                      onValueChange={(val) => field.onChange(val)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={!selectedState ? "Selecciona un departamento primero" : "Selecciona la ciudad"} />
                      </SelectTrigger>
                      <SelectContent>
                        {ciudadesDelDepto.map((city) => (
                          <SelectItem key={city} value={city}>{city}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="postal_code"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Código Postal</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: 050021" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="country"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>País</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: Colombia" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            name="is_default"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-row items-center gap-2">
                <FormControl>
                  <Checkbox
                    checked={!!field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Usar como dirección principal</FormLabel>
              </FormItem>
            )}
          />

          <FormField
            name="notes"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notas adicionales</FormLabel>
                <FormControl>
                  <Textarea placeholder="Instrucciones, puntos de referencia..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="border bg-black text-white rounded-none hover:opacity-90">Guardar Dirección</Button>
      </form>
    </Form>
  );
}
