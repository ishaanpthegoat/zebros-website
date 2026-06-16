export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-logo">
        <img className="footer-logo-img" src="/img/logo-mark.png" alt="Zebros logo" />
        <span>Zebros, Team 30415</span>
      </div>
      <p>FIRST Tech Challenge, Cary, North Carolina</p>
      <div className="footer-contact">
        <p>1408 Boulderstone Way, Cary, NC 27519</p>
        <p>(919) 650-6333</p>
        <p><a href="mailto:infocary@zebrarobotics.com">infocary@zebrarobotics.com</a></p>
      </div>
      <p style={{ marginTop: "1.5rem", fontSize: "0.8rem", opacity: 0.6 }}>© {year} Team 30415 Zebros</p>
    </footer>
  );
}
