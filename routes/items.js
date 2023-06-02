const express = require('express');
const router = express.Router();
const itemModal = require('../schemas/items');
const createFilterStatus = require('../helpers/utils');
const { getParams } = require('../helpers/params');
router.get('(/:status?)', async (req, res, next) => {
    let objwhere = {};
    let currenStatus = await getParams(req.params, 'status', 'all');
    let searchParams = await getParams(req.query, 'search', '');
    const statusFilter = createFilterStatus(currenStatus);

    //obj pagination
    let pagination = {
        currentPage: 1,
        totalItemPerPage: 2,
        totalItem: 1,
        pageRange: 3
    };

    if (currenStatus !== 'all') {
        objwhere = { status: currenStatus.toUpperCase() };
    }
    if (searchParams !== '') {
        objwhere = { ...objwhere, name: new RegExp(searchParams, 'i') };
    }
    pagination.currentPage = parseInt(await getParams(req.query, 'page', 1));

    await itemModal.count(objwhere).then((data) => {
        pagination.totalItem = data;
    });

    await itemModal
        .find(objwhere)
        .sort({ name: -1 })
        .limit(pagination.totalItemPerPage)
        .skip((pagination.currentPage - 1) * pagination.totalItemPerPage)
        .then((items) => {
            res.render('pages/items/list', {
                item: items,
                statusFilter,
                currenStatus,
                pagination,
                searchParams,
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
