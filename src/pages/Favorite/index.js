import React, {useState, useEffect} from 'react';
import HomeNavbar from 'components/HomeNavbar';
import ProfileHeader from 'components/ProfileHeader';
import Footer from 'components/Footer';
import {Container, Row} from 'reactstrap';
import CardComic from 'components/CardComic';
import {getRatedComics} from 'services/auth';
import CardCharacter from 'components/CardCharacter';
import {getRatedCharacters} from 'services/auth';

export default function Favorite() {
  const [favoriteComics, setFavoriteComics] = useState([]);
  const [favoriteCharacters, setFavoriteCharacters] = useState([]);

  useEffect(() => {
    const comics = getRatedComics() ? getRatedComics() : [];
    setFavoriteComics(
      comics.filter((comic) => {
        return comic.isFavorite === true;
      })
    );

    const characters = getRatedCharacters() ? getRatedCharacters() : [];
    setFavoriteCharacters(
      characters.filter((character) => {
        return character.isFavorite === true;
      })
    );
  }, [favoriteComics, favoriteCharacters]);

  return (
    <>
      <HomeNavbar />
      <ProfileHeader />
      <div className='main text-center'>
        <div className='section section-dark'>
          <Container>
            <h2 className='title mx-auto'>MY FAVORITES</h2>
            <div className='section section-dark'>
              <h4 className='title mx-auto'>COMICS</h4>
              <div className='section section-dark'>
                <Row className='col-sm-12 text-center'>
                  {favoriteComics.length > 0 ? (
                    favoriteComics.map((comic) => {
                      return (
                        <CardComic
                          comic={comic}
                          comicId={comic.comicId}
                          key={comic.comicId}
                        />
                      );
                    })
                  ) : (
                    <div>Nothing to show...</div>
                  )}
                </Row>
              </div>
            </div>
            <div className='section section-dark'>
              <h4 className='title mx-auto'>CHARACTERS</h4>
              <div className='section section-dark'>
                <Row className='col-sm-12 text-center'>
                  {favoriteCharacters.length > 0 ? (
                    favoriteCharacters.map((character) => {
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
              </div>
            </div>
          </Container>
        </div>
      </div>
      <Footer />
    </>
  );
}
