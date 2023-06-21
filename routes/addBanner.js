var express = require('express');
var router = express.Router();
var db=require('../sql.js');
var multiparty=require('multiparty');//用于处理 HTTP 请求中的表单数据，特别是处理包含文件上传的表单数据
// var multer = require('multer');
// var upload = multer({ dest: './public/upload' }); // 指定上传文件的目录

router.post('/', function(req, res, next) {
    var form=new multiparty.Form();
    //上传的图片需要保存到某一个目录下，必须已经创建好该目录
    form.uploadDir='./public/upload';
    form.parse(req,function (err,fields,files){
        var pic=files.pic[0].path;//图片路径
        var imgName=fields.imgName[0];//图片名称
        //0是因为设置了id为自增长
        db.query('insert into banner value (?,?,?)',[0,imgName,pic],function (err,data){
            if(err){
                throw err;
            }else{

                db.query('select * from banner',function (err,data){
                    if(err){
                        throw err;
                    }else{
                        var pager = { maxNum: 0, pageNum: 0 }; // 定义一个空的 pager 对象
                        res.render('bannerList',{bannerList:data , pager:pager});
                    }
                })

            }
        })

    })
});

// router.post('/', upload.single('pic'), function(req, res, next) {
//     // 获取上传的文件信息
//     var file = req.file;
//
//     // 检查文件是否存在
//     if (!file) {
//         res.status(400).send('No file uploaded');
//         return;
//     }
//
//     // 从 `fields` 中获取其他表单字段的值
//     var imgName = req.body.imgName;
//
//     // 执行数据库插入操作
//     db.query('INSERT INTO banner VALUES (?,?,?)', [0, imgName, file.path], function (err, data) {
//         if (err) {
//             throw err;
//         } else {
//             db.query('SELECT * FROM banner', function (err, data) {
//                 if (err) {
//                     throw err;
//                 } else {
//                     var pager = { maxNum: 0, pageNum: 0 }; // 定义一个空的 pager 对象
//
//                     res.render('bannerList', { bannerList: data, pager: pager });
//                 }
//             });
//         }
//     });
// });



module.exports = router;