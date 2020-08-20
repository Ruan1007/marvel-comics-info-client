const TOKEN_KEY = '@Marvel:token';
const USER_KEY = '@Marvel:user';
const COMICS_KEY = '@Marvel:comics';
const CHARACTERS_KEY = '@Marvel:characters';

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const setUser = (user) => {
  localStorage.setItem(USER_KEY, user);
};
export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};
export const getUser = () => JSON.parse(localStorage.getItem(USER_KEY));
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(COMICS_KEY);
  localStorage.removeItem(CHARACTERS_KEY);
};
export const getRatedComics = () =>
  JSON.parse(localStorage.getItem(COMICS_KEY));

export const setRatedComics = (comics) =>
  localStorage.setItem(COMICS_KEY, comics);

export const setNewRateComic = (comic) => {
  const comics =
    getRatedComics() !== null && getRatedComics() !== undefined
      ? getRatedComics()
      : [];

  const comicsFilter = comics.filter((ratedComic) => {
    return ratedComic._id !== comic._id;
  });

  comicsFilter.push(comic);
  localStorage.setItem(COMICS_KEY, JSON.stringify(comicsFilter));
};

export const getRatedCharacters = () =>
  JSON.parse(localStorage.getItem(CHARACTERS_KEY));

export const setRatedCharacters = (characters) =>
  localStorage.setItem(CHARACTERS_KEY, characters);

export const setNewRateCharacter = (character) => {
  const characters =
    getRatedCharacters() !== null && getRatedCharacters() !== undefined
      ? getRatedCharacters()
      : [];

  const charactersFilter = characters.filter((ratedCharacter) => {
    return ratedCharacter._id !== character._id;
  });

  charactersFilter.push(character);
  localStorage.setItem(CHARACTERS_KEY, JSON.stringify(charactersFilter));
};
