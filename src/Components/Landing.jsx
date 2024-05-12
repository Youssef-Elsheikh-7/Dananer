import hero from "../images/hero-banner.png";
function Landing() {
  return (
    <section className="section hero" aria-label="hero">
      <div className="container" style={{ position: "relative" }}>
        <div className="hero-content">
          <h1 className="h2 hero-title">
            Digital & international currencies and gold prices
          </h1>

          <p className="hero-text">
            Learn about the prices and statistics of global and digital
            currencies and gold prices
          </p>

          <a href="#" className="btn btn-primary">
            Get started now
          </a>
        </div>

        <figure className="hero-banner">
          <img
            src={hero}
            width="570"
            height="448"
            alt="hero banner"
            className="w-100"
          />
        </figure>
      </div>
    </section>
  );
}

export default Landing;
