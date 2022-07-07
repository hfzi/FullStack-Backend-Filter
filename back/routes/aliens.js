const express = require("express");
const router = express.Router();
const Alien = require("../models/alien");

router.get("/", async (req, res) => {
  try {
    const aliens = await Alien.find();
    res.json(aliens);
  } catch (err) {
    res.send("Error " + err);
  }
});

router.get("/path/:mark", function (req, res) {
  // url: /path/test
  console.log(req.params.mark); // result: test
  res.send(req.params.mark)
});

// Listing Cars
router.get("/query", function (req, res) {
  const arr = [];

  const name = req.query.name;
  const mark = req.query.mark;
  const model = req.query.model;
  const series = req.query.series;
  const country = req.query.country;

  console.log("isimler", name, mark);

  // name
  if (name) 
    if (Array.isArray(name)) 
      for (var j = 0; j < name.length; j++) 
        arr.push({ $and: [{ name: { $regex: name[j] } }] });
    else arr.push({ $and: [{ name: { $regex: name } }] });

  // mark
  if (mark)
    if (Array.isArray(mark))
      for (var j = 0; j < mark.length; j++)
        arr.push({ $and: [{ mark: { $regex: mark[j] } }] });
    else arr.push({ $and: [{ mark: { $regex: mark } }] });

  // model
  if (model) 
    if (Array.isArray(model)) 
      for (var j = 0; j < model.length; j++) 
        arr.push({ $and: [{ model: { $regex: model[j] } }] });
    else arr.push({ $and: [{ model: { $regex: model } }] });


  // series
  if (series) 
    for (var i = 0; i < series.length; i++) 
      arr.push({ $and: [{ series: series[i] }] });

  // country
  if (country)
    for (var i = 0; i < country.length; i++)
      arr.push({ $and: [{ country: country[i] }] });

  // Mongodb find() meth.
  if (name || mark || model || series || country)
    var sorgu = Alien.find(
      { $or: arr },
      " mark model series image",
      (err, alien) => res.json(alien)
    );
  else
    var sorgu = Alien.find(
      {},
      " mark model series image",
      (err, alien) => res.json(alien)
    );

});

router.post("/", async (req, res) => {
  console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", req.body)
  const alien = new Alien({
    name: req.body.name,
    mark: req.body.mark,
    model: req.body.model,
    series: req.body.series,
    country: req.body.country,
    image: req.body.image,
  });
  console.log("aliens'ler", alien);

  try {
    const a1 = await alien.save();
    res.json("eklendi");
  } catch (err) {
    res.send("Hata oldu");
    console.log("Hata oldu", err);
  }
});

module.exports = router;
