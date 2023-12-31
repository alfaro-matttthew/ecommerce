const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll({
      include: { model: Product },
    });
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findByPk(req.params.id, {
      include: { model: Product },
    });

    if (!tags) {
      res.status(404).json({ message: "No tag found with that id!" });
      return;
    }

    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", (req, res) => {
  /* req.body should look like this...
     {
        "tag_name": "Basketball"
      }
  */
  Tag.create(req.body)
    .then((tag) => {
      res.status(200).json(tag);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put("/:id", (req, res) => {
  // update product data
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  }).then((tags) => res.status(200).json(tags))
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});

router.delete("/:id", (req, res) => {
  // delete one product by its `id` value
  Tag.destroy({
    where: { id: req.params.id },
  })
    .then((tags) => res.status(200).json(tags))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

module.exports = router;
