// set sequelize
var seq = require("sequelize");

// set connection
var con = new seq('lester_database', 'devel', '', 'localhost:8000');

// exports connect
module.exports = {
  connection : con,
  users :  con.define('users', {
    id : {
      type : seq.INTEGER,
      primaryKey : true,
      autoIncrement : true
    },
    name : seq.STRING,
    email : seq.STRING,
    password : seq.STRING,
    status : seq.INTEGER(10),
    created : seq.DATE,
    modified : seq.DATE
  }, {timestamps : false})
};