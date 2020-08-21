import React, {useEffect, useState} from 'react';
import {
  Col,
  Button,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  Modal,
  UncontrolledTooltip
} from 'reactstrap';
import {getUser} from 'services/auth';
import {getRatedCharacters} from 'services/auth';
import {getByUrl} from 'services/apiMarvel';
import api from 'services/api';
import {setNewRateCharacter} from 'services/auth';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export default function CardCharacter({...props}) {
  const [user] = useState(getUser());
  const [character, setCharacter] = useState(props.character);
  const [characterImg, setCharacterImg] = useState('');
  const [modal, setModal] = useState(false);
  const [isLiked, setIsLiked] = useState();
  const [isFavorite, setIsFavorite] = useState(false);
  const [starColor, setStarColor] = useState('#403D39');
  const [rate, setRate] = useState();
  const [colorRate, setColorRate] = useState();
  const [ratedCharacters, setRatedCharacters] = useState([]);
  const [characterId] = useState(props.characterId);
  const [comics, setComics] = useState([]);

  const title = 'CHARACTER';

  const rateCharacter = async (isLiked, isFavorite, characterId) => {
    const response = await api.post('character/', {
      isLiked,
      isFavorite,
      characterId
    });
    const character = response.data;
    setIsLiked(character.isLiked);
    setIsFavorite(character.isFavorite);
    setNewRateCharacter(character);
  };

  useEffect(() => {
    if (isFavorite !== undefined && isFavorite) {
      setStarColor('#FDF796');
    } else {
      setStarColor('#403D39');
    }
  }, [isFavorite]);

  useEffect(() => {
    if (isLiked !== undefined) {
      if (isLiked) {
        setRate('You liked this character');
        setColorRate('#51cbce');
      } else {
        setRate(`You didn't like this character`);
        setColorRate('#e62429');
      }
    }
  }, [isLiked]);

  useEffect(() => {
    async function getRatedCharacter() {
      if (ratedCharacters !== null && ratedCharacters.length > 0) {
        const ratedCharacter = ratedCharacters.find((ratedCharacter) => {
          return ratedCharacter.characterId === character.id;
        });
        if (ratedCharacter) {
          setIsLiked(ratedCharacter.isLiked);
          setIsFavorite(ratedCharacter.isFavorite);
        }
      }
    }
    getRatedCharacter();
  }, [character, ratedCharacters]);

  useEffect(() => {
    async function getCharacter() {
      if (characterId) {
        const response = await getByUrl(`characters/${characterId}`).get();
        const character = response.data.data.results[0];
        const comics = character.comics.items;
        setComics(comics);
        setCharacter(character);
      }
    }
    getCharacter();
  }, [characterId]);

  useEffect(() => {
    setRatedCharacters(getRatedCharacters());
    let image = character.thumbnail;
    if (image) {
      setCharacterImg(image.path + '.' + image.extension);
    } else {
      setCharacterImg(
        'https://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
      );
    }
  }, [character]);

  const toggle = () => {
    setModal(!modal);
  };

  return (
    <>
      <Col sm='3' md='3'>
        <Card style={{width: '15rem', height: '25rem'}}>
          <CardImg
            top
            src={characterImg}
            alt='...'
            style={{width: '240px', height: '240px'}}
          />
          <CardBody>
            <CardTitle>{character.name}</CardTitle>
            {rate && characterId && <p style={{color: colorRate}}>{rate}</p>}
          </CardBody>
          <Button className='btn btn-danger' onClick={toggle}>
            Info
          </Button>
          <Modal isOpen={modal} toggle={toggle}>
            <div className='modal-header'>
              <h5 className='modal-title'>{title}</h5>
              <div
                id='favorite'
                style={{fontSize: '19px', paddingLeft: '10px'}}
                onClick={() => {
                  rateCharacter(isLiked, !isFavorite, character.id);
                }}>
                <FontAwesomeIcon
                  icon='star'
                  style={{color: starColor, borderColor: '#403D39'}}
                />
              </div>
              {!isFavorite ? (
                <UncontrolledTooltip
                  placement='right'
                  target='favorite'
                  delay={0}>
                  Make favorite
                </UncontrolledTooltip>
              ) : (
                <UncontrolledTooltip
                  placement='right'
                  target='favorite'
                  delay={0}>
                  Unmake favorite
                </UncontrolledTooltip>
              )}
              <button
                aria-label='Close'
                className='close'
                data-dismiss='modal'
                type='button'
                onClick={() => setModal(false)}>
                <span aria-hidden={true}>×</span>
              </button>
            </div>
            <div className='modal-body'>
              <div className='text-center'>
                {rate && <p style={{color: colorRate}}>{rate}</p>}
                <CardImg
                  style={{width: '15rem'}}
                  top
                  src={characterImg}
                  alt='...'
                />
                <CardTitle>{character.name}</CardTitle>
                {character.description && (
                  <p>
                    <span style={{fontWeight: 'bold'}}>Description:</span>{' '}
                    {character.description}
                  </p>
                )}
                <div>
                  <br />
                  {comics.length > 0 && (
                    <span style={{fontWeight: 'bold'}}>Comics:</span>
                  )}
                  {comics.length > 0
                    ? comics.map((comic) => {
                        return <p key={comic.resourceURI}>{comic.name}</p>;
                      })
                    : null}
                </div>
              </div>
            </div>
            {user && (
              <div className='modal-footer'>
                <div className='left-side'>
                  <Button
                    id='like'
                    className='btn-link'
                    color='primary'
                    type='button'
                    style={{fontSize: '25px'}}
                    onClick={() => {
                      rateCharacter(true, isFavorite, character.id);
                    }}>
                    <FontAwesomeIcon icon='thumbs-up' />
                  </Button>
                  <UncontrolledTooltip placement='top' target='like' delay={0}>
                    LIKE
                  </UncontrolledTooltip>
                </div>
                <div className='divider' />
                <div className='right-side'>
                  <Button
                    id='dislike'
                    className='btn-link'
                    color='danger'
                    type='button'
                    style={{fontSize: '25px'}}
                    onClick={() => {
                      rateCharacter(false, isFavorite, character.id);
                    }}>
                    <FontAwesomeIcon icon='thumbs-down' />
                  </Button>
                  <UncontrolledTooltip
                    placement='top'
                    target='dislike'
                    delay={0}>
                    DISLIKE
                  </UncontrolledTooltip>
                </div>
              </div>
            )}
          </Modal>
        </Card>
      </Col>
    </>
  );
}
