import React, {useState, useEffect} from 'react';
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  Button,
  Col,
  Modal,
  UncontrolledTooltip
} from 'reactstrap';
import {getUser, getRatedComics, setNewRateComic} from 'services/auth';
import api from 'services/api';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {getByUrl} from 'services/apiMarvel';

export default function CardComic(props) {
  const [user] = useState(getUser());
  const [comic, setComic] = useState(props.comic);
  const [imageCover, setImageCover] = useState('');
  const [modal, setModal] = useState(false);
  const [isLiked, setIsLiked] = useState();
  const [isFavorite, setIsFavorite] = useState();
  const [starColor, setStarColor] = useState();
  const [rate, setRate] = useState();
  const [colorRate, setColorRate] = useState();
  const [ratedComics, setRatedComics] = useState([]);
  const [comicId] = useState(props.comicId);
  const [characters, setCharacters] = useState([]);

  const title = 'COMIC';

  const rateComic = async (isLiked, isFavorite, comicId) => {
    const response = await api.post('comic/', {isLiked, isFavorite, comicId});
    const comic = response.data;
    setIsLiked(comic.isLiked);
    setIsFavorite(comic.isFavorite);
    setNewRateComic(comic);
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
        setRate('You liked this comic');
        setColorRate('#51cbce');
      } else {
        setRate(`You didn't like this comic`);
        setColorRate('#e62429');
      }
    }
  }, [isLiked]);

  useEffect(() => {
    async function getRateComic() {
      if (ratedComics !== null && ratedComics.length > 0) {
        const ratedComic = ratedComics.find((ratedComic) => {
          return ratedComic.comicId === comic.id;
        });
        if (ratedComic) {
          setIsLiked(ratedComic.isLiked);
          setIsFavorite(ratedComic.isFavorite);
        }
      }
    }
    getRateComic();
  }, [comic, ratedComics]);

  useEffect(() => {
    async function getComic() {
      if (comicId) {
        const response = await getByUrl(`comics/${comicId}`).get();
        const comic = response.data.data.results[0];
        const characters = comic.characters.items;
        setCharacters(characters);
        setComic(comic);
      }
    }
    getComic();
  }, [comicId]);

  useEffect(() => {
    setRatedComics(getRatedComics());
    let image = comic.images ? comic.images[0] : undefined;
    if (image) {
      setImageCover(image.path + '.' + image.extension);
    } else {
      setImageCover(
        'https://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
      );
    }
  }, [comic]);

  const toggle = () => {
    setModal(!modal);
  };

  return (
    <Col sm='3' md='3'>
      <Card style={{width: '15rem', height: '32rem'}}>
        <CardImg top src={imageCover} alt='...' />
        <CardBody>
          <CardTitle>{comic.title}</CardTitle>
          {rate && comicId && <p style={{color: colorRate}}>{rate}</p>}
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
              onClick={() => rateComic(isLiked, !isFavorite, comic.id)}>
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
                src={imageCover}
                alt='...'
              />
              <CardTitle>{comic.title}</CardTitle>
              {comic.description && (
                <p>
                  <span style={{fontWeight: 'bold'}}>Description:</span>{' '}
                  {comic.description}
                </p>
              )}
              <div>
                <br />
                {characters.length > 0 && (
                  <span style={{fontWeight: 'bold'}}>Characters:</span>
                )}
                {characters.length > 0
                  ? characters.map((character) => {
                      return (
                        <p key={character.resourceURI}>{character.name}</p>
                      );
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
                  onClick={() => rateComic(true, isFavorite, comic.id)}>
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
                  onClick={() => rateComic(false, isFavorite, comic.id)}>
                  <FontAwesomeIcon icon='thumbs-down' />
                </Button>
                <UncontrolledTooltip placement='top' target='dislike' delay={0}>
                  DISLIKE
                </UncontrolledTooltip>
              </div>
            </div>
          )}
        </Modal>
      </Card>
    </Col>
  );
}
