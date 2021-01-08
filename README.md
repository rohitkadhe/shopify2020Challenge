# Shopify 2021 Challenge - Image Repository

- <b>Screenshots</b> https://drive.google.com/drive/folders/1waBAxUTJMW7XZJCY5_NWv2mzVinutY4-?usp=sharing
- <b>Challenge Link</b> https://docs.google.com/document/d/1ZKRywXQLZWOqVOHC4JkF3LqdpO3Llpfk_CkZPR8bjak/edit

# Project Overview

- The server application is built using node.js and PostgreSQL was used to setup the relational database. An ORM library (knex.js) is used to make calls from the API
  to the database.
- Authentication is built from the ground up using the jwt token library and the bycrypt library
- Images are securely uploaded to the Cloudinary platform and also securly deleted using the Cloudinary API

- The client application was build using React.js and the Semantic-UI-React library was used for styling components

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

- Open a terminal window in the client directory and run 'npm i' followed by 'npm start'
- A browser window should open if not navigate to the url in the terminal to view the UI

# Server Application

- Ensure you have PostgreSQL installed on your machine - https://www.postgresql.org/download/
- When setting up the user during the PostgreSQL installation set your password as root otherwise change the password field in the conn object in the seed.js file located in the root directory to match your password and replace 'root' in the DATABASE_URL in the .env file located in the root directory with your password. So if my password was test the DATABASE_URL would become postgres://postgres:test@127.0.0.1/shopifyimagerepository
- Leave all other settings as per their defaults
- <b>Important Note: </b> Make the changes in the previous two steps carefully or the project will not run
- Finally open a terminal window in the server directory and first run the command 'npm i' then 'node seed.js' and finally 'npm run dev'

- Thats it! The server and client should both be running. There are a few seed images and also a seed user with email: 'seed@gmail.com' and password: 'seed' 

# Limitations and Improvements

- Due to time constraints not all required functionality was implemented which includes selling/buying images, error handling and input validation
- However due to the way the project is designed this functionallity can be easily implemented
