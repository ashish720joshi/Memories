var activity=require('./Activity');
var express=require('express');
const router=express.Router();
router.get('/',dbOperations.getPosts);
var dbOperations=require('./dbOperation');
dbOperations.getPosts().then(result=>{
    console.log("result"+result);
})

