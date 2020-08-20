import axios from 'axios';
import md5 from 'js-md5';

// const MARVEL_API_PUBLIC_KEY = '8d072718fac75584ea1f2e198caa93c1';
const MARVEL_API_PUBLIC_KEY = '28be3bc2ef0e460de44749eb7dad1c41';
// const MARVEL_API_PRIVATE_KEY = '9e35180abe05543ce6921a6abc4f1ac874882806';
const MARVEL_API_PRIVATE_KEY = '3582e74261bd8a611c10c5c676238fd4fe92235f';
const timestamp = Number(new Date());
const hash = md5.create();
hash.update(timestamp + MARVEL_API_PRIVATE_KEY + MARVEL_API_PUBLIC_KEY);

export const marvelApiComics = () => {
  return axios.create({
    baseURL: `http://gateway.marvel.com/v1/public/comics?format=comic&dateDescriptor=thisWeek&limit=4&ts=${timestamp}&apikey=${MARVEL_API_PUBLIC_KEY}&hash=${hash.hex()}`
  });
};

export const searchComicByTitle = ({title}) => {
  return axios.create({
    baseURL: `https://gateway.marvel.com:443/v1/public/comics?format=comic&titleStartsWith=${title}&limit=12&ts=${timestamp}&apikey=${MARVEL_API_PUBLIC_KEY}&hash=${hash.hex()}`
  });
};

export const searchCharacterByName = ({name}) => {
  return axios.create({
    baseURL: `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${name}&limit=12&ts=${timestamp}&apikey=${MARVEL_API_PUBLIC_KEY}&hash=${hash.hex()}`
  });
};

export const getComicByUrl = (url) => {
  return axios.create({
    baseURL: `${url}?ts=${timestamp}&apikey=${MARVEL_API_PUBLIC_KEY}&hash=${hash.hex()}`
  });
};
