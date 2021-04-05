const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/foodTimetableDB", {useNewUrlParser: true})




const solidsSchema = {
  name: String,
  item: String
};

const Solid = mongoose.model("Solid", solidsSchema);

const fruitsSchema = {
  name: String,
  item: String
};

const Fruit = mongoose.model("Fruit", fruitsSchema);

const soupsSchema = {
  name: String,
  item: String
};

const Soup = mongoose.model("Soup", soupsSchema);


var  foundsolidb, foundfruitb, foundsoupb, foundsolidl, foundfruitl, foundsoupl, foundsolidd, foundfruitd, foundsoupd;



app.get("/", function(req, res){
  res.render("index");
});

app.route("/addFood")

.get(function(req, res){
  res.render("addFood",
  {solidtext: "", fruittext: "", souptext: ""}
);
});



app.post("/addFoodsolids", function(req, res){
   const addedSolid = req.body.solid;
   const mealType = req.body.mealType;
   const solid = new Solid ({
     name: mealType,
     item: addedSolid
   });
   solid.save();
   res.render("addFood", {
     solidtext: "Succesfully added solid",
     fruittext: "",
     souptext: ""
   });
});

app.post("/addFoodfruits", function(req, res){
  const addedFruit = req.body.fruit;
  const mealType = req.body.mealType;
  const fruit = new Fruit ({
    name: mealType,
    item: addedFruit
  });
  fruit.save();
  res.render("addFood", {
    solidtext: "",
    fruittext: "Succesfully added fruit",
    souptext: ""
  });
});

app.post("/addFoodsoups", function(req, res){
  const mealType = req.body.mealType;
  const addedSoup = req.body.soup;
  const soup = new Soup ({
    name: mealType,
    item: addedSoup
  });
  soup.save();
  res.render("addFood", {
    solidtext: "",
    fruittext: "",
    souptext: "Succesfully added soup"
  });
});

Solid.find({name:"Bf"} , function(err, foundSolid){
    foundsolidb = foundSolid;
});
Soup.find({name:"Bf"}, function(err, foundSoup){
    foundsoupb = foundSoup;
});
Fruit.find({name:"Bf"}, function(err, foundFruit){
    foundfruitb = foundFruit;
});
Solid.find({name:"L"} , function(err, foundSolid){
    foundsolidl = foundSolid;
});
Soup.find({name:"L"}, function(err, foundSoup){
    foundsoupl = foundSoup;
});
Fruit.find({name:"L"}, function(err, foundFruit){
    foundfruitl = foundFruit;
});
Solid.find({name:"D"} , function(err, foundSolid){
    foundsolidd = foundSolid;
});
Soup.find({name:"D"}, function(err, foundSoup){
    foundsoupd = foundSoup;
});
Fruit.find({name:"D"}, function(err, foundFruit){
    foundfruitd = foundFruit;
});


