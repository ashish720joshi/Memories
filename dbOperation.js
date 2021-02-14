var config = require('./dbconfig');
const sql = require('mssql/msnodesqlv8');
const moment = require('moment');

getAcitivites = async () => {

    try {
        let conn = new sql.ConnectionPool(config);
        let req = new sql.Request(conn);

        let connect = await conn.connect();
        let activites = await req.query('select * from Activity');
        console.log(activites);

        // let activites=await pool.request().query('select * from Activity');
        // return activites.recordsets;
        conn.close();
    }
    catch (e) {
        console.log(e);
    }
}


//check date formate later
addUsers = async () => {
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
        let query = `INSERT INTO [dbo].[Users] ([Name], [Email], [metaCreatedAt] ) VALUES('Ahsaas Nathawat','an@gmail.com',CONVERT(date,GETDATE()))`;

        let response = await req.query(query);
        console.log(response);

        // let activites=await pool.request().query('select * from Activity');
        // return activites.recordsets;
        conn.close();
    }
    catch (e) {
        console.log(e);
    }
}

addActivity = async () => {


    let currentDate = new Date().toISOString();
    console.log(currentDate);
    currentDate = currentDate.split('.')[0];
    currentDate = currentDate.replace('T', ' ');
    console.log(currentDate);
    let query = `INSERT INTO [dbo].[Activity] ([type_], [likes], [metaCreatedAt] ) VALUES('Post',${0},CONVERT(date,GETDATE()))`;
    try {
        let conn = new sql.ConnectionPool(config);
        let req = new sql.Request(conn);

        let connect = await conn.connect();
        let response = await req.query(query);
        console.log(response);

        // let activites=await pool.request().query('select * from Activity');
        // return activites.recordsets;
        conn.close();
    }
    catch (e) {
        console.log(e);
    }
}

addPosts = async () => {
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
        let query = `INSERT INTO [dbo].[Posts] ([postName],  [metaCreatedAt],[userId],[activityId] ) VALUES('first',CONVERT(date,GETDATE()),'1',${activityId})`;
        let response2 = await req.query(query);
        console.log(response);

        // let activites=await pool.request().query('select * from Activity');
        // return activites.recordsets;
        conn.close();
    }
    catch (e) {
        console.log(e);
    }
}

getPosts = async () => {

    try {
        let conn = new sql.ConnectionPool(config);
        let req = new sql.Request(conn);

        let connect = await conn.connect();
        let posts = await req.query('select * from Posts order by metaCreatedAt desc');
        console.log(posts);

        // let activites=await pool.request().query('select * from Activity');
        // return activites.recordsets;
        conn.close();
    }
    catch (e) {
        console.log(e);
    }
}





addComments = async () => {
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

        let query = `INSERT INTO [dbo].[Comments] ([comment],  [metaCreatedAt],[userId],[activityId] ) VALUES('first',CONVERT(date,GETDATE()),'1',${activityId})`;

        let response2 = await req.query(query);
        console.log(response2)

        // let activites=await pool.request().query('select * from Activity');
        // return activites.recordsets;
        conn.close();
    }
    catch (e) {
        console.log(e);
    }
}

likeAPost = async () => {
    let currentDate = new Date().toISOString();
    console.log(currentDate);
    currentDate = currentDate.split('.')[0];
    currentDate = currentDate.replace('T', ' ');
    console.log(currentDate);
    let activityId=2;
    let userId=1;
    let likes=0;
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

        // let activites=await pool.request().query('select * from Activity');
        // return activites.recordsets;
        conn.close();
    }
    catch (e) {
        console.log(e);
    }
}

getComments = async () => {

    try {
        let conn = new sql.ConnectionPool(config);
        let req = new sql.Request(conn);
        let activityId=1;

        let connect = await conn.connect();
        let posts = await req.query(`select * from [dbo].[Comments] where [activityId]=${activityId} order by metaCreatedAt desc`);
        console.log(posts);

        // let activites=await pool.request().query('select * from Activity');
        // return activites.recordsets;
        conn.close();
    }
    catch (e) {
        console.log(e);
    }
}

getLikes = async () => {

    try {
        let conn = new sql.ConnectionPool(config);
        let req = new sql.Request(conn);
        let activityId=1;

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


signIn = async () => {

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








module.exports = {
    getAcitivites: getAcitivites,
    addUsers: addUsers,
    addActivity: addActivity,
    addPosts: addPosts,
    getPosts: getPosts,
    addComments: addComments,
    likeAPost:likeAPost,
    getComments:getComments,
    getLikes:getLikes,
    signIn:signIn
}