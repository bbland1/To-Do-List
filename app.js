// inital dependencies & variables need for setup
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const date = require(__dirname + "/date.js");


// Middleware
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

// app variables
const port = 3000;

const items = [
  "Do yoga",
  "Buy apples",
  "Take the dogs for a walk"
];

const workItems = [
  "Put in vacation time",
  "Do coworker code review"
];


// Todo app
// home route
app.get('/', (req, res) => {
  const day = date.getDate();

  res.render("list", { listTitle: day, newListItems: items })
});

// taking the inputed new item from the form and inputing it into the list
app.post("/", (req, res) => {
  const item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  }
  else {
    items.push(item);
    res.redirect("/");
  }
});

// making a list with the name work list 
app.get("/work", (req, res) => {
  res.render("list", { listTitle: "Work List", newListItems: workItems })
});

app.get("/about", (req, res) => {
  res.render("about")
})

// Port to listen for from the server 
app.listen(port, () => {
  console.log(`Sever started on port ${port}`)
})