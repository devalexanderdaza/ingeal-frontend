// Create function component
const FooterComponent = () => {

  // Get current year
  const currentYear: number = new Date().getFullYear();

  return (
    <footer className="footer fixed-bottom">
      <div className="row">
        <div className="col-md-12">
          <p className="text-center">Copyrigth &copy; { currentYear } - <a href="https://www.alexanderdaza.com" target="_blank">Alexander Daza</a> - All rights reserved
            <br />
            <a href="https://github.com/devalexanderdaza" target="_blank">Github</a> | <a href="https://www.linkedin.com/in/devalexanderdaza/" target="_blank">LinkedIn</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;