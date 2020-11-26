// DONT TOUCH THIS FILE <3

import axios from "axios";
let movies = [];
const YIFY_URL = "https://yts.lt/api/v2/";
const client = axios.create({
  baseURL: YIFY_URL
});
const startDB = async () => {
  try {
    console.log("⏳  Starting Movie DB");
    ({
      data: {
        data: { movies }
      }
    } = await client.get("/list_movies.json", { params: { limit: 50 } }));
    console.log("✅  Movie DB Ready!");
  } catch (e) {
    console.log(e.message);
    console.log("❌ Can't initialize DB, contact Nico");
  }
};
startDB();

// This gives you an array of all the movies
export const getMovies = () => movies; // 50개 movie array

// This gives you one movie, don't forget to pass the ID
export const getMovieById = (id) => {
  if (!id) {
    throw Error("❌  YOU FORGOT TO PASS THE MOVIE ID TO THE FUNCTION  ❌ ");
  }
  return movies.find((m) => m.id === parseInt(id, 10));
};

// This gives you an array of movies with a release date of minimum X
export const getMovieByMinimumYear = (year) => {
  if (!year) {
    throw Error("❌  YOU FORGOT TO PASS THE MOVIE YEAR TO THE FUNCTION  ❌");
  }
  return movies.filter((m) => m.year >= year);
};

// This gives you an array of movies with a rating of minimum X
export const getMovieByMinimumRating = (rating) => {
  if (!rating) {
    throw Error("❌  YOU FORGOT TO PASS THE MOVIE RATING TO THE FUNCTION  ❌");
  }
  return movies.filter((m) => m.rating >= rating);
};

