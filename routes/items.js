const express = require('express');
const router = express.Router();
const itemModal = require('../schemas/items');
router.get('/', (req, res, next) => {
    let statusFilter = [
        { name: 'ALL', value: 'all', count: 0, link: '#', class: 'default' },
        {
            name: 'ACTIVE',
            value: 'active',
            count: 0,
            link: '#',
            class: 'success'
        },
        {
            name: 'INACTIVE',
            value: 'inactive',
            count: 0,
            link: '#',
            class: 'default'
        }
    ];
     statusFilter.forEach((st, index) => {
        let condition = {};
        if (st.value != 'all') {
            condition = { status: st.name };
            console.log('condition', condition);
        }
      
        itemModal
            .countDocuments(condition)
            .then((data) => {
              
                statusFilter[index].count = data;
            })
            .catch((err) => console.log(err));
    });
    itemModal
        .find({})
        .then((items) => {
            res.render('pages/items/list', {
                item: items,
                statusFilter,
                title: 'Page - list'
            });
        })
        .catch((err) => {
            console.log(err);
            res.render('pages/items/list', { title: 'Page - list' });
        });
});
router.get('/add', (req, res, next) => {
    res.render('pages/items/add', { title: 'Page - add' });
});

module.exports = router;
