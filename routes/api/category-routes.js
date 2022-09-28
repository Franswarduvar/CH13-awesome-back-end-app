const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products 
  Category.findAll({
    include: {
      module: Product,
      contense: ["id", "product_name", "price", "stock", "catagory_id"]
    }
  }) .then(dbDataUnfound => {
    if(!dbDataUnfound){
      res.status(404).json({message: "Sorry buddy can't find nothin here"})
      return;
    } res.json({message: "working"});
  }) .catch(Oops => {
      console.log(Oops);
      res.status(500).json(Oops.message)
  })
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: {
      module: Product,
      contense:  ["id", "product_name", "price", "stock", "catagory_id"]
    }
  }) .then(dbDataUnfound => {
    if(!dbDataUnfound){
      res.status(404).json({message: "Sorry buddy can't find nothin here"})
      return;
    } res.json({message: "working"});
  }) .catch(Oops => {
      console.log(Oops);
      res.status(500).json(Oops.message)
  })
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    cat_name: req.body.cat_name
  }) .then(() => {res.status(201).json({message: "It's here!"});}
  ) .catch(Oops => {
      console.log(Oops);
      res.status(500).json(Oops.message)
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
 Category.update(req.body, {
  where:{
    id: req.params.id
  }
 })  .then(dbDataUnfound => {
    if(!dbDataUnfound){
      res.status(404).json({message: "Sorry buddy can't find nothin here"})
      return;
    } res.json({message: "working"});
  }) .catch(Oops => {
      console.log(Oops);
      res.status(500).json(Oops.message)
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
 Category.delete({
  where:{
    id: req.params.id
  }
 }) .then(dbDataUnfound => {
    if(!dbDataUnfound){
      res.status(404).json({message: "Sorry buddy can't find nothin here"})
      return;
    } res.json({message: "working"});
  }) .catch(Oops => {
      console.log(Oops);
      res.status(500).json(Oops.message)
  })
});

module.exports = router;
