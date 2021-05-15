var activity=require('./Activity');
var express=require('express');
var cors = require('cors');
var app=express();
const router=express.Router();
var multer = require('multer');

var dbOperations=require('./dbOperation');

const corsOpts = {
    origin: '*',
  
    methods: [
      'GET',
      'POST',
    ],
  
    allowedHeaders: [
      'Content-Type',
    ],
  };
  
  app.use(cors());
 app.use('/public',express.static('public'));
  app.use(express.json());
  
//   var storage=multer.diskStorage({
//     destination:(req, file, cb)=>{
//       cb(null, 'public')
//     },
//     filename:(req, file, cb)=>{
//       cb(null, Date.now()+'-'+file.originalname)
//     }
//   })

//   var upload = multer({ storage: storage }).single('postImage') //returns a middleware function ref 
  
//   console.log(upload);

//   app.post('/addPosts',function(req, res) {
//      console.log(req);
//     upload(req, res, function (err) {
//            if (err instanceof multer.MulterError) {
//                return res.status(500).json(err)
//            } else if (err) {
//                return res.status(500).json(err)
//            }
//       return res.status(200).send(req.postImage)

//     })

// });

const port =process.env.PORT || 5000;

app.get('/getPosts',dbOperations.getPosts);
app.get('/getPost/:id',dbOperations.getPostsById);
app.get('/getActivities',dbOperations.getAcitivites);
app.get('/getComments/:id',dbOperations.getComments);
app.get('/getLikes/:id',dbOperations.getLikes);
app.post('/signIn',dbOperations.signIn);
app.post('/addPosts',dbOperations.addPosts);
app.post('/addComment',dbOperations.addComments);
app.post('/addActivity',dbOperations.addActivity);
app.post('/addUsers',dbOperations.addUsers);
app.put('/like/:userId/:activityId/:likes',dbOperations.like);
app.delete('/deleteAPost/:postId/:activityId',dbOperations.deleteAPost);
app.delete('/deleteAComment/:commentId/:activityId',dbOperations.deleteAComment);
app.delete('/deleteAUser/:id',dbOperations.deleteAUser);
app.put('/unlike/:userId/:activityId/:likes',dbOperations.unlike);

app.listen(port, function(){
    console.log('Listening on port ' + port); //Listening on port 8888
});
// dbOperations.getPosts().then(result=>{
//     console.log("result"+result);
// })

