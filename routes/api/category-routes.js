const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
  // be sure to include its associated Products
  const categories = await Category.findAll({ include: [{ model: Product}]});
  res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
  // be sure to include its associated Products
  const category = await Category.findByPk(req.params.id, { include: [{model: Product}]});
  if (!category) {
    res.status(500).json(err);
    return;
  }
  res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
  // create a new category
  const newCategory = await Category.create(req.body);
  res.status(200).json(newCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
  // update a category by its `id` value
  const updateCat = await Category.update(req.body, {where: {id: req.params.id}});
  if (!updateCat) {
    res.status(500).json(err);
    return;
  }
  res.status(200).json(updateCat);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
  // delete a category by its `id` value
  const deleteCat = await Category.destroy({where: {id: req.params.id}});
  if (!deleteCat) {
    res.status(500).json(err);
    return;
  }
  res.status(200).json(deleteCat);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
