// set sequelize
var seq = require("sequelize");

// set connection
var con = new seq('lester_database', 'devel', '', 'localhost');

// exports connect
module.exports = {
  seq : seq,
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
    image : seq.STRING,
    description : seq.STRING,
    created : seq.DATE,
    modified : seq.DATE
  }, {timestamps : false}),
  users_contacts :  con.define('users_contacts', {
    id : {
      type : seq.INTEGER,
      primaryKey : true,
      autoIncrement : true
    },
    user_id : seq.INTEGER,
    recipient_id : seq.INTEGER,
    created : seq.DATE,
    modified : seq.DATE
  }, {timestamps : false}),
  chat_histories :  con.define('chat_histories', {
    id : {
      type : seq.INTEGER,
      primaryKey : true,
      autoIncrement : true
    },
    user_id : seq.INTEGER,
    recipient_id : seq.INTEGER,
    message : seq.STRING,
    message_type : seq.INTEGER,
    created : seq.DATE,
    modified : seq.DATE,
  }, {timestamps : false}),
};