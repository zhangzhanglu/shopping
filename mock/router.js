const express = require("express");
const router = express.Router();
const SQLConnect = require("./SQLConnect.js");
const url = require('url');
const fs = require('fs');
const multer=require('multer');

router.post("/login", function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    if (username === 'iwen' && password === '123') {
        res.send({
            code: 200,
            msg: "登陆成功",
            username: "iwen",
            token: "W3ER33TRHE435TERTG45edE"
        })
    } else {
        res.send({
            code: 500,
            msg: "登陆失败"
        })
    }
})

/**
 * 1.产品查询接口
 */
router.get("/backend/item/selectTbItemAllByPage", (req, res) => {
    var page = url.parse(req.url, true).query.page || 1;
    const sql = "select * from project limit 10 offset " + (page - 1) * 10;
    SQLConnect(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                data: {
                    result: result
                }
            });
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            });
        }

    })
})

/**
 * 2.类目选择接口
 */
router.get("/backend/itemCategory/selectItemCategoryByParentId", (req, res) => {
    var id = url.parse(req.url, true).query.id || 1;
    const sql = "select * from category where id=?";
    var arr = [id]
    SQLConnect(sql, arr, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                data: result
            });
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            });
        }
    })
})

/**
 * 3.图片上传
 */
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './mock/upload/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

var createFolder = function (folder) {
    try {
        fs.accessSync(folder);
    } catch (e) {
        fs.mkdirSync(folder);
    }
};
var uploadFolder = './mock/upload/';
createFolder(uploadFolder);
var upload = multer({ storage: storage });

router.post('/upload', upload.single('file'), function (req, res, next) {
    var file = req.file;
    console.log('文件类型：%s', file.mimetype);
    console.log('原始文件名：%s', file.originalname);
    console.log('文件大小：%s', file.size);
    console.log('文件保存路径：%s', file.path);
    res.json({ res_code: '0', name: file.originalname, url: file.path });
});

/**
 * 4.添加产品
 */
router.get("/backend/item/insertTbItem", (req, res) => {
    var title = url.parse(req.url, true).query.title;
    var sellPoint = url.parse(req.url, true).query.sellPoint;
    var price = url.parse(req.url, true).query.price;
    var num = url.parse(req.url, true).query.num;
    var cid = url.parse(req.url, true).query.cid;
    var desc = url.parse(req.url, true).query.desc;
    var image = url.parse(req.url, true).query.image;

    const sql = "insert into project values (null,?,?,?,?,?,?,'','1','','',?)";
    var arr = [title,image,sellPoint,price,cid,num,desc];
    SQLConnect(sql, arr, (result) => {
        if (result.affectedRows > 0) {
            res.send({
                status:200,
                success: true
            })
        } else {
            res.status(500).send({
                msg: "添加失败"
            });
        }
    })
})

/**
 * 5.删除产品
 */

router.get("/backend/item/deleteItemById", (req, res) => {
    var id = url.parse(req.url, true).query.itemId;
    const sql = "DELETE FROM `project` WHERE id=?";
    var arr = [id];
    SQLConnect(sql, arr, (result) => {
        if (result.affectedRows > 0) {
            res.send({
                status:200,
                success: true
            })
        } else {
            res.status(500).send({
                msg: "删除失败"
            });
        }
    })
})

/**
 * 6.预更新产品
 */
router.get("/backend/item/preUpdateItem", (req, res) => {
    var id = url.parse(req.url, true).query.itemId;
    const sql = "select * from project where id=?";
    var arr = [id]
    SQLConnect(sql, arr, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                data:result[0]
            });
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            });
        }
    })
})


/**
 * 7.修改产品
 */

router.get("/backend/item/updateTbItem", (req, res) => {
    var id = url.parse(req.url, true).query.id;
    var title = url.parse(req.url, true).query.title;
    var sellPoint = url.parse(req.url, true).query.sellPoint;
    var price = url.parse(req.url, true).query.price;
    var num = url.parse(req.url, true).query.num;
    var cid = url.parse(req.url, true).query.cid;
    var desc = url.parse(req.url, true).query.desc;
    var image = url.parse(req.url, true).query.image;

    const sql = "update project set title=?,image=?,sellPoint=?,price=?,cid=?,num=?,barcode='',status='',created='',updated='' WHERE id=?";
    var arr = [title,image,sellPoint,price,cid,num,id]
    SQLConnect(sql, arr, (result) => {
        console.log(result);
        
        if (result.affectedRows > 0) {
            res.send({
                status:200,
                success: true
            })
        } else {
            res.status(500).send({
                msg: "修改失败"
            });
        }
    })
})


/**
 * 8.规格参数查询
 */
router.get("/backend/itemParam/selectItemParamAll", (req, res) => {
    var page = url.parse(req.url, true).query.page || 1;
    const sql = "select * from params limit 10 offset " + (page - 1) * 10;
    SQLConnect(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                data: {
                    result: result
                }
            });
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            });
        }
    })
})

