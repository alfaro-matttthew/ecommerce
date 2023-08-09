const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll({
      include: { model: Product },
    });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categories = await Category.findByPk(req.params.id, {
      include: { model: Product },
    });

    if (!categories) {
      res.status(404).json({ message: "No category found with that id!" });
      return;
    }

    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new product
router.post("/", (req, res) => {
  /* req.body should look like this...
     {
        "category_name": "Basketball"
      }
  */
  Category.create(req.body)
    .then((category) => {
      res.status(200).json(category);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put("/:id", (req, res) => {
  // update product data
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  }).then((categories) => res.status(200).json(categories))
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});

router.delete("/:id", (req, res) => {
  // delete one product by its `id` value
  Category.destroy({
    where: { id: req.params.id }
  }).then((categories) => res.status(200).json(categories))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

module.exports = router;
