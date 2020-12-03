/*
You DONT have to import the Movie with your username.
Because it's a default export we can nickname it whatever we want.
So import Movie from "./models"; will work!
You can do Movie.find() or whatever you need like normal!
*/
import Movie from "./models/Movie";

// Add your magic here!
export const home = async (req, res) => {
    try {
        const movies = await Movie.find({}).sort({'_id': -1});
        // console.log(movies); // movies 구조 확인 : array
        res.render("movies", {pageTitle: "Movies!", movies });
    } catch(error) {
        console.log(error);
    }
}

export const getCreateMovie = (req, res) =>
  res.render("create", { pageTitle: "Create" });

export const postCreateMovie = async (req, res) => {
    // req.body에서 form으로 보내진 title, sysnopsis, genres 가져오기
    // console.log(req.body, "req.body");
    const {
        body: { title, year, rating, synopsis, genres }
    } = req;
    // if(title.length < 3){ // input에 minlength="3" 추가
    //     return res.redirect("/create");
    // }
    const genresArray = genres.split(",");
    // console.log(genresArray, "Array"); // array변환된 것 확인완료
    try {
        const newMovie = await Movie.create({
            title,
            year:parseInt(year),
            rating,
            synopsis,
            genres:genresArray
        }); // schema를 안만들어서 추가가 안되고 있었음 
        // console.log(newMovie);
        // console.log(newMovie.title);
        // detail로 바로 보내자
        res.redirect(`/${newMovie._id}`);
    } catch (error) {
        console.log(error);
        res.render("404", { pageTitle: "Movie not found" });
    }
    
};


export const movieDetail = async (req, res) => {
    const {
      params: { id }
    } = req;
    try{
        const movie = await Movie.findById(id);
        // console.log(movie);
        res.render("detail", {pageTitle: movie.title, movie });
    } catch(error) {
        console.log(error);
        res.render("404", { pageTitle: "Movie not found" });
    }
};


export const getEditMovie = async (req, res) => {
    const { params: {id}} = req;
    try{
        const movie = await Movie.findById(id);
        const movieGenres = movie.genres.toString();
        res.render("edit", { pageTitle: `Editing ${movie.title}`, movie, movieGenres });
    } catch(error) {
        console.log(error);
        res.render("404", { pageTitle: "Movie not found" });
    }
}

export const postEditMovie = async (req, res) => {
    // req.body에서 form으로 보내진 title, sysnopsis, genres 가져오기
    // console.log(req.body, "req.body");
    const {
        params: {id},
        body: { title, year, rating, synopsis, genres }
    } = req;
    // const genresArray = genres.split(",");
    // console.log(genresArray, "Array"); // array변환된 것 확인완료
    try{
        await Movie.findOneAndUpdate(
            {
                _id:id
            }, 
            {
                title,
                year:parseInt(year),
                rating,
                synopsis,
                genres
            }
        ); // schema를 안만들어서 추가가 안되고 있었음 
        // console.log(newMovie);
        // console.log(newMovie.title);
        // detail로 바로 보내자
        res.redirect(`/${id}`);
    } catch(error) {
        console.log(error);
        res.render("404", { pageTitle: "Movie not found" });
    }
};

export const deleteMovie = async (req, res) => {
    // res.render("deleteVideo", {pageTitle:'Delete Video'});
    const {
        params: {id}
    } = req;
    try{
        await Movie.findOneAndRemove({_id:id});
        res.redirect("/"); // try와 catch가 공통적으로 redirect home이라서 밖으로 뺌
    } catch(error) {
        console.log(error);
    }
}

export const searchMovie = async (req, res) => {
    console.log(req.query);
    let movies = [];
    let querykey;
    let queryValue;
    if(req.query.year){
        querykey = "year";
        queryValue = req.query.year;
    } else if(req.query.rating){
        querykey = "rating";
        queryValue = req.query.rating;
    }
    try {
        movies = await Movie.find().where(querykey).gte(queryValue);
        // console.log(movies);
        res.render("movies", {pageTitle: `Filtering by ${querykey}: ${queryValue}`, movies});        
    } catch (error) {
        console.log(error);
        res.render("404", { pageTitle: "Movie not found" });
    }
}