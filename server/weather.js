const express = require("express");
const app = express();
const port = 3003;
const cors = require("cors");
const bodyparser = require("body-parser");
const mysql = require("mysql");
// nodemailer 모듈 요청
const nodemailer = require("nodemailer");
//salt 암호화 모듈
const crypto = require("crypto");
var http = require("http").createServer(app);

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "2ajrrhtlvj",
  database: "mydb",
});

connection.connect();
//bodyparser및 cors 사용
app.use(bodyparser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyparser.json());

// 아이디 중복체크
function test() {
  console.log("asdsad");
}


http.listen(port, () => {
  setInterval(test, 1500);
  console.log(`Example app listening at http://localhost:${port}`);
});
