import type React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LuArrowLeft,
  LuCreditCard,
  LuTruck,
  LuShield,
  LuBadgeCheck,
  LuFileText,
} from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function CheckoutPage() {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    cedula: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
    paymentMethod: "",
  });

  const [acceptedPolicies, setAcceptedPolicies] = useState({
    dataPolicy: false,
    termsConditions: false,
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!acceptedPolicies.dataPolicy || !acceptedPolicies.termsConditions) {
      alert("Debes aceptar las políticas para continuar");
      return;
    }

    if (!formData.paymentMethod) {
      alert("Selecciona un método de pago");
      return;
    }

    alert("Redirigiendo a la pasarela de pago...");
  };

  const isFormValid = () => {
    return (
      formData.email &&
      formData.firstName &&
      formData.lastName &&
      formData.cedula &&
      formData.address &&
      formData.city &&
      formData.phone &&
      formData.paymentMethod &&
      acceptedPolicies.dataPolicy &&
      acceptedPolicies.termsConditions
    );
  };

  return (
    <div>
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="hover:bg-pink-50">
              <LuArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-4xl md:text-5xl font-serif font-bold bg-luxury-gradient bg-clip-text text-transparent">
            Checkout
          </h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Checkout Form */}
            <div className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm border-pink-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LuCreditCard className="h-5 w-5" />
                    Información Personal
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      placeholder="tu@email.com"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">Nombre *</Label>
                      <Input
                        id="firstName"
                        required
                        value={formData.firstName}
                        onChange={(e) =>
                          handleInputChange("firstName", e.target.value)
                        }
                        placeholder="Nombre"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Apellido *</Label>
                      <Input
                        id="lastName"
                        required
                        value={formData.lastName}
                        onChange={(e) =>
                          handleInputChange("lastName", e.target.value)
                        }
                        placeholder="Apellido"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="cedula">Número de Cédula *</Label>
                    <Input
                      id="cedula"
                      required
                      value={formData.cedula}
                      onChange={(e) =>
                        handleInputChange("cedula", e.target.value)
                      }
                      placeholder="12345678"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-pink-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LuTruck className="h-5 w-5" />
                    Dirección de Envío
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="address">Dirección Completa *</Label>
                    <Input
                      id="address"
                      required
                      value={formData.address}
                      onChange={(e) =>
                        handleInputChange("address", e.target.value)
                      }
                      placeholder="Calle 123 #45-67, Apartamento 101"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">Ciudad *</Label>
                      <Input
                        id="city"
                        required
                        value={formData.city}
                        onChange={(e) =>
                          handleInputChange("city", e.target.value)
                        }
                        placeholder="Bogotá"
                      />
                    </div>
                    <div>
                      <Label htmlFor="postalCode">Código Postal</Label>
                      <Input
                        id="postalCode"
                        value={formData.postalCode}
                        onChange={(e) =>
                          handleInputChange("postalCode", e.target.value)
                        }
                        placeholder="110111"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="phone">Teléfono *</Label>
                    <Input
                      id="phone"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      placeholder="+57 300 123 4567"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-pink-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LuShield className="h-5 w-5" />
                    Método de Pago
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <RadioGroup
                    value={formData.paymentMethod}
                    onValueChange={(value) =>
                      handleInputChange("paymentMethod", value)
                    }
                  >
                    <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-pink-50">
                      <RadioGroupItem value="mercadopago" id="mercadopago" />
                      <Label
                        htmlFor="mercadopago"
                        className="flex-1 cursor-pointer"
                      >
                        <div className="flex items-center justify-between">
                          <span>MercadoPago</span>
                          <div className="flex gap-1">
                            <div className="h-6 w-10 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                              VISA
                            </div>
                            <div className="h-6 w-10 bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold">
                              MC
                            </div>
                          </div>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-pink-50">
                      <RadioGroupItem value="wompi" id="wompi" />
                      <Label htmlFor="wompi" className="flex-1 cursor-pointer">
                        <div className="flex items-center justify-between">
                          <span>Wompi</span>
                          <div className="flex gap-1">
                            <div className="h-6 w-10 bg-green-600 rounded text-white text-xs flex items-center justify-center font-bold">
                              PSE
                            </div>
                            <div className="h-6 w-10 bg-purple-600 rounded text-white text-xs flex items-center justify-center font-bold">
                              NEQUI
                            </div>
                          </div>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-pink-50">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label htmlFor="paypal" className="flex-1 cursor-pointer">
                        <div className="flex items-center justify-between">
                          <span>PayPal</span>
                          <div className="h-6 w-16 bg-blue-700 rounded text-white text-xs flex items-center justify-center font-bold">
                            PayPal
                          </div>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-pink-50">
                      <RadioGroupItem
                        value="contraentrega"
                        id="contraentrega"
                      />
                      <Label
                        htmlFor="contraentrega"
                        className="flex-1 cursor-pointer"
                      >
                        <span>Pago Contra Entrega</span>
                        <p className="text-sm text-gray-500 mt-1">
                          Paga cuando recibas tu pedido
                        </p>
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Políticas y Términos */}
              <Card className="bg-white/80 backdrop-blur-sm border-pink-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LuFileText className="h-5 w-5" />
                    Políticas y Términos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="dataPolicy"
                      checked={acceptedPolicies.dataPolicy}
                      onCheckedChange={(checked) =>
                        setAcceptedPolicies((prev) => ({
                          ...prev,
                          dataPolicy: checked as boolean,
                        }))
                      }
                    />
                    <Label
                      htmlFor="dataPolicy"
                      className="text-sm leading-relaxed cursor-pointer"
                    >
                      Acepto la{" "}
                      <Link
                        to="/privacy-policy"
                        className="text-primary hover:underline font-medium"
                      >
                        Política de Tratamiento de Datos Personales
                      </Link>{" "}
                      y autorizo el tratamiento de mis datos personales para el
                      procesamiento de mi pedido y comunicaciones comerciales. *
                    </Label>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="termsConditions"
                      checked={acceptedPolicies.termsConditions}
                      onCheckedChange={(checked) =>
                        setAcceptedPolicies((prev) => ({
                          ...prev,
                          termsConditions: checked as boolean,
                        }))
                      }
                    />
                    <Label
                      htmlFor="termsConditions"
                      className="text-sm leading-relaxed cursor-pointer"
                    >
                      Acepto los{" "}
                      <Link
                        to="/terms"
                        className="text-primary hover:underline font-medium"
                      >
                        Términos y Condiciones
                      </Link>{" "}
                      de compra y las políticas de envío y devoluciones. *
                    </Label>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm border-pink-100">
                <CardHeader>
                  <CardTitle>Resumen del Pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>$480.000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Envío</span>
                      <span className="text-green-600">Gratis</span>
                    </div>
                    <div className="flex justify-between">
                      <span>IVA (19%)</span>
                      <span>$91.200</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>$571.200</span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={!isFormValid()}
                    className="w-full bg-luxury-gradient hover:opacity-90 text-white h-12 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <LuBadgeCheck className="mr-2 h-5 w-5" />
                    Proceder al Pago
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    Serás redirigido a la pasarela de pago segura para completar
                    tu compra
                  </p>
                </CardContent>
              </Card>

              {/* Security Info */}
              <Card className="bg-white/80 backdrop-blur-sm border-pink-100">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <LuShield className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">Compra 100% Segura</p>
                      <p className="text-xs">
                        Tus datos están protegidos con encriptación SSL
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