app.post("/getTable", function(req, res){

  Solid.find({name:"Bf"} , function(err, foundSolid){
      foundsolidb = foundSolid;
  });
  Soup.find({name:"Bf"}, function(err, foundSoup){
      foundsoupb = foundSoup;
  });
  Fruit.find({name:"Bf"}, function(err, foundFruit){
      foundfruitb = foundFruit;
  });
  Solid.find({name:"L"} , function(err, foundSolid){
      foundsolidl = foundSolid;
  });
  Soup.find({name:"L"}, function(err, foundSoup){
      foundsoupl = foundSoup;
  });
  Fruit.find({name:"L"}, function(err, foundFruit){
      foundfruitl = foundFruit;
  });
  Solid.find({name:"D"} , function(err, foundSolid){
      foundsolidd = foundSolid;
  });
  Soup.find({name:"D"}, function(err, foundSoup){
      foundsoupd = foundSoup;
  });
  Fruit.find({name:"D"}, function(err, foundFruit){
      foundfruitd = foundFruit;
  });
  if (foundsoupb.length < 1){
    res.render("addFood", {
      solidtext: "",
      fruittext: "",
      souptext: "Please add 2 or more breakfast soups/stews"
    });
  }
  else if (foundsoupl.length < 1){
    res.render("addFood", {
      solidtext: "",
      fruittext: "",
      souptext: "Please add 2 or more lunch soups/stews"
    });
  }
  else if (foundsoupd.length < 1){
    res.render("addFood", {
      solidtext: "",
      fruittext: "",
      souptext: "Please add 2 or more dinner soups/stews"
    });
  }
  else if (foundsolidb.length < 1){
    res.render("addFood", {
      solidtext: "Please add 2 or more breakfast solids",
      fruittext: "",
      souptext: ""
    });
  }
  else if (foundsolidl.length < 1){
    res.render("addFood", {
      solidtext: "Please add 2 or more lunch solids",
      fruittext: "",
      souptext: ""
    });
  }
  else if (foundsolidd.length < 1){
    res.render("addFood", {
      solidtext: "Please add 2 or more dinner solids",
      fruittext: "",
      souptext: ""
    });
  }
  else if (foundfruitb.length < 1){
    res.render("addFood", {
      solidtext: "",
      fruittext: "Please add 2 or more breakfast fruits",
      souptext: ""
    });
  }
  else if (foundfruitl.length < 1){
    res.render("addFood", {
      solidtext: "",
      fruittext: "Please add 2 or more lunch fruits",
      souptext: ""
    });
  }
  else if (foundfruitd.length < 1){
    res.render("addFood", {
      solidtext: "",
      fruittext: "Please add 2 or more dinner fruits",
      souptext: ""
    });
  }
  else {
    res.render("tables", {
      bm:  foundsolidb[Math.floor(Math.random()*foundsolidb.length)].item + " and " + foundsoupb[Math.floor(Math.random()*foundsoupb.length)].item,
      lm: foundsolidl[Math.floor(Math.random()*foundsolidl.length)].item + " and " + foundsoupl[Math.floor(Math.random()*foundsoupl.length)].item,
      dm:  foundsolidd[Math.floor(Math.random()*foundsolidd.length)].item + " and " + foundsoupd[Math.floor(Math.random()*foundsoupd.length)].item,
      bt: foundsolidb[Math.floor(Math.random()*foundsolidb.length)].item + " and " + foundsoupb[Math.floor(Math.random()*foundsoupb.length)].item,
      lt: foundsolidl[Math.floor(Math.random()*foundsolidl.length)].item  + " and " + foundsoupl[Math.floor(Math.random()*foundsoupl.length)].item,
      dt:foundsolidd[Math.floor(Math.random()*foundsolidd.length)].item  + " and " + foundsoupd[Math.floor(Math.random()*foundsoupd.length)].item,
      bw: foundsolidb[Math.floor(Math.random()*foundsolidb.length)].item + " and " + foundsoupb[Math.floor(Math.random()*foundsoupb.length)].item,
      lw:foundsolidl[Math.floor(Math.random()*foundsolidl.length)].item  + " and " + foundsoupl[Math.floor(Math.random()*foundsoupl.length)].item,
      dw:foundsolidd[Math.floor(Math.random()*foundsolidd.length)].item  + " and " + foundsoupd[Math.floor(Math.random()*foundsoupd.length)].item,
      bth: foundsolidb[Math.floor(Math.random()*foundsolidb.length)].item + " and " + foundsoupb[Math.floor(Math.random()*foundsoupb.length)].item,
      lth:foundsolidl[Math.floor(Math.random()*foundsolidl.length)].item  + " and " + foundsoupl[Math.floor(Math.random()*foundsoupl.length)].item,
      dth:foundsolidd[Math.floor(Math.random()*foundsolidd.length)].item  + " and " + foundsoupd[Math.floor(Math.random()*foundsoupd.length)].item,
      bf: foundsolidb[Math.floor(Math.random()*foundsolidb.length)].item + " and " + foundsoupb[Math.floor(Math.random()*foundsoupb.length)].item,
      lf:foundsolidl[Math.floor(Math.random()*foundsolidl.length)].item  + " and " + foundsoupl[Math.floor(Math.random()*foundsoupl.length)].item,
      df:foundsolidd[Math.floor(Math.random()*foundsolidd.length)].item  + " and " + foundsoupd[Math.floor(Math.random()*foundsoupd.length)].item,
      bsa:foundsolidb[Math.floor(Math.random()*foundsolidb.length)].item + " and " + foundsoupb[Math.floor(Math.random()*foundsoupb.length)].item,
      lsa:foundsolidl[Math.floor(Math.random()*foundsolidl.length)].item  + " and " + foundsoupl[Math.floor(Math.random()*foundsoupl.length)].item,
      dsa:foundsolidd[Math.floor(Math.random()*foundsolidd.length)].item  + " and " + foundsoupd[Math.floor(Math.random()*foundsoupd.length)].item,
      bs: foundsolidb[Math.floor(Math.random()*foundsolidb.length)].item + " and " + foundsoupb[Math.floor(Math.random()*foundsoupb.length)].item,
      ls:foundsolidl[Math.floor(Math.random()*foundsolidl.length)].item  + " and " + foundsoupl[Math.floor(Math.random()*foundsoupl.length)].item,
      ds:foundsolidd[Math.floor(Math.random()*foundsolidd.length)].item + " and " + foundsoupd[Math.floor(Math.random()*foundsoupd.length)].item
    });
  }
});















app.listen(3000, function(){
  console.log("Server running on port 3000");
})
