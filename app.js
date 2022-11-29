// inital dependencies & variables need for setup
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const _ = require('lodash');

// app variables
const app = express();

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}


// Middleware
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Setting up a database this local would be set to the proper database server for the live app not included here for security
mongoose.connect(process.env.MONGO_DB);

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

const listSchema = new mongoose.Schema({
  name: String,
  items: [itemsSchema]
});

const List = mongoose.model("List", listSchema);

// Todo app
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

// functionality to make the custom lists
app.get("/:customListName", (req, res) => {
  const customListName = _.capitalize(req.params.customListName);

  List.findOne({ name: customListName }, (err, foundLists) => {
    if (!err) {
      if (!foundLists) {
        // Create a new List
        List.create({
          name: customListName,
          items: defaultItems
        });
        res.redirect("/" + customListName);
      }
      else {
        // Show existing Lists
        res.render("list", {
          listTitle: foundLists.name,
          newListItems: foundLists.items
        });
      }
    }
  });
})

// functionality to add a new item to the list & database
app.post("/", (req, res) => {
  const itemName = req.body.newItem;
  const listName = req.body.list;

  const newItem = new Item({
    name: itemName
  });

  if (listName === "Today") {
    newItem.save();
    res.redirect("/");
  } else {
    // find the custom list and add item specifically to it
    List.findOne({ name: listName }, (err, foundList) => {
      foundList.items.push(newItem);
      foundList.save();
      res.redirect("/" + listName)
    })
  }
});

// functionality to remove the completed item from list & database
app.post("/delete", (req, res) => {
  const completedItemId = req.body.checkbox;
  const listName = req.body.listName;

  if (listName === "Today") {
    Item.findByIdAndRemove(completedItemId, (err) => {
      if (!err) {
        console.log("Item deleted from database.");
        res.redirect("/");
      }
    });
  } else {
    // find the custome list item to delete properly
    List.findOneAndUpdate(
      { name: listName },
      { $pull: { items: { _id: completedItemId } } },
      (err, foundList) => {
        if (!err) {
          console.log("Item deleted from database.");
          res.redirect("/" + listName);
        }
      });
  }
});

// Port to listen for from the server 
app.listen(port, () => {
  console.log(`Sever started on port ${port}`)
});