import HeroBanner from "@/components/HeroBanner"; // Ajusta la ruta según tu estructura

const Home = () => {
  return (
    <main>
      {/* SECCIÓN 1: HERO BANNER */}
      <HeroBanner
        // Reemplaza esta URL con una foto de campaña real de alta calidad
        desktopImageSrc="/images/hero_verano_desktop.png"
        mobileImageSrc="/images/hero_verano_mobile.png"
        title="Colección Verano 2026"
        subtitle="Descubre la comodidad del cuero en cada detalle."
        ctaLink="/novedades"
        ctaText="Explorar"
        // Puedes usar h-[85vh] si quieres que se vea un poco de la siguiente sección
        height="h-screen md:h-[90vh]"
      />

      {/* SECCIÓN 2: LINKS PRINCIPALES (Hombre/Mujer - Estilo Renzo Costa) */}
      <section className="flex flex-col lg:flex-row justify-around gap-3 lg:gap-5 px-3 lg:px-5 py-3 lg:py-5 bg-gray-50 text-center font-bold text-2xl tracking-widest uppercase">
        <div className="w-full">
          <img
            src="./src/assets/images/mujer_L.png"
            alt="img_mujer"
            className="w-full"
          />
        </div>
        <div className="w-full">
          <img
            src="./src/assets/images/hombre_L.png"
            alt="img_hombre"
            className="w-full"
          />
        </div>
      </section>

      {/* SECCIÓN 3: NUESTROS FAVORITOS */}
      <section className="py-20 text-center font-bold text-2xl tracking-widest uppercase">
        [grilla de favoritos]
      </section>
    </main>
  );
};

export default Home;
