const express = require("express");
const cors = require("cors");
require("dotenv").config();
const dbConnect = require("./utils/dbConnect");
const tools_Routes = require("./routes/v1/tools_Rout");
const viewCount = require("./middleware/viewCount");
const { default: rateLimit } = require("express-rate-limit");
const limiter = require("./middleware/limiter");
const errorHandler = require("./middleware/errorHandler");
const app = express();
const port = process.env.PORT || 5000;
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY || null);

app.use(cors());
app.use(express.json());
// app.use(express.static('public'));
app.set('view engine', 'ejs')


// app.use(viewCount);



// app.use(limiter)

// sendMail()

dbConnect();

app.use('/users', tools_Routes)
// app.use('/api/v1/users', users_Routes)



app.get("/", (req, res) => {
  // res.send("Hello World");
  // res.sendFile(__dirname + "/public/index.html")

  // app.use(express.static('public'));
  // res.sendFile("index.html") // we can acces easily for this //=> app.use(express.static('public'));


  res.render('home.ejs', {
    id: 5,
    user: {
      name: "test"
    }
  })


});

app.all('*', (req, res) => {
  res.send('No Route Found')
})

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


process.on('unhandledRejection', (error) => {
  console.error(error.name, error.message);
  app.close(() => {
    precess.exit(1);
  });
});