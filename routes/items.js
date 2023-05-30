const express = require('express');
const router = express.Router();
const itemModal = require('../schemas/items');
const createFilterStatus = require('../helpers/utils');
const { getParams } = require('../helpers/params');
router.get('(/:status?)', (req, res, next) => {
    let objwhere = {};
    let currenStatus = getParams(req.params,'status','all');
    let searchParams=getParams(req.query,'search','');
    
    
    const statusFilter = createFilterStatus(currenStatus);
    if (currenStatus !== 'all') {
        objwhere = { status: currenStatus.toUpperCase()};
    }
    if(searchParams!==''){
        objwhere={...objwhere,name:new RegExp(searchParams, "i")};
    }
    
    itemModal
        .find(objwhere)
        .then((items) => {
            res.render('pages/items/list', {
                item: items,
                statusFilter,
                currenStatus,
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