// movies array sample
/*
[
  {
    id: 24074,
    url: 'https://yts.mx/movies/runaway-nightmare-1982',
    imdb_code: 'tt0245400',
    title: 'Runaway Nightmare',
    title_english: 'Runaway Nightmare',
    title_long: 'Runaway Nightmare (1982)',
    slug: 'runaway-nightmare-1982',
    year: 1982,
    rating: 5,
    runtime: 105,
    genres: [ 'Action', 'Comedy', 'Horror', 'Mystery', 'Thriller' ],
    summary: "Two worm farmers from Death Valley rescue a beautiful woman (Fate) after witnessing her live burial. The men (Ralph and Jason) attend to the unconscious girl but get captured by a commune of female cultists who only want to rescue their buried member. Cultist Fate had worked with a crime syndicate while uncovering a fortune in something (assumed to be platinum). But the platinum-filled suitcase gets seized by her cartel associates who then bury Fate as punishment. Ralph and Jason complete a bizarre initiation to become the only male members of this fourth-wave vampy group. Jason sees the experience as an adventure and finds romance with some of the members. Ralph only wants to escape where he is regarded as threatening and sexually repulsive. The cult leader, Hesperia now turns to avenge Fate's burial. The women, with their two new members steal back the valuable suitcase from a desert warehouse where Fate knows the syndicate holds the platinum. After the robbery, the angry mob trace ...",
    description_full: "Two worm farmers from Death Valley rescue a beautiful woman (Fate) after witnessing her live burial. The men (Ralph and Jason) attend to the unconscious girl but get captured by a commune of female cultists who only want to rescue their buried member. Cultist Fate had worked with a crime syndicate while uncovering a fortune in something (assumed to be platinum). But the platinum-filled suitcase gets seized by her cartel associates who then bury Fate as punishment. Ralph and Jason complete a bizarre initiation to become the only male members of this fourth-wave vampy group. Jason sees the experience as an adventure and finds romance with some of the members. Ralph only wants to escape where he is regarded as threatening and sexually repulsive. The cult leader, Hesperia now turns to avenge Fate's burial. The women, with their two new members steal back the valuable suitcase from a desert warehouse where Fate knows the syndicate holds the platinum. After the robbery, the angry mob trace ...",
    synopsis: "Two worm farmers from Death Valley rescue a beautiful woman (Fate) after witnessing her live burial. The men (Ralph and Jason) attend to the unconscious girl but get captured by a commune of female cultists who only want to rescue their buried member. Cultist Fate had worked with a crime syndicate while uncovering a fortune in something (assumed to be platinum). But the platinum-filled suitcase gets seized by her cartel associates who then bury Fate as punishment. Ralph and Jason complete a bizarre initiation to become the only male members of this fourth-wave vampy group. Jason sees the experience as an adventure and finds romance with some of the members. Ralph only wants to escape where he is regarded as threatening and sexually repulsive. The cult leader, Hesperia now turns to avenge Fate's burial. The women, with their two new members steal back the valuable suitcase from a desert warehouse where Fate knows the syndicate holds the platinum. After the robbery, the angry mob trace ...",
    yt_trailer_code: '',
    language: 'en',
    mpa_rating: '',
    background_image: 'https://yts.mx/assets/images/movies/runaway_nightmare_1982/background.jpg',
    background_image_original: 'https://yts.mx/assets/images/movies/runaway_nightmare_1982/background.jpg',
    small_cover_image: 'https://yts.mx/assets/images/movies/runaway_nightmare_1982/small-cover.jpg',
    medium_cover_image: 'https://yts.mx/assets/images/movies/runaway_nightmare_1982/medium-cover.jpg',
    large_cover_image: 'https://yts.mx/assets/images/movies/runaway_nightmare_1982/large-cover.jpg',
    state: 'ok',
    torrents: [ [Object], [Object] ],
    date_uploaded: '2020-11-25 12:44:05',
    date_uploaded_unix: 1606304645
  },
  {
    id: 24073,
    url: 'https://yts.mx/movies/saga-of-the-phoenix-1990',
    imdb_code: 'tt0098971',
    title: 'Saga of the Phoenix',
    title_english: 'Saga of the Phoenix',
    title_long: 'Saga of the Phoenix (1990)',
    slug: 'saga-of-the-phoenix-1990',
    year: 1990,
    rating: 5.3,
    runtime: 93,
    genres: [ 'Action', 'Adventure', 'Fantasy' ],
    summary: 'The Holy Maiden of Hell, Ashura possesses immense power that can destroy humanity. Buddhist monks trap her in a deep cave to keep her from falling into evil hands. Kindhearted Abbot Jiku grants her wish to enjoy the human world for 7 days.',
    description_full: 'The Holy Maiden of Hell, Ashura possesses immense power that can destroy humanity. Buddhist monks trap her in a deep cave to keep her from falling into evil hands. Kindhearted Abbot Jiku grants her wish to enjoy the human world for 7 days.',
    synopsis: 'The Holy Maiden of Hell, Ashura possesses immense power that can destroy humanity. Buddhist monks trap her in a deep cave to keep her from falling into evil hands. Kindhearted Abbot Jiku grants her wish to enjoy the human 
  world for 7 days.',
    yt_trailer_code: 'vhQBsRgtNNE',
    language: 'cn',
    mpa_rating: '',
    background_image: 'https://yts.mx/assets/images/movies/saga_of_the_phoenix_1990/background.jpg',
    background_image_original: 'https://yts.mx/assets/images/movies/saga_of_the_phoenix_1990/background.jpg',
    small_cover_image: 'https://yts.mx/assets/images/movies/saga_of_the_phoenix_1990/small-cover.jpg',
    medium_cover_image: 'https://yts.mx/assets/images/movies/saga_of_the_phoenix_1990/medium-cover.jpg',
    large_cover_image: 'https://yts.mx/assets/images/movies/saga_of_the_phoenix_1990/large-cover.jpg',
    state: 'ok',
    torrents: [ [Object], [Object] ],
    date_uploaded: '2020-11-26 01:57:14',
    date_uploaded_unix: 1606352234
  }
]
*/