const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
    // find all tags
    try {
        const tagData = await Tag.findAll({
            include: [{ model: Product }]
        });
        res.status(200).json(tagData);
    // if error send back 500 status
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    // find a single tag by its `id`
    try {
        const tagData = await Tag.findByPk(req.params.id, {
            include: [{ model: Product }]
        });
        // if nothing in tagData send back 404 status
        if (!tagData) {
            res.status(404).json({ message: 'No tag with this id!' });
            return;
        }
        // something in tagData send back json data
        res.status(200).json(tagData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    // create a new tag
    try {
        const tagData = await Tag.create({
            tag_name: req.body.tag_name,
        });
        res.status(200).json(tagData);
    // if error arise send 400 status
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id', async (req, res) => {
    // update a tag's name by its `id` value
    try {
        const tagData = await Tag.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        // if no tagData send back 404 error
        if (!tagData[0]) {
            res.status(404).json({ message: 'No tag with this id!' });
            return;
        }
        // has something we send data back
        res.status(200).json(tagData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    // delete on tag by its `id` value
    try {
        const tagData = await Tag.destroy({
            where: {
                id: req.params.id,
            },
        });
        // nothing in tagData send back 404
        if (!tagData) {
            res.status(404).json({ message: 'No tag with this id!' });
            return;
        }
        // found it and delete
        res.status(200).json(tagData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
