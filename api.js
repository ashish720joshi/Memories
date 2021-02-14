var activity=require('./Activity');
var dbOperations=require('./dbOperation');
dbOperations.getComments().then(result=>{
    console.log("result"+result);
})

