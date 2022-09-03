------------express SetUp------------

<!--   BASIC

it's best practice to make all the api in a single file or in the index.js file it will decrease controllability.
so we need to make separate js file according to our features.

there is some steps to do it.
------step_1
make routs folder > create file feature_Rout.js

------step_2
const express = require('express');
const featureRouter = express.Router();

------step_3
featureRouter.get('/:id', (req, res) => {
    res.send(`Found with id ${req.params.id || 'null'}`)
});

featureRouter.post('/feature', (req, res) => {
    res.send('feature Added')
})
module.exports = featureRouter;

------step_4
call it from the index.js file or root of the server.

we must need to differentiate the client and server routes.
and we need to add /api before the root url like https://omuk.com/baseurl/?id

it's says add layer.
and we need to add /api before the root url like https://omuk.com/api/baseurl/?id
app.use('/api/baseURL', featureRouter)

Ans:- so the '/' means baseURL
 ----------------------------------------------------------->

<!--  efficient way

we don't need to write
featureRouter.get()
featureRouter.post()
 so
we can write

featureRouter.route('/').get(controllerFunc).post(controllerFunc);
final looks:-

featureRouter.route('/')
    .get((req, res) => {

        res.send(`tools Found`)

    })
    .post((req, res) => {

        res.send('tools Added')

    });


    ------controllerFunc have 3 parameters------
    (req,res,next)=>{

    }




feature wise our file can very big so we can move out the "controllerFunc" to a separate folder.

feature_Controller.js


 ----------------------------------------------------------->

<!--
if the server get a call with unknown route then we can set a function to automatically send a response for unknown routs.

app.all('*', (req, res) => {
  res.send('No Route Found')
})

 ----------------------------------------------------------->

<!-- doc of the route
we need to add some doc about the api to understandable for everyDevelopers

the doc syntax might be like bellow
-------------------GET COMMENT
  /**
   * @api {get} /tools All tools
   * @apiDescription Get all the tools
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [limit=10]  Users per page
   *
   * @apiSuccess {Object[]} all the tools.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */


-------------------POST COMMENT
  /** for post route

   * @api {post} /tools add a tool
   * @apiDescription Post a tool
   * @apiPermission anyone

   * @apiHeader {String} Authorization   User's access token

   * @apiSuccess {Object[]} one of all data.

   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data

    */
 ----------------------------------------------------------->

<!-- VERSION OF API

we need to add version no as another layer.
so we can make more versions of our api and if we face any prb with the latest version of api we can rollback to v1;
app.use('/api/v1/baseURL', featureRouter)

we need to create separate folder for each version of api

 ----------------------------------------------------------->

<!-- EXPRESS destructuring

we can destructure req of express like bellow

    const { ip, query, params, body, headers } = req;

    const {send, download, redirect} = res;




 ----------------------------------------------------------->

<!-- express middleware

 express middleware is a normal middleware it's a function, its take 3 parameters(req,res,next){}
 a middleware function can:-
 send.response()
 call the nest middleware in the stack.

 there are 5 kinds of middleware.
 1.application level middleware //=> it will work through the whole application and it will execute for every call.

 we need to use the application level middleware on the top of all the routes. so every time the server get call it will the value.
 app.use(middleware);

 2.middleware for specific route
 featureRouter.route('/:id').get(specificMiddleware, featureController.getAllDetails)

 3.buildIn middleware
 like
 app.use(express.json()); //we can accept json data from request body.

 4.errorHandler middleware
 before listen the app
 app.use(errorHandler);

 ans at the end of the server we need to pass this because if the errorHandler middleWare can't manipulate the error then this will close the app.

process.on('unhandledRejection', (error) => {
  console.error(error.name, error.message);
  app.close(() => {
    precess.exit(1);
  });
});

 5.thirdParty middleware
 // installed library will provide it to us like bellow.
 const cors = require("cors");
 app.use(cors());

 or we can use ------npm i express-rate-limit------ //with this middleware we can set limit of a request of a server or into a server's specific route.
 featureRouter.route('/:id').get(middleware, limiter, featureController.getAllDetails)



 -->
