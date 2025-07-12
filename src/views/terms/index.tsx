export default function Terms() {
  return (
    <div className="container mx-auto p-6 space-y-8 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">
        Política de Tratamiento de Datos Personales NURAE
      </h1>

      <section>
        <h2 className="text-xl font-semibold">
          1. Identificación del responsable del tratamiento
        </h2>
        <p>
          <strong>Nombre:</strong> NURAE <br />
          <strong>Correo de contacto:</strong> contacto@nurae.co <br />
          <strong>Ciudad:</strong> Colombia
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">
          2. Finalidad del tratamiento de datos
        </h2>
        <p className="font-paragraph">
          Los datos personales recolectados por NURAE serán utilizados para:
        </p>
        <ul className="list-disc list-inside mt-2 space-y-1 font-paragraph">
          <li>Procesar y gestionar pedidos.</li>
          <li>Realizar envíos y notificaciones.</li>
          <li>Comunicar promociones, novedades y contenidos de interés.</li>
          <li>Gestionar el servicio postventa y atención al cliente.</li>
          <li>Cumplir obligaciones legales y contractuales.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">
          3. Derechos del titular de los datos
        </h2>
        <p className="font-paragraph">Los titulares de los datos personales tienen derecho a:</p>
        <ul className="list-disc list-inside font-paragraph mt-2 space-y-1">
          <li>Conocer, actualizar y rectificar sus datos.</li>
          <li>Solicitar prueba de la autorización otorgada.</li>
          <li>Ser informados sobre el uso que se les ha dado a sus datos.</li>
          <li>
            Revocar la autorización y/o solicitar la supresión del dato cuando
            no se respeten los principios, derechos y garantías legales.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">4. Autorización del titular</h2>
        <p className="font-paragraph">
          NURAE obtiene la autorización de los titulares mediante medios
          digitales, escritos o verbales, antes de recolectar cualquier
          información personal.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">
          5. Confidencialidad y seguridad
        </h2>
        <p className="font-paragraph">
          Los datos personales recolectados serán tratados con estricta
          confidencialidad. NURAE cuenta con medidas técnicas, humanas y
          administrativas razonables para proteger la información.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">
          6. Transmisión y transferencia de datos
        </h2>
        <p className="font-paragraph">
          Los datos podrán ser compartidos con terceros que colaboren con NURAE
          en la prestación de sus servicios, quienes estarán sujetos a deberes
          de confidencialidad y seguridad.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">
          7. Modificaciones a la política
        </h2>
        <p className="font-paragraph">
          NURAE podrá modificar esta política en cualquier momento. Las
          modificaciones serán informadas a través de nuestras plataformas
          oficiales.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">
          8. Canales de contacto para consultas y reclamos
        </h2>
        <p className="font-paragraph">
          Los titulares pueden ejercer sus derechos a través del correo{" "}
          <a
            href="mailto:contacto@nurae.co"
            className="text-blue-600 underline"
          >
            contacto@nurae.co
          </a>
          , donde recibirán atención dentro de los plazos legales.
        </p>
      </section>

      <p className="italic text-sm mt-4">
        Fecha de entrada en vigencia: 2025
      </p>

      <p className="text-center mt-6 font-medium">
        Con tu autorización, en NURAE tratamos tus datos con respeto, cuidado y
        compromiso con tu privacidad.
      </p>
    </div>
  );
}
