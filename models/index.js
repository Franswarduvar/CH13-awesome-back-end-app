// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: "catagory_name"
})
// Categories have many Products
Category.belongsTo(Product, {
  foreignKey: "catagory_name"
})
// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: "product_id"
})
// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
through: ProductTag,
foreignKey: "tag_id"
})
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
