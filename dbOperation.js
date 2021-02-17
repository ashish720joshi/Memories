var config = require('./dbconfig');
const sql = require('mssql/msnodesqlv8');
const moment = require('moment');

getAcitivites = async (request,response) => {

    try {
        let conn = new sql.ConnectionPool(config);
        let req = new sql.Request(conn);

        let connect = await conn.connect();
        let activites = await req.query('select * from Activity');
        console.log(activites);
        
        response.send(activites);
        conn.close();
       
    }
    catch (e) {
        console.log(e);
    }
}


//check date formate later
addUsers = async (request,res) => {
    //     let currentDate=new Date().toISOString();
    //     console.log(currentDate);
    //      currentDate=currentDate.split('.')[0];
    //    currentDate=currentDate.replace('T',' ');
    let date = new Date();
    //let currentDate=date.toISOString().slice(0, 19).replace('T', ' '); 
    let currentDate = date.toISOString().split('T')[0] + ' ' + date.toTimeString().split(' ')[0]; //check this date time issue at last
    console.log(currentDate);
    try {
        let conn = new sql.ConnectionPool(config);
        let req = new sql.Request(conn);

        let connect = await conn.connect();
        let query = `INSERT INTO [dbo].[Users] ([Name], [Email], [metaCreatedAt] ) VALUES('Ahsaas Nathawat','an@gmail.com',CONVERT(date,GETDATE()));SELECT SCOPE_IDENTITY();`;
       
        let response = await req.query(query);
        let userId = Object.values(response.recordset[0])[0];
        console.log(userId);
        let responseBody={name:request.params.name,
        id:userId}
        res.send(responseBody);

        conn.close();
    }
    catch (e) {
        console.log(e);
    }
}

addActivity = async (request,res) => {


    let currentDate = new Date().toISOString();
    console.log(currentDate);
    currentDate = currentDate.split('.')[0];
    currentDate = currentDate.replace('T', ' ');
    console.log(currentDate);
    let query = `INSERT INTO [dbo].[Activity] ([type_], [likes], [metaCreatedAt] ) VALUES('Post',${0},CONVERT(date,GETDATE()));SELECT SCOPE_IDENTITY();`;
    try {
        let conn = new sql.ConnectionPool(config);
        let req = new sql.Request(conn);

        let connect = await conn.connect();
        let response = await req.query(query);
        console.log(response);
        let activityId = Object.values(response.recordset[0])[0];
        console.log(activityId);
        let responseBody={name:request.params.name,
            id:activityId}
            res.send(responseBody);


        // let activites=await pool.request().query('select * from Activity');
        // return activites.recordsets;
        conn.close();
    }
    catch (e) {
        console.log(e);
    }
}

addPosts = async (request,res) => {
    let currentDate = new Date().toISOString();
    console.log(currentDate);
    currentDate = currentDate.split('.')[0];
    currentDate = currentDate.replace('T', ' ');
    console.log(currentDate);
    let query1 = `INSERT INTO [dbo].[Activity] ([type_],[likes],[metaCreatedAt]) VALUES('Post',0,CONVERT(date,GETDATE())); SELECT SCOPE_IDENTITY();`;

    try {
        let conn = new sql.ConnectionPool(config);
        let req = new sql.Request(conn);

        let connect = await conn.connect();
        let response = await req.query(query1);
        let activityId = Object.values(response.recordset[0])[0];
        let query = `INSERT INTO [dbo].[Posts] ([postName],  [metaCreatedAt],[userId],[activityId] ) VALUES('first',CONVERT(date,GETDATE()),'1',${activityId});SELECT SCOPE_IDENTITY();`;
        let response2 = await req.query(query);
        console.log(response);
        let postId = Object.values(response.recordset[0])[0];
        console.log(postId);
        let responseBody={name:request.params.name,
            id:postId}
            res.send(responseBody);
        

        // let activites=await pool.request().query('select * from Activity');
        // return activites.recordsets;
        conn.close();
    }
    catch (e) {
        console.log(e);
    }
}

