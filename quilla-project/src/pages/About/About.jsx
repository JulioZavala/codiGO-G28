const About = () => {
  return (
    <div>
      <div>
        <picture>
          {/* Regla para tablets y escritorio (md = 768px en Tailwind).
            Si la pantalla es ancha, usa esta imagen.
          */}
          <source media="(min-width: 768px)" srcSet="/images/header_d1.png" />
          <img
            src="/images/header_m1.png"
            alt=""
            className="w-full h-full object-cover opacity-90"
          />
        </picture>
      </div>
      <h1>About</h1>
      <p>This is the about page</p>
    </div>
  );
};

export default About;
