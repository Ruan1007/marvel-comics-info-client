import React, {useState, useEffect} from 'react';
import HomeNavbar from '../../components/HomeNavbar';
// reactstrap components
import {Container, Row, Col} from 'reactstrap';
import HomePageHeader from 'components/HomeHeaders';
import Footer from 'components/Footer';
import {getLastestComics} from '../../services/api';
import CardComic from 'components/CardComic';

export default function Home() {
  const [lastestComics, setLastestComics] = useState([]);
  console.log('last', lastestComics);

  useEffect(() => {
    (async () => {
      const data = await getLastestComics();
      if (JSON.stringify(data) !== '[]') {
        setLastestComics(data);
      }
    })();
  });

  return (
    <>
      <HomeNavbar />
      <HomePageHeader />
      <div className='main text-center'>
        <div className='section' style={{backgroundColor: '#202020'}}>
          <Container>
            <h2 className='title' style={{color: '#FFF'}}>LAST WEEK COMICS </h2>
            <Row className='col-sm-12 text-center'>
              {lastestComics.length > 0 ? (
                lastestComics.map((comic) => {
                  return (
                    <Col sm='3' md='3'>
                      <CardComic comic={comic} />
                    </Col>
                  );
                })
              ) : (
                <div>Nothing to show...</div>
              )}
            </Row>
          </Container>
        </div>
      </div>
      <Footer />
    </>
  );
}
