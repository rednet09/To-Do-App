const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 5000;

let newItems = ["buy food", "make food", "eat food"];
let workItems = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.get("/", function (req, res) {
  let today = new Date();

  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  let day = today.toLocaleDateString("en-US", options);
  res.render("list", { listTitle: day, newListItem: newItems });
});

app.post("/", function (req, res) {
  let Items = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(Items);
    res.redirect("/work");
  } else {
    newItems.push(Items);
    res.redirect("/");
  }
});

app.get("/work", function (req, res) {
  res.render("list", {
    listTitle: "Work List",
    newListItem: workItems,
  });
});

app.get("/about", function(req, res){
  res.render("about");
})

app.listen(process.env.PORT || port, function () {
  console.log("server started on port 3000");
});
