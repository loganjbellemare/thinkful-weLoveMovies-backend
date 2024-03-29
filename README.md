# Thinkful-WeLove-Movies-Backend

> Practice in backend development using PostgreSQL, Knex, and Express  
> Deployed site with frontend can be viewed [here](https://thinkful-welovemovies-frontend-ctmq.onrender.com).

## Installing and startup:

To install dependencies, run `npm install`  
To start server, run `npm start`  
Running `npm run start:dev` starts server with Nodemon

## Functionality:

This project was meant to be connected to a frontend application provided by the Thinkful team, (can be found in `starter-movie-frontend` repo) for an application that stores different info about different movies and theaters. My tasks were to setup the database and make the backend server functional.

### Routes:

- `/movies` returns a list of all movies located in `movies` database table
  ![screenshot of client home page displaying all movies](/screenshots/home-page.png)
  - entering `/movies?is_showing=true` returns a list of all movies currently showing
- `/movies/:movieId` returns info on a single movie, matching the route parameter `movieId` to corresponding `movie_id` column in database table
  ![screenshot of detailed movie view page on client](/screenshots/movie-detailed-view.png)
- `/movies/:movieId/theaters` returns a list of all theaters showing a given movie
  ![screenshot of theaters section from detailed movie page](/screenshots/movies-theaters.png)
- `/movies/:movieId/reviews` returns a list of reviews associated with a certain movie
  ![screenshot of review section under detailed movie view](/screenshots/reviews-view.png)
- `/reviews/:reviewId` responds to a `DELETE` or `PUT` request only, to delete or update a given review
- `/theaters` returns a list of all theaters in `theaters` database table, along with info about movies that are currently being shown in each theater
  ![screenshot of theaters list page on client](/screenshots/all-theaters-view.png)
