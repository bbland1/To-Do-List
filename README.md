# To-Do List

![License](https://img.shields.io/github/license/bbland1/Secrets-App?style=plastic)
![Version](https://img.shields.io/github/package-json/v/bbland1/Secrets-App?style=plastic)
![Language](https://img.shields.io/github/languages/top/bbland1/Secrets-App?style=plastic)

A simple to-do list.

Clicking the link below will take you to the home/main list named today. In the new item field new tasks can be filled out and added by clicking the + or hitting enter. Any completed item can then be deleted by marking the checkbox.

For a new list to be made `/:listname` needs to be added to the end of the url with the name that you would want that list to be. You will be redirected to that list and can add or delete items the same way as above. In the future you can return to this list by typing the url with the `/:listName` and it will take you to it again.


## Requirements
Install all the dependecies of this project by using the [package.json](./package.json). For this project you will need to have [installed Mongo DB](https://www.mongodb.com/try/download/community) on your computer for local development.

## Built With
* [dotenv](https://www.npmjs.com/package/dotenv)
* Frontend
  * [EJS](https://ejs.co)
* Backend
  * [Express.js](https://expressjs.com)
  * [MongoDB](https://www.mongodb.com)
  * [Mongoose](https://mongoosejs.com)

### Local Development
1. Download and install the LTS version of [Node.js](https://nodejs.org/en). In this project [nvm](https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/) was used for the installing of a node version.
2. Download and install MongoDB on your computer.
3. Install the project requirements
```shell
npm install
```
4. Create a `env` file based on the `.env.sample` file and change `MONGO_DB` to your specifc strings to connect to your database and access the required authorization process with google.
5. Run the app
```shell
node app.js
```

### Deployment
This project was origially deployed with Heroku. While it still could have been deployed there with the removal of their free teir it was moved to [Render](https://render.com). Typically deployment of an Express app would follow the process listed [here](https://render.com/docs/deploy-node-express-app), but this was a migration following the steps [here](https://render.com/docs/migrate-from-heroku). The migration process was also very straight forward and while you will most likely follow typical deployment just incase there is something you would like to migrate to Render yourself.  

### License
See the [LICENSE](./LICENSE) file for license rights and limitations (MIT).