getPosts = async (request,res) => {

    try {
        let conn = new sql.ConnectionPool(config);
        let req = new sql.Request(conn);

        let connect = await conn.connect();
        let posts = await req.query('select * from Posts order by metaCreatedAt desc');
        console.log(posts);
        res.send(posts);
        // let activites=await pool.request().query('select * from Activity');
        // return activites.recordsets;
        conn.close();
    }
    catch (e) {
        console.log(e);
    }
}

getPostsById=async(request,response)=>{
    try{
        let conn = new sql.ConnectionPool(config);
        let req = new sql.Request(conn);

        let connect = await conn.connect();
        let post = await req.query(`select * from Posts where activityId=${request.params.id}`);
        console.log(post);

        response.send(post);
        conn.close();
       

    }catch(e)
    {
        console.log(e);
    }
}





addComments = async (request,res) => {
    let currentDate = new Date().toISOString();
    console.log(currentDate);
    currentDate = currentDate.split('.')[0];
    currentDate = currentDate.replace('T', ' ');
    console.log(currentDate);
    let query1 = `INSERT INTO [dbo].[Activity] ([type_],[likes],[metaCreatedAt]) VALUES('Comment',0,CONVERT(date,GETDATE())); SELECT SCOPE_IDENTITY();`;

    try {
        let conn = new sql.ConnectionPool(config);
        let req = new sql.Request(conn);

        let connect = await conn.connect();
        let response = await req.query(query1);

        let activityId = Object.values(response.recordset[0])[0];
        console.log(activityId);

        let query = `INSERT INTO [dbo].[Comments] ([comment],  [metaCreatedAt],[userId],[activityId] ) VALUES('first',CONVERT(date,GETDATE()),'1',${activityId});SELECT SCOPE_IDENTITY();`;

        let response2 = await req.query(query);
        console.log(response2)
        let commentId = Object.values(response2.recordset[0])[0];
        console.log(commentId);
        let responseBody={name:request.params.name,
            id:commentId}
            res.send(responseBody);

        // let activites=await pool.request().query('select * from Activity');
        // return activites.recordsets;
        conn.close();
    }
    catch (e) {
        console.log(e);
    }
}

like = async (request,res) => {
    let currentDate = new Date().toISOString();
    console.log(currentDate);
    currentDate = currentDate.split('.')[0];
    currentDate = currentDate.replace('T', ' ');
    console.log(currentDate);
    let activityId=request.params.activityId;
    let userId=request.params.userId;
    let likes=request.params.likes;
    let query = `INSERT INTO [dbo].[Likes]
    ([type],[metaCreatedAt],[userId],[activityId])VALUES('Comment',CONVERT(date,GETDATE()),${userId},${activityId})`;

    let query1=`Update [dbo].[Activity]
    set likes=${likes+1}
    where activityId=${activityId};`;
    try {
        let conn = new sql.ConnectionPool(config);
        let req = new sql.Request(conn);

        let connect = await conn.connect();
        let response = await req.query(query);
        let response2=await req.query(query1);
        console.log(response);
        console.log(response2);
        res.sendStatus(200);
        // let activites=await pool.request().query('select * from Activity');
        // return activites.recordsets;
        conn.close();
    }
    catch (e) {
        console.log(e);
    }
}

getComments = async (request,res) => {

    try {
        let conn = new sql.ConnectionPool(config);
        let req = new sql.Request(conn);
        let activityId=request.params.id;;

        let connect = await conn.connect();
        let comments = await req.query(`select * from [dbo].[Comments] where [activityId]=${activityId} order by metaCreatedAt desc`);
        console.log(posts);
        res.send(comments);

        // let activites=await pool.request().query('select * from Activity');
        // return activites.recordsets;
        conn.close();
    }
    catch (e) {
        console.log(e);
    }
}

