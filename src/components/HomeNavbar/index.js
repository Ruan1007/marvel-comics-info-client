import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
// nodejs library that concatenates strings
import classnames from 'classnames';
import defaultUser from 'assets/img/default_user.jpg';
import logo from 'assets/img/home/icon_iron_man.png';
import {
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Collapse,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown
} from 'reactstrap';
import {isAuthenticated, getUser} from 'services/auth';
import {logout} from 'services/auth';

export default function HomeNavbar() {
  const [bodyClick, setBodyClick] = useState(false);
  const [whiteLogo, setWhiteLogo] = useState(true);
  const [navbarColor, setNavbarColor] = useState('navbar-transparent');
  const [navbarCollapse, setNavbarCollapse] = useState(false);
  const [user, setUser] = useState(getUser());
  const [color, setColor] = useState('white');
  const history = useHistory();

  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle('nav-open');
  };

  useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 299 ||
        document.body.scrollTop > 299
      ) {
        setWhiteLogo(false);
        setNavbarColor('');
        setColor('#858585');
      } else if (
        document.documentElement.scrollTop < 300 ||
        document.body.scrollTop < 300
      ) {
        setWhiteLogo(true);
        setNavbarColor('navbar-transparent');
        setColor('white');
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
        {isAuthenticated() ? (
          <>
            <UncontrolledDropdown>
              <DropdownToggle nav onClick={(e) => e.preventDefault()}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginRight: '30px'
                  }}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-end',
                      marginRight: '16px'
                    }}>
                    <strong
                      style={{
                        color: `${color}`,
                        fontSize: '16px',
                        fontWeight: '500'
                      }}>
                      {user.name}
                    </strong>
                  </div>
                  <div
                    style={{border: '2px solid #E62429', borderRadius: '50%'}}>
                    <img
                      src={defaultUser}
                      style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '50%'
                      }}
                    />
                  </div>
                </div>
              </DropdownToggle>
              <DropdownMenu className='dropdown-navbar' right tag='ul'>
                <NavLink tag='li'>
                  <DropdownItem className='nav-item'>Profile</DropdownItem>
                </NavLink>
                <DropdownItem divider tag='li' />
                <NavLink tag='li'>
                  <DropdownItem
                    className='nav-item'
                    onClick={(e) => {
                      logout();
                      history.push('/');
                    }}>
                    Log out
                  </DropdownItem>
                </NavLink>
              </DropdownMenu>
            </UncontrolledDropdown>
          </>
        ) : (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginRight: '30px',
              marginLeft: '95px'
            }}>
            <Button className='btn-round mr-1 btn btn-default' href='/login'>
              Login
            </Button>
            <Button className='btn-round mr-1 btn btn-default' href='/register'>
              Register
            </Button>
          </div>
        )}
      </Navbar>
    </>
  );
}
