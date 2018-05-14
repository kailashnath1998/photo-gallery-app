# photo-gallery-app


To get the Node server running locally:

- Clone this repo
- `npm install` to install all required dependencies
- Install MongoDB Community Edition ([instructions](https://docs.mongodb.com/manual/installation/#tutorials)) and run it by executing `mongod`
- `npm run start` to start the local server

# Code Overview

## Majour Dependencies

- [expressjs](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
- [express-jwt](https://github.com/auth0/express-jwt) - Middleware for validating JWTs for authentication
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - For generating JWTs used by authentication
- [mongoose](https://github.com/Automattic/mongoose) - For modeling and mapping MongoDB data to javascript 


## Application Structure

- `server.js` - The entry point to our application. This file defines our express server and connects it to MongoDB using mongoose. It also requires the routes and models we'll be using in the application.
- `config.js` - This file contains configuration for jwt as well as a central location for configuration/environment variables.
- `db.js` - This file contains the entry point to DataBase.
- `public/` - This folder contains the html/js files.
- `data/` - This folder is where the users albums get stored.
- `users/` - This folder contains User Schema and CRUD for users
- `auth/` - This folder contains Token based Auth and CRUD for auth
- `album/` - This folder contains Album Schema and CRUD for albums
- `photo/` - This folder contains Photo Schema and CRUD for photos
- `user_data/` - This folder contains avatars of users
- `RouterConfig.js` - This folder contains the route definitions

## Authentication

Requests are authenticated using the `x-access-token` sent via header with a valid JWT. We define one express middlewares in `auth/VerifyToken.js` that can be used to authenticate requests. The `optional` middleware configures the `express-jwt` in the same way as `required`, but will *not* return a 401 status code if the request cannot be authenticated.


<br />
