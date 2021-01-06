# Shopify 2021 Challenge - Image Repository

- https://docs.google.com/document/d/1ZKRywXQLZWOqVOHC4JkF3LqdpO3Llpfk_CkZPR8bjak/edit

# Project Overview

- The server application is built using node.js and PostgreSQL was used to setup the relational database. A ORM library (knex.js) is used to make calls from the API
  to the database.
- Authentication is built from the ground up using the jwt and bycrypt libraries
- Images are securely uploaded to the Cloudinary platform and also securly deleted using the Cloudinary API

- The client application was build using React.js and the react-semantic-ui library was used for styling components

# Completed Requirements

- ADD image(s) to the repository
  - one / bulk / enormous amount of images
  - private or public (permissions)
  - secure uploading and stored images
- DELETE image(s)
  -one / bulk / selected / all images
  -Prevent a user deleting images from another user (access control)
  -secure deletion of images
- Added ability for users to filter by their uploaded images

# Running the project

# Client Application

- Open a terminal window in the client directory and run 'npm start'
- Navigate to the url in the terminal to see the user interface

# Server Application

- Ensure you have PostgreSQL installed on your machine - https://www.postgresql.org/download/
- When setting up the user during the PostgreSQL installation set your password as root otherwise change the password field in the seed.js to match your password and replace 'root' in the DATABASE_URL with your password. So if my password was test the DATABASE_URL would become postgres://postgres:test@127.0.0.1/shopifyimagerepository
- <b>Important Note: </b> Make the changes in the previous two steps carefully or the project will not run
- Finally open a terminal window in the server directory and first run the command 'node seed.js' followed by 'npm run dev'

- Thats it! The server and client should both be running

# Limitations and Improvements

- Due to time constraints not all required functionality was implemented which includes selling/buying images error handling, input validation.
- However due to the way the project is designed this functionallity can be easily implemented
