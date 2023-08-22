let express = require('express');
const cors = require('cors');
let app = express();
let bodyParser = require('body-parser');

const userRoutes = require("./routes/users");

app.use(bodyParser.json());

app.use(cors());

app.listen(3000, '127.0.0.1', function(){
  let d = new Date();
  let n = d.getHours();
  let m = d.getMinutes();

  console.log('Server is running at:' + n + ':' + m)
})

const validate = (req, res, next) => {
  // Feature headers here
   next();
 };


app.use("/api", validate, userRoutes);

app.get('/', function(req, res) {
  console.log("Server is being reach to this point")
  res.send("");
});



