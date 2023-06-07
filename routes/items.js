const express = require("express");
const router = express.Router();
const itemModal = require("../schemas/items");
const createFilterStatus = require("../helpers/utils");
const { getParams } = require("../helpers/params");
const backLink="/admin/item"


router.get("(/:status)?", async (req, res, next) => {
  let objwhere = {};
  let currenStatus = await getParams(req.params, "status", "all");
  let searchParams = await getParams(req.query, "search", "");
  const statusFilter = createFilterStatus(currenStatus);
  //obj pagination
  let pagination = {
    currentPage: 1,
    totalItemPerPage: 4,
    totalItem: 1,
    pageRange: 3,
  };

  if (currenStatus !== "all") {
    objwhere = { status: currenStatus.toUpperCase() };
  }
  if (searchParams !== "") {
    objwhere = { ...objwhere, name: new RegExp(searchParams, "i") };
  }
  pagination.currentPage = parseInt(await getParams(req.query, "page", 1));

  await itemModal.count(objwhere).then((data) => {
    pagination.totalItem = data;
  });

  await itemModal
    .find(objwhere)
    .sort({ name: -1 })
    .limit(pagination.totalItemPerPage)
    .skip((pagination.currentPage - 1) * pagination.totalItemPerPage)
    .then((items) => {
      res.render("pages/items/list", {
        item: items,
        statusFilter,
        currenStatus,
        pagination,
        searchParams,
        title: "Page - list",
      });
    })
    .catch((err) => {
      console.log(err);
      res.render("pages/items/list", { title: "Page - list" });
    });
});

router.get("/change-status/:status/:id", (req, res, next) => {
  let currenStatus = getParams(req.params, "status", "all");
  let id = getParams(req.params, "id", "");
  // change status with findAndUpdateOne
  let status = currenStatus === "active" ? "inactive" : "active";
  itemModal
    .updateOne({ _id: id }, { status: status.toLocaleUpperCase() })
    .then((success) => {
      res.redirect(backLink);
    });
});

//delete item
router.get("/delete/:id", (req, res, next) => {
  let id = getParams(req.params, "id", "");
  itemModal.deleteOne({ _id: id }).then((success) => {
    res.redirect(backLink);
  });
});

router.post("/change-status/:status", (req, res, next) => {
  let currentStatus = getParams(req.params, "status", "");
  itemModal
    .updateMany({ _id: { $in: req.body.cid } }, { status: currentStatus.toUpperCase() })
    .then(() => {
        res.redirect(backLink);
    })
    .catch((err) => console.log(err));
});
router.post("/delete",(req,res,next)=>{
    itemModal.deleteMany({_id:{$in:req.body.cid}}).then(()=>{
        res.redirect(backLink)
    })
})

router.get("/add", (req, res, next) => {
  res.render("pages/items/add", { title: "Page - add" });
});

module.exports = router;
