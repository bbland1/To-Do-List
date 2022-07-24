// inital dependencies & variables need for setup
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// app variables
const port = 3000;
const app = express();


// Middleware
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB");

const itemsSchema = new mongoose.Schema({
  name: String
});

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
  name: "Welcome to the todolist!"
});

const item2 = new Item({
  name: "Hit the + button to add a new item."
});

const item3 = new Item({
  name: "<-- Hit this to mark as done."
});

const defaultItems = [item1, item2, item3];

// Todo app
// home route
app.get('/', (req, res) => {

  Item.find({}, (err, foundItems) => {

    if (foundItems.length === 0) {
      Item.insertMany(defaultItems, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully added default items to database.");
        }
      });
      res.redirect("/");
    }
    else {
      res.render("list", {
        listTitle: "Today",
        newListItems: foundItems
      });
    }
  });
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