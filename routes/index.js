var express = require('express');
var router = express.Router();
var db=require('../sql.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/main', function(req, res, next) {
  var userName=req.body.userName;
  var userPwd=req.body.userPwd;
  db.query('select * from user where username=? and userPwd=?',[userName,userPwd],function (err,data){
    if (err){
      throw err;
    }else if(data.length>0){
      res.render('main');
      console.log(data[0].id);
    }else{
      res.end('wrong');
    }

  })
});

module.exports = router;
