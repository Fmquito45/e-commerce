const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
  // be sure to include its associated Product data
  const tagData = await Tag.findAll({ include: [{ model: Product}]});
  res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
  // be sure to include its associated Product data
  const tagData = await Tag.findByPk(req.params.id, { include: [{ model: Product}]});
  if (!tagData) {
    res.status(500).json(err);
    return;
  }
  res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
  // create a new tag
  const tagData = await Tag.create(req.body);
  res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
  // update a tag's name by its `id` value
  const updateTag = await Tag.update(req.body, { where: {id: req.params.id}});
  if (!updateTag[0]) {
    res.status(500).json(err);
    return;
  }
  res.status(200).json(updateTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
  // delete on tag by its `id` value
  const deleteTag = await Tag.destroy( {where: { id: req.params.id}});
  if (!deleteTag) {
    res.status(500).json(err);
    return;
  }
  res.status(200).json(deleteTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
