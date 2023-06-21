var express = require('express');
var router = express.Router();
var db=require('../sql.js')

router.get('/', function(req, res, next) {

    var pageNo=req.query.page;//从url获取到当前页码

    db.query('select * from banner',function (err,data){
        var pager={};
        pager.maxNum=data.length;//总共多少条数据
        pager.pageSize=5;//每页多少条
        pager.pageCurrent=pageNo || 1;//默认当前页面为1
        //修改当前页面呈现的数据
        var dataList=data.slice( (pager.pageCurrent-1)*pager.pageSize,(pager.pageCurrent-1)*pager.pageSize+pager.pageSize);
        if(pager.maxNum % pager.pageSize!==0){
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
});


module.exports = router;