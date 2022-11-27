const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: {
      module: Product,
      attributes: ['product_name','stock','price','category_id']
    }
  }) 
  .then(dbTagData => res.json(dbTagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: {
      module: Product,
      attributes: ['product_name','stock','price','category_id']
    }
  }) 
  .then(dbTagData => res.json(dbTagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  }) 
  .then(dbTagData => res.json(dbTagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  }) 
  .then(dbTagData => {
    if(!dbTagData){
      res.status(404).json({message: 'Oh no bro no tag was found with this id :('})
    }
  })
   .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  }) 
  .then(dbTagData => {
    if(!dbTagData){
      res.status(404).json({message: 'Oooo ohhhh nooo bro I was unable to find a tag with this id'})
    }
  }) 
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
