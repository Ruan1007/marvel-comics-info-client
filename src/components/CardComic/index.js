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
import {getComicByUrl} from 'services/apiMarvel';

export default function CardComic(props) {
  const [user] = useState(getUser());
  const [comic, setComic] = useState(props.comic);
  const [imageCover, setImageCover] = useState('');
  const [modal, setModal] = useState(false);
  const [isLiked, setIsLiked] = useState();
  const [rate, setRate] = useState();
  const [colorRate, setColorRate] = useState();
  const [ratedComics, setRatedComics] = useState([]);
  const [url] = useState(props.url);

  const title = 'COMIC';

  const rateComic = async (isLiked, url) => {
    const response = await api.post('comic/', {isLiked, url});
    const comic = response.data;
    setIsLiked(comic.isLiked);
    setNewRateComic(comic);
  };

  useEffect(() => {
    async function getRateComic() {
      if (ratedComics !== null && ratedComics.length > 0) {
        const ratedComic = ratedComics.find((ratedComic) => {
          return ratedComic.url === comic.resourceURI;
        });
        if (ratedComic) {
          setIsLiked(ratedComic.isLiked);
        }
      }

      if (isLiked !== undefined) {
        if (isLiked) {
          setRate('You liked this comic');
          setColorRate('#51cbce');
        } else {
          setRate(`You didn't like this comic`);
          setColorRate('#e62429');
        }
      }
    }
    getRateComic();
  }, [comic.resourceURI, isLiked, ratedComics]);

  useEffect(() => {
    async function getComic() {
      if (url) {
        const response = await getComicByUrl(url).get();
        const comic = response.data.data.results[0];
        setComic(comic);
      }
    }
    getComic();
  }, [url]);

  useEffect(() => {
    setRatedComics(getRatedComics());
    let image = comic.images ? comic.images[0] : undefined;
    if (image) {
      setImageCover(image.path + '.' + image.extension);
    } else {
      setImageCover(
        'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
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
          {rate && url ? <p style={{color: colorRate}}>{rate}</p> : null}
        </CardBody>
        <Button className='btn btn-danger' onClick={toggle}>
          Info
        </Button>
        <Modal isOpen={modal} toggle={toggle}>
          <div className='modal-header'>
            <h5 className='modal-title' id='exampleModalLiveLabel'>
              {title}
            </h5>
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
              {rate ? <p style={{color: colorRate}}>{rate}</p> : null}
              <CardImg
                style={{width: '15rem'}}
                top
                src={imageCover}
                alt='...'
              />
              <CardTitle>{comic.title}</CardTitle>
              {comic.description ? (
                <p>
                  <b>Description:</b> {comic.description}
                </p>
              ) : null}
            </div>
          </div>
          {user ? (
            <div className='modal-footer'>
              <div className='left-side'>
                <Button
                  id='like'
                  className='btn-link'
                  color='primary'
                  type='button'
                  style={{fontSize: '25px'}}
                  onClick={() => rateComic(true, comic.resourceURI)}>
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
                  onClick={() => rateComic(false, comic.resourceURI)}>
                  <FontAwesomeIcon icon='thumbs-down' />
                </Button>
                <UncontrolledTooltip placement='top' target='dislike' delay={0}>
                  DISLIKE
                </UncontrolledTooltip>
              </div>
            </div>
          ) : null}
        </Modal>
      </Card>
    </Col>
  );
}
