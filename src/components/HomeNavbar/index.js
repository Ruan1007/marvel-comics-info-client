import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
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
  const [user] = useState(getUser());
  const [color, setColor] = useState('white');
  const history = useHistory();

  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle('nav-open');
  };

  useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 99 ||
        document.body.scrollTop > 99
      ) {
        setWhiteLogo(false);
        setNavbarColor('');
        setColor('#858585');
      } else if (
        document.documentElement.scrollTop < 100 ||
        document.body.scrollTop < 100
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
            <Nav navbar className='mr-auto mt-2 mt-lg-0'>
              <NavItem>
                <NavLink to='/' tag={Link}>
                  Home
                </NavLink>
              </NavItem>
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
            {isAuthenticated() ? (
              <>
                <UncontrolledDropdown className='ml-auto'>
                  <DropdownToggle nav onClick={(e) => e.preventDefault()}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center'
                      }}>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-end'
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
                        style={{
                          border: '2px solid #E62429',
                          borderRadius: '50%',
                          marginLeft: '10px'
                        }}>
                        <img
                          alt='...'
                          src={user.image ? user.image : defaultUser}
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
                    <NavLink to='/profile' tag={Link}>
                      <DropdownItem className='nav-item'>Profile</DropdownItem>
                    </NavLink>
                    <DropdownItem divider tag='li' />
                    <NavLink to='/rated-comics' tag={Link}>
                      <DropdownItem className='nav-item'>
                        My rated comics
                      </DropdownItem>
                    </NavLink>
                    <NavLink to='/rated-characters' tag={Link}>
                      <DropdownItem className='nav-item'>
                        My rated characters
                      </DropdownItem>
                    </NavLink>
                    <NavLink to='/my-favorites' tag={Link}>
                      <DropdownItem className='nav-item'>
                        My favorites
                      </DropdownItem>
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
                  marginLeft: '95px'
                }}>
                <Button
                  className='btn-round mr-1 btn btn-default'
                  href='/login'>
                  Login
                </Button>
                <Button
                  className='btn-round mr-1 btn btn-default'
                  href='/register'>
                  Register
                </Button>
              </div>
            )}
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}
