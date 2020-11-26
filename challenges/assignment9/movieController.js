import {
    getMovieById,
    getMovies,
    getMovieByMinimumRating,
    getMovieByMinimumYear
  } from "./db";
  
  // 공통적으로 pageTitle도 넘겨줘야 함
  export const home = (req, res) => {
    const movies = getMovies();
    // console.log(movies);
    res.render("movies", { pageTitle: "Movies!", movies });
  }; // db에서 movies array를 넘겨 줘야 함
  export const movieDetail = async (req, res) => {
    const {
        params: {id} // router에서 "/:id" 라고 설정했기 때문, 만약 /:potato라면 potato로 받아야함
    } = req;
    // console.log(id); // id는 찍히는데
    // console.log(getMovieById(id)); // getMovies(id)로 하니까 안되지 
    try{
        const movieObject = await getMovieById(id);
        res.render("detail", { pageTitle: movieObject.title, movieObject });
        // console.log(movieObject.genres);
    } catch(error) {
        res.render("404", { pageTitle: "error"});
    }
  };
  export const filterMovie = async (req, res) => {
    // console.log(req);
    // console.log(req.query); // req.params대신 query를 사용해야 함
    // console.log(req.query.year !== undefined); // year 가 object의 key값으로 존재하는지 확인
    if(req.query.year !== undefined){
        const year = req.query.year;
        const movies = getMovieByMinimumYear(year);
        res.render("movies", { pageTitle: `Searching by year: ${req.query.year}`, movies});
    } else if(req.query.rating !== undefined){
        const rating = req.query.rating;
        const movies = getMovieByMinimumRating(rating);
        res.render("movies", { pageTitle: `Searching by rating: ${req.query.rating}`, movies});
    } else {
        res.render("404", { pageTitle: "error"});
    }
  };
  