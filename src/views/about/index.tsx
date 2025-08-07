export default function AboutPage() {
  const images = [
    "/images/foto1.png",
    "/images/foto2.png",
    "/images/foto3.png",
  ];

  return (
    <div className="min-h-screen">
      {/* Sección Visual y Encabezado */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center text-center space-y-10">
            {/* Galería de Imágenes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 w-full max-w-5xl mb-40">
              {images.map((src, index) => (
              <div
                key={index}
                className="flex items-center justify-center h-[350px] w-full overflow-hidden"
              >
                <img
                src={src}
                alt={`Imagen ${index + 1}`}
                loading="lazy"
                fetchpriority={index === 0 ? "high" : "low"}
                className="object-contain w-full h-full max-h-[350px] transition-transform duration-300 hover:scale-[1.02]"
                />
              </div>
              ))}
            </div>

            {/* Título */}
            <h2 className="text-3xl md:text-4xl font-semibold italic font-subtitulo">
              Nosotros
            </h2>

            {/* Párrafos */}
            <div className="text-base md:text-lg max-w-4xl text-gray-700 space-y-5 text-justify font-parrafo px-2 md:px-0 mb-20">
              <p>
                NURAE nació de una idea simple: crear accesorios que no solo adornan, sino que inspiren. Diseñamos con símbolos que resuenan contigo: frutos y formas naturales que hablan de tu poder, tu esencia, tu brillo.
              </p>
              <p>
                Cada pieza es un pequeño recordatorio de tu luz interior. Queremos que te sientas elegante, segura y auténtica, sin renunciar a lo moderno ni a la cercanía con lo que te identifica.
              </p>

              <p>
                Seremos la marca que acompaña a mujeres conscientes y creativas en su día a día, con lujo asequible y propósito. Queremos que NURAE suene a historia, a confianza, a identidad personal.
              </p>

              <p className="font-bold italic">Nuestros valores</p>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Autenticidad:</strong> cada diseño nace del alma.</li>
                <li><strong>Calidad consciente:</strong> aleación con baño en rodio, sin sacrificar resistencia ni brillo.</li>
                <li><strong>Empoderamiento femenino:</strong> accesorios que acompañan tu energía.</li>
                <li><strong>Estilo accesible y emocional:</strong> elegancia sin exclusión, con propósito simbólico.</li>
              </ul>

              <p>
                NURAE nace del deseo profundo de recordarle a cada mujer que ya es suficiente, que es bella tal como es.
              </p>

              <p>
                Inspirada en los detalles que hacen único a cada ser, NURAE transforma accesorios en afirmaciones de elegancia, seguridad y esencia. Desde una delicada hebilla que adorna el cabello hasta un denario que acompaña su camino con propósito, cada pieza está diseñada para que la mujer que la elija sienta que brilla por dentro y por fuera.
              </p>

              <p>
                Nuestra propuesta no está en seguir tendencias vacías, sino en crear objetos que conecten con la autenticidad y feminidad de cada mujer. Nos mueve el detalle, la energía con la que se porta un accesorio, el poder de mirarte al espejo y reconocerte fuerte, hermosa, real.
              </p>

              <p>
                NURAE es más que accesorios. Es una afirmación silenciosa que se lleva con elegancia. Es belleza que sostiene, acompaña y afirma: <span className="italic">"Estoy aquí. Y soy suficiente."</span>
              </p>

              <p>
                Nuestros diseños son atemporales, delicadamente seleccionados para adaptarse a tu autenticidad. Porque sabemos que trabajas, sueñas, cuidas, caes, lideras, amas... y nunca dejas de ser tú misma.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Promesa */}
      <section className="py-16 md:py-24 text-center bg-[#ebebeb]">
        <div className="container px-4 md:px-6 mx-auto space-y-6 md:space-y-8">
          <h2 className="text-3xl md:text-5xl font-normal text-gray-900 font-parrafo mb-4">
            Nuestra promesa
          </h2>
          <p className="text-2xl md:text-5xl italic text-[var(--color-amarillo)] font-subtitulo">
            De Calidad
          </p>
          <p className="text-base md:text-lg max-w-3xl mx-auto text-gray-800 leading-7 font-parrafo px-2 md:px-0">
            Cuidamos cada detalle con obsesión, porque nada en nuestras piezas es casual. Cada forma,
            textura y color está pensado para armonizar contigo. Creemos firmemente que la elegancia no
            debe ser costosa, por eso diseñamos accesorios que reflejan lujo sin exigir sacrificios. Y más
            allá de modas pasajeras, apostamos por la autenticidad: creamos piezas con alma, pensadas para
            mujeres que se expresan con intención y estilo propio.
          </p>
        </div>
      </section>
    </div>
  );
}
