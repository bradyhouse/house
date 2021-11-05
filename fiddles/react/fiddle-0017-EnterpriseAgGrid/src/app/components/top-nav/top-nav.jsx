import './top-nav.css';

const TopNav = () => {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-success navbar-top">
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">

          </ul>
          <ul className="navbar-nav my-2 my-lg-0">
            <li className="nav-item">
              <a className="nav-link custom-nav-link" rel="noreferrer" alt="Fork me on GitHub" target="_blank"
                href="https://github.com/bradyhouse/house/tree/master/fiddles/react/fiddle-0017-EnterpriseAgGrid">
                Fork Me On Github
              </a>
            </li>
          </ul>
        </div>
      </nav>
  );
};

export default TopNav;