getLikes = async (request,res) => {

    try {
        let conn = new sql.ConnectionPool(config);
        let req = new sql.Request(conn);
        let activityId=request.params.id;

        let connect = await conn.connect();
        let likesCount = await req.query(`select likes from [dbo].[Activity] where [activityId]=${activityId}`);
        console.log(likesCount);
        res.send(likesCount.recordset[0]);

        // let activites=await pool.request().query('select * from Activity');
        // return activites.recordsets;
        conn.close();
    }
    catch (e) {
        console.log(e);
    }
}


signIn = async (request,res) => {

    try {
        let conn = new sql.ConnectionPool(config);
        let req = new sql.Request(conn);
        let userName='Ashish Joshi';


        let connect = await conn.connect();
        let posts = await req.query(`select * from [dbo].[Likes] where [activityId]=${activityId} order by metaCreatedAt desc`);
        console.log(posts);

        // let activites=await pool.request().query('select * from Activity');
        // return activites.recordsets;
        conn.close();
    }
    catch (e) {
        console.log(e);
    }
}

deleteAPost=async(request,res)=>{
    try {
        let conn = new sql.ConnectionPool(config);
        let req = new sql.Request(conn);
        let postId=request.params.postId;
        let activityId=request.params.activityId;

        let connect = await conn.connect();
        let response = await req.query(`delete [dbo].[Posts]  where postId=${postId}; delete [dbo].[Activity] where [activityId]=${activityId} `);
        console.log(response);
       res.sendStatus(200);

        // let activites=await pool.request().query('select * from Activity');
        // return activites.recordsets;
        conn.close();
    }
    catch (e) {
        console.log(e);
    }
}

deleteAComment=async(request,res)=>{
    try {
        let conn = new sql.ConnectionPool(config);
        let req = new sql.Request(conn);
        let commentId=request.params.commentId;
        let activityId=request.params.activityId;

        let connect = await conn.connect();
        let response = await req.query(`delete [dbo].[Comments]  where postId=${commentId}; delete [dbo].[Activity] where [activityId]=${activityId} `);
        console.log(response);
       res.sendStatus(200);

        // let activites=await pool.request().query('select * from Activity');
        // return activites.recordsets;
        conn.close();
    }
    catch (e) {
        console.log(e);
    }
}

deleteAUser=async(request,res)=>{
    try {
        let conn = new sql.ConnectionPool(config);
        let req = new sql.Request(conn);
        let userId=request.params.id;
      

        let connect = await conn.connect();
        let response = await req.query(`delete [dbo].[Users]  where [userId]=${userId}`);
        console.log(response);
       res.sendStatus(200);

        // let activites=await pool.request().query('select * from Activity');
        // return activites.recordsets;
        conn.close();
    }
    catch (e) {
        console.log(e);
    }
}



unlike = async (request,res) => {
    let currentDate = new Date().toISOString();
    console.log(currentDate);
    currentDate = currentDate.split('.')[0];
    currentDate = currentDate.replace('T', ' ');
    console.log(currentDate);
    let activityId=request.params.activityId;
    let userId=request.params.userId;
    let likes=request.params.likes;
    let query = `delete [dbo].[Likes]
   where userId=${userId}`;

    let query1=`Update [dbo].[Activity]
    set likes=${likes-1}
    where activityId=${activityId};`;
    try {
        let conn = new sql.ConnectionPool(config);
        let req = new sql.Request(conn);

        let connect = await conn.connect();
        let response = await req.query(query);
        let response2=await req.query(query1);
        console.log(response);
        console.log(response2);
        res.sendStatus(200);
        // let activites=await pool.request().query('select * from Activity');
        // return activites.recordsets;
        conn.close();
    }
    catch (e) {
        console.log(e);
    }
}







module.exports = {
    getAcitivites: getAcitivites,
    addUsers: addUsers,
    addActivity: addActivity,
    addPosts: addPosts,
    getPosts: getPosts,
    addComments: addComments,
    like:like,
    getComments:getComments,
    getLikes:getLikes,
    signIn:signIn,
    getPostsById:getPostsById,
    deleteAPost:deleteAPost,
    deleteAComment:deleteAComment,
    deleteAUser:deleteAUser,
    unlike:unlike
}