const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products 
  Category.findAll({
    include: {
      model: Product,
      attributes: ["id", "product_name", "price", "stock", "category_id"]
    }
  }) .then(dbCategoryData => {
    if(!dbCategoryData){
      res.status(404).json({message: "Sorry buddy can't find nothin here"})
      return;
    } res.json(dbCategoryData);
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
      model: Product,
      attributes:  ["id", "product_name", "price", "stock", "category_id"]
    }
  }) .then(dbCategoryData => {
    if(!dbCategoryData){
      res.status(404).json({message: "Sorry buddy can't find nothin here"})
      return;
    } res.json(dbCategoryData);
  }) .catch(Oops => {
      console.log(Oops);
      res.status(500).json(Oops.message)
  })
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  }) 
  .then(dbCatData => res.json(dbCatData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
  // .then(() => {res.status(201).json({message: "It's here!"});}
  // ) 
  // .catch(Oops => {
  //     console.log(Oops);
  //     res.status(500).json(Oops.message)
  // })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
 Category.update(req.body, {
  where:{
    id: req.params.id
  }
 })  .then(dbCategoryData => {
    if(!dbCategoryData){
      res.status(404).json({message: "Sorry buddy can't find nothin here"})
      return;
    } res.json(dbCategoryData);
  }) .catch(Oops => {
      console.log(Oops);
      res.status(500).json(Oops.message)
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
 Category.destroy({
  where:{
    id: req.params.id
  }
 }) .then(dbCategoryData => {
    if(!dbCategoryData){
      res.status(404).json({message: "Sorry buddy can't find nothin here"})
      return;
    } res.json(dbCategoryData);
      console.log(Oops);
      res.status(500).json(Oops.message)
  })
});

module.exports = router;
