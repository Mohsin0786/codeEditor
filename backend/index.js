const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");
let axios = require("axios");
const Snippet = require("./models/snippet");
const mongoose = require("mongoose");
app.use(cors());

app.use(express.json());
mongoose
  .connect(
    "mongodb+srv://Khan:oPtvLQLycrPJvzxm@cluster0.jrv50.mongodb.net/Editor?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
  )
  .then(() => {
    console.log("Successfully connected to MongoDB Atlas!");
  })
  .catch((error) => {
    console.log("Unable to connect to MongoDB Atlas!");
    console.error(error);
  });
//fetching card at dashboard
app.get("/", (req, res) => {
  Snippet.find()
    .then((productData) => {
      res.status(200).json({ data: productData });
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
});
//Getting the Saved code in playground
app.get("/savecode/:editorID", (req, res) => {
  Snippet.find({ _id: req.params.editorID })
    .then((productData) => {
      res.status(200).json({ data: productData });
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
});

//Saving the code in playground
app.post("/savecode", (req, res) => {
  Snippet.findOneAndUpdate(
    { _id: req.body.editorID },
    { code: req.body.codedata },
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        console.log(err);
        res.send(result);
      }
    }
  );
});
let returnData = {};
//Hitting API for code completion result
app.post("/postcode", (req, res) => {
  var data = JSON.stringify({
    code: `${req.body.codedata}`,
    language: `${req.body.lang}`,
    input: "",
  });

  var config = {
    method: "post",
    url: "https://codexweb.netlify.app/.netlify/functions/enforceCode",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      returnData = response.data;
    })
    .then(() => {
      res.status(200).json({ message: returnData });
    })
    .catch(function (error) {
      console.log(error);
    });
});

//Saving snippet 
app.post("/postsnippet", (req, res) => {
  const snippet = new Snippet({
    projectName: req.body.snippet_name,
    language: req.body.language,
    code: req.body.code,
  });

  snippet
    .save()
    .then(() => {
      res.status(201).json({ message: snippet });
    })
    .catch(() => {
      res.status(201).json({ message: "failed" });
    });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
