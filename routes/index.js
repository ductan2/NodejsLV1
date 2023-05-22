var express = require('express');
var router = express.Router();
const itemsRouter=require('./items')
const dashboardRouter=require('./dashboard')
/* GET home page. */
router.use('/admin/item',itemsRouter);
router.use('/admin/dashboard',dashboardRouter)


module.exports = router;
