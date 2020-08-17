import React from 'react';
import {Link} from 'react-router-dom';
// nodejs library that concatenates strings
import classnames from 'classnames';
import logo from 'assets/img/home/icon_iron_man.png';
import {Navbar, NavItem, NavLink, Nav, Container, Collapse} from 'reactstrap';

export default function HomeNavbar() {
  const [bodyClick, setBodyClick] = React.useState(false);
  const [whiteLogo, setWhiteLogo] = React.useState(true);
  const [navbarColor, setNavbarColor] = React.useState('navbar-transparent');
  const [navbarCollapse, setNavbarCollapse] = React.useState(false);

  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle('nav-open');
  };

  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 299 ||
        document.body.scrollTop > 299
      ) {
        setWhiteLogo(false);
        setNavbarColor('');
      } else if (
        document.documentElement.scrollTop < 300 ||
        document.body.scrollTop < 300
      ) {
        setWhiteLogo(true);
        setNavbarColor('navbar-transparent');
      }
    };

    window.addEventListener('scroll', updateNavbarColor);

    return function cleanup() {
      window.removeEventListener('scroll', updateNavbarColor);
    };
  });

  return (
    <>
      {bodyClick ? (
        <div
          id='bodyClick'
          onClick={() => {
            document.documentElement.classList.toggle('nav-open');
            setBodyClick(false);
          }}
        />
      ) : null}
      <Navbar
        className={classnames('fixed-top', navbarColor)}
        color-on-scroll='300'
        expand='lg'>
        <Container>
          <div className='navbar-translate'>
            <a href='/'>
              {whiteLogo ? (
                <img
                  style={{
                    maxWidth: '45px',
                    padding: '0',
                    filter: 'invert(100%)'
                  }}
                  src={logo}
                  alt='...'
                />
              ) : (
                <img
                  style={{maxWidth: '45px', padding: '0'}}
                  src={logo}
                  alt='...'
                />
              )}
            </a>

            <button
              className={classnames('navbar-toggler navbar-toggler', {
                toggled: navbarCollapse
              })}
              onClick={toggleNavbarCollapse}>
              <span className='navbar-toggler-bar bar1' />
              <span className='navbar-toggler-bar bar2' />
              <span className='navbar-toggler-bar bar3' />
            </button>
          </div>
          <Collapse
            className='justify-content-end'
            navbar
            isOpen={navbarCollapse}>
            <button
              className='navbar-toggler'
              id='navbarNavDropdown'
              type='button'
              onClick={() => {
                document.documentElement.classList.toggle('nav-open');
                setBodyClick(true);
              }}>
              <span className='navbar-toggler-icon' />
            </button>
            <Nav navbar>
              <NavItem>
                <NavLink to='/comics' tag={Link}>
                  Comics
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink to='/characters' tag={Link}>
                  Characters
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}
