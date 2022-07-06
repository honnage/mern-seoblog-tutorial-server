const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// routes
const blogRoutes = require('./routes/blog')
const authRoutes = require('./routes/auth')

// app
const app = express();

// db
mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //   useCreatendex: true,
    //   useFindAndModify: false,
  })
  .then(() => console.log("Database connected"))
  .catch(err => {
    console.log(err);
  });

// middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());

// core
if (process.env.NODE_ENV === "development") {
  app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}

// routes middlewares
app.use('/api', blogRoutes)
app.use('/api', authRoutes)

// port
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
