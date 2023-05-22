const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('pages/items/list', { title: 'Page - list' });
});
router.get('/add', (req, res, next) => {
    res.render('pages/items/add', { title: 'Page - add' });
});


module.exports = router;
