const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;


const app = express();
app.use(express.json());

app.use("/customer", session({secret:"fingerprint_customer", resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req, res, next){
  // Write the authenication mechanism here
  if (req.session.accessToken) {
    const accessToken = req.session.accessToken;

    jwt.verify(accessToken, "secret_key", (err, decoded) => {
      if (!err) {
        req.user = decoded;
        next();
      } else {
        return res.status(403).json({message: "User not authenticated"});
      }
    });
  } else {
    return res.status(403).json({message: "User not logged in"});
  }
});


app.use("/customer", customer_routes);
app.use("/", genl_routes);


const PORT = 3000;
app.listen(PORT, () => console.log("Server is running on port " + PORT));
