import axios from 'axios';
import md5 from 'js-md5';

const MARVEL_API_PUBLIC_KEY = '8d072718fac75584ea1f2e198caa93c1';
const MARVEL_API_PRIVATE_KEY = '9e35180abe05543ce6921a6abc4f1ac874882806';
const timestamp = Number(new Date());
const hash = md5.create();
hash.update(timestamp + MARVEL_API_PRIVATE_KEY + MARVEL_API_PUBLIC_KEY);

export const isAuthenticated = () => true;

export const getLastestComics = async () => {
  let response = await axios.get(
    `http://gateway.marvel.com/v1/public/comics?dateDescriptor=lastWeek&limit=4&ts=${timestamp}&apikey=${MARVEL_API_PUBLIC_KEY}&hash=${hash.hex()}`
  );
  let result = response.data;
  return result.data.results;
};
