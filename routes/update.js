var express = require('express');
var router = express.Router();
var db=require('../sql.js');
var multiparty=require('multiparty');//用于处理 HTTP 请求中的表单数据，特别是处理包含文件上传的表单数据

router.post('/', function(req, res, next) {
    var form=new multiparty.Form();
    //上传的图片需要保存到某一个目录下，必须已经创建好该目录
    form.uploadDir='./public/upload';
    form.parse(req,function (err,fields,files){
        var upid=fields.upid[0];
        var pic=files.pic[0].path;//图片路径
        var imgName=fields.imgName[0];//图片名称
        //
        // console.log(upid,pic,imgName);

        db.query('update banner set id=?,name=?,imgurl=? where id=?',[upid,imgName,pic,upid],function (err,data){
            db.query('select * from banner',function (err,data){
                var pager={};
                pager.maxNum=data.length;//总共多少条数据
                pager.pageSize=5;//每页多少条
                pager.pageCurrent=1;//默认当前页面为1
                // pager.pageCount=parseInt(Math.ceil(pager.maxNum/pager.pageSize));//一共多少页
                //修改当前页面呈现的数据
                var dataList=data.slice( (pager.pageCurrent-1)*pager.pageSize,(pager.pageCurrent-1)*pager.pageSize+pager.pageSize);
                if(pager.maxNum % pager.pageSize!==0){//一共多少页
                    pager.pageNum=Math.floor(pager.maxNum/pager.pageSize)+1;
                }else{
                    pager.pageNum=pager.maxNum/pager.pageSize;
                }

                if(err){
                    throw err;
                }else{
                    res.render('bannerList',{
                        bannerList:dataList,
                        pager:pager
                    });
                }
            })
        })



        //0是因为设置了id为自增长
    //     db.query('insert into banner value (?,?,?)',[0,imgName,pic],function (err,data){
    //         if(err){
    //             throw err;
    //         }else{
    //
    //             db.query('select * from banner',function (err,data){
    //                 if(err){
    //                     throw err;
    //                 }else{
    //                     var pager = { maxNum: 0, pageNum: 0 }; // 定义一个空的 pager 对象
    //                     res.render('bannerList',{bannerList:data , pager:pager});
    //                 }
    //             })
    //
    //         }
    //     })
    //
    })
});

module.exports = router;