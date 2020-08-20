import React from 'react';
import HomeNavbar from 'components/HomeNavbar';
import ProfileHeader from 'components/ProfileHeader';
import Footer from 'components/Footer';
import {Container, Row} from 'reactstrap';

export default function NotFound() {
  return (
    <>
      <HomeNavbar />
      <ProfileHeader />
      <Container>
        <div className='main text-center'>
          <div className='section'>
            <Row className='col-sm-12 text-center'>
              <div className='col-sm-12 text-center'>
                <h1>404 PAGE NOT FOUND</h1>
                <h4>Protocol missing... Exiting program...</h4>
                <p>
                  Check that you typed the address correctly, go back to your
                  previous page or try using our site search to find something
                  specific.
                </p>
                <img
                  alt='...'
                  src='https://i.annihil.us/u/prod/marvel/html_pages_assets/error-pages/prod/iron-man-char.72fe5e86.jpg'
                />
              </div>
            </Row>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
}
