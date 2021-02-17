var activity=require('./Activity');
var express=require('express');
var app=express();
const router=express.Router();

var dbOperations=require('./dbOperation');
app.use(express.json());

const port =process.env.PORT || 5000;

app.get('/getPosts',dbOperations.getPosts);
app.get('/getPost/:id',dbOperations.getPostsById);
app.get('/getActivities',dbOperations.getAcitivites);
app.get('/getComments/:id',dbOperations.getComments);
app.get('/getLikes/:id',dbOperations.getLikes);
app.get('/signIn',dbOperations.signIn);
app.post('/addPosts',dbOperations.addPosts);
app.post('/addComment',dbOperations.addComments);
app.post('/addActivity',dbOperations.addActivity);
app.post('/addUsers',dbOperations.addUsers);
app.put('/like/:userId/:activityId/:likes',dbOperations.like);
app.delete('deleteAPost/:postId/:activityId',dbOperations.deleteAPost);
app.delete('deleteAComment/:commentId/:activityId',dbOperations.deleteAComment);
app.delete('deleteAUser/:id',dbOperations.deleteAUser);
app.put('/unlike/:userId/:activityId/:likes',dbOperations.unlike);

app.listen(port, function(){
    console.log('Listening on port ' + port); //Listening on port 8888
});
// dbOperations.getPosts().then(result=>{
//     console.log("result"+result);
// })

