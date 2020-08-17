import React, {useState, useEffect} from 'react';
import {Card, CardImg, CardBody, CardTitle, Button} from 'reactstrap';

export default function CardComic(props) {
  const [comic] = useState(props.comic);

  const [imageCover, setImageCover] = useState('');

  useEffect(() => {
    let image = comic.images[0];
    setImageCover(image.path + '.' + image.extension);
  }, [comic.images]);

  return (
    <>
      <Card style={{width: '15rem', height: '32rem'}}>
        <CardImg top src={imageCover} alt='...' />
        <CardBody>
          <CardTitle>{comic.title}</CardTitle>
        </CardBody>
        <Button style={{backgroundColor: '#E62429'}}>Info</Button>
      </Card>
    </>
  );
}
