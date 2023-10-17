let express = require('express');
const cors = require('cors');
let app = express();
const http = require('http');
let bodyParser = require('body-parser');
const mongoUtil = require('./mongoUtil');

// const userRoutes = require("./routes/users");
// const groupsRoutes = require("./routes/groups");
// const channelsRoutes = require("./routes/channels");

app.use(bodyParser.json());

app.use(cors());

try{
  mongoUtil.connectToServer().then(db => {
     require('./routes/channels.js')(app, db);
     require('./routes/groups.js')(app, db);
     require('./routes/users.js')(app, db);
     require('./routes/chats.js')(app);
  

    const server = http.createServer(app);
  
  
  
    server.listen(3000, function(){
      let d = new Date();
      let n = d.getHours();
      let m = d.getMinutes();
    
      console.log('Server is running at:' + n + ':' + m)
    })
  })


} catch(err){
  console.log("luber db err", err);

}

// app.listen(3000, '127.0.0.1', function(){
//   let d = new Date();
//   let n = d.getHours();
//   let m = d.getMinutes();

//   console.log('Server is running at:' + n + ':' + m)
// })

// const validate = (req, res, next) => {
//   // Feature headers here
//    next();
//  };


// app.use("/api", validate, userRoutes);
// app.use("/api", validate, groupsRoutes);
// app.use("/api", validate, channelsRoutes);

// app.get('/', function(req, res) {
//   console.log("Server is being reach to this point")
//   res.send("");
// });



