import React, {useState, useEffect} from 'react';
import HomeNavbar from 'components/HomeNavbar';
import ProfileHeader from 'components/ProfileHeader';
import Footer from 'components/Footer';
import CardCharacter from 'components/CardCharacter';
import {Container, Row} from 'reactstrap';
import {getRatedCharacters} from 'services/auth';

export default function RatedCharacter() {
  const [myRatedCharacters, setMyRatedCharacters] = useState([]);

  useEffect(() => {
    const ratedCharacters = getRatedCharacters();
    setMyRatedCharacters(
      ratedCharacters.filter((character) => {
        return character.isLiked !== undefined;
      })
    );
  }, []);

  return (
    <>
      <HomeNavbar />
      <ProfileHeader />
      <div className='main text-center'>
        <div className='section section-dark'>
          <Container>
            <h2 className='title' style={{color: '#FFF'}}>
              MY RATED CHARACTERS
            </h2>
            <Row className='col-sm-12 text-center'>
              {myRatedCharacters.length > 0 ? (
                myRatedCharacters.map((character) => {
                  return (
                    <CardCharacter
                      character={character}
                      characterId={character.characterId}
                      key={character.characterId}
                    />
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
