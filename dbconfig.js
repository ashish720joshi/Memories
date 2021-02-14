const config={
  server:'127.0.0.1',
    // user:'test',
    // password:'1234567890',
    driver: 'msnodesqlv8',
    database:'TestDb',
    options:{
        trustedConnection:true,
        // enableArithAbort:true,
        // instanceName:'MSSQLSERVER'
    },
   // port:1433

}

module.exports=config;

