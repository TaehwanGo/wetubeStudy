import { getMovieById, getMovies, addMovie } from "./db";

export const home = (req, res) =>
  res.render("movies", { movies: getMovies(), pageTitle: "Movies!" });

export const movieDetail = (req, res) => {
  const {
    params: { id }
  } = req;
  const movie = getMovieById(id);
  
  console.log(movie);

  if (!movie) {
    res.render("404", { pageTitle: "Movie not found" });
  }
  return res.render("detail", { movie });
};

/*
Write the controller or controllers you need to render the form
and to handle the submission
*/

export const getAddMovie = (req, res) =>
  res.render("add", { pageTitle: "Add Movie" });

export const postAddMovie = async (req, res) => {
  // req.body에서 form으로 보내진 title, sysnopsis, genres 가져오기
  // console.log(req.body, "req.body");

  // genres를 array로 변환
  const genresString = req.body.genres;
  // console.log(genresString, "String");
  const genresArray = genresString.split(",");
  // console.log(genresArray, "Array"); // array변환된 것 확인완료


  // object에 담아서 db의 addMovie함수로 전달
  // home으로 redirect
  const {
    body: { title, synopsis }
  } = req;

  const newMovie = {
    title,
    synopsis,
    genres:genresArray
  }; 

  console.log(newMovie);

  try {
    await addMovie(newMovie);
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};
