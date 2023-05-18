var express = require('express');
var router = express.Router();
const itemsRouter=require('./items')
const dashboardRouter=require('./dashboard')
/* GET home page. */
router.use('/items',itemsRouter);
router.use('/dashboard',dashboardRouter)
module.exports = router;