/**
 * 9.规格参数 添加
 */

router.get("/backend/itemParam/insertItemParam", (req, res) => {
    var itemCatId = url.parse(req.url, true).query.itemCatId;
    var paramData = url.parse(req.url, true).query.paramData;
    const sql = "insert into params values (null,?,?,'','')";
    var arr = [itemCatId,paramData];
    SQLConnect(sql, arr, (result) => {
        if (result.affectedRows > 0) {
            res.send({
                status:200,
                success: true
            })
        } else {
            res.status(500).send({
                msg: "添加失败"
            });
        }
    })
})


/**
 * 10.规格参数 删除
 */
router.get("/backend/itemParam/deleteItemParamById", (req, res) => {
    var id = url.parse(req.url, true).query.id;
    const sql = "DELETE FROM `params` WHERE id=?";
    var arr = [id];
    SQLConnect(sql, arr, (result) => {
        if (result.affectedRows > 0) {
            res.send({
                status:200,
                success: true
            })
        } else {
            res.status(500).send({
                msg: "删除失败"
            });
        }
    })
})

/**
 * 11.规格参数 查询，根据id
 */
router.get("/backend/itemParam/selectItemParamByItemCatId", (req, res) => {
    var id = url.parse(req.url, true).query.id;
    const sql = "select * from params where id=?";
    var arr = [id]
    SQLConnect(sql, arr, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                data:result[0]
            });
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            });
        }
    })
})

/**
 * 内容管理分类 查询
 */

router.get("/content/selectContentCategoryByParentId", (req, res) => {
    var id = url.parse(req.url, true).query.id || 1;
    const sql = "select * from content where id=?";
    var arr = [id]
    SQLConnect(sql, arr, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                data: result
            });
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            });
        }
    })
})


/**
 * 内容管理分类 添加
 */
router.get("/content/insertContentCategory", (req, res) => {
    var pid = url.parse(req.url, true).query.pid;
    var name = url.parse(req.url, true).query.name;
    var currentId = Math.floor(Math.random()*100000);
    const sql = "insert into content values (?,?,?)";
    var arr = [pid,name,currentId];
    SQLConnect(sql, arr, (result) => {
        if (result.affectedRows > 0) {
            res.send({
                status:200,
                success: true
            })
        } else {
            res.status(500).send({
                msg: "添加失败"
            });
        }
    })
})

/**
 * 内容管理分类 删除
 */

router.get("/content/deleteContentCategoryById", (req, res) => {
    var id = url.parse(req.url, true).query.id;
    const sql = "DELETE FROM `content` WHERE pid=?";
    var arr = [id];
    SQLConnect(sql, arr, (result) => {
        if (result.affectedRows > 0) {
            res.send({
                status:200,
                success: true
            })
        } else {
            res.status(500).send({
                msg: "删除失败"
            });
        }
    })
})

/**
 * 内容分类管理 修改
 */
router.get("/content/updateContentCategory", (req, res) => {
    var id = url.parse(req.url, true).query.id;
    var name = url.parse(req.url, true).query.name;

    const sql = "update content set name=? WHERE pid=?";
    var arr = [name,id]
    SQLConnect(sql, arr, (result) => {
        if (result.affectedRows > 0) {
            res.send({
                status:200,
                success: true
            })
        } else {
            res.status(500).send({
                msg: "修改失败"
            });
        }
    })
})

/**
 * 内容分类管理内容 查询
 */
router.get("/content/selectTbContentAllByCategoryId", (req, res) => {
    var id = url.parse(req.url, true).query.id;
    const sql = "select * from contentinfo where pid=?";
    var arr = [id]
    SQLConnect(sql, arr, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                data: result
            });
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            });
        }
    })
})

/**
 * 内容分类管理内容 添加
 */
router.get("/content/insertTbContent", (req, res) => {
    var pid = url.parse(req.url, true).query.pid;
    var name = url.parse(req.url, true).query.name;
    var gurl = url.parse(req.url, true).query.url;
    var image = url.parse(req.url, true).query.image;
    const sql = "insert into contentinfo values (null,?,?,?,?)";
    var arr = [pid,name,gurl,image];
    SQLConnect(sql, arr, (result) => {
        if (result.affectedRows > 0) {
            res.send({
                status:200,
                success: true
            })
        } else {
            res.status(500).send({
                msg: "添加失败"
            });
        }
    })
})

/**
 * 内容分类管理内容 添加
 */

router.get("/content/deleteContentByIds", (req, res) => {
    var id = url.parse(req.url, true).query.id;
    const sql = "DELETE FROM `contentinfo` WHERE id=?";
    var arr = [id];
    SQLConnect(sql, arr, (result) => {
        if (result.affectedRows > 0) {
            res.send({
                status:200,
                success: true
            })
        } else {
            res.status(500).send({
                msg: "删除失败"
            });
        }
    })
})

module.exports = router;