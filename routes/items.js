const express = require('express');
const router = express.Router();

router.get('/list', (req, res, next) => {
    res.render('pages/items/list', { title: 'Page - list' });
});
router.get('/add', (req, res, next) => {
    res.render('pages/items/add', { title: 'Page - add' });
});
router.get('/', (req, res, next) => {
   res.render('index', { title: 'Page ' });
});

module.exports = router;
