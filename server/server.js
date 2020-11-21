const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");
const bodyparser = require("body-parser");
const mysql = require("mysql");
// nodemailer 모듈 요청
const nodemailer = require("nodemailer");
//salt 암호화 모듈
const crypto = require('crypto');

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
app.post("/CheckId", (req, res) => {
  const checkId = req.body.check_Id;
  connection.query(
    "SELECT user_id FROM user_info WHERE user_id =(?)",
    [checkId],
    function (err, rows, fields) {
      if (rows[0] === undefined) {
        res.send(true); //중복 없음 사용가능
      } else {
        res.send(false); // 중복 있음 사용안됨
      }
    }
  );
});

// 회원가입 salt를 이용한 hash 암호화
app.post("/sign_up", async function(req,res,next){
  let body = req.body;

  let inputPassword = body.password;
  let salt = Math.round((new Date().valueOf() * Math.random())) + "";
  let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");
  connection.query(
    "insert into user_info (user_id,user_salt, user_passwd, user_email,user_location,user_sendtime) values (?,?,?,?,?,?)",
    [body.id ,salt ,hashPassword, body.email, body.location, body.sendtime],
    function (err, rows, fields) {
      if (err) {
        console.log("sign_up error");
        res.send(false);
      } else {
        res.send(true);
      }
  })
})

//로그인 salt 적용
router.post("/login", async function(req,res,next){
  let body = req.body;
  let dbPassword;
  let salt;
  connection.query(
  "SELECT user_id,user_salt,user_passwd FROM user_info WHERE user_id = (?)",
      [body.user_id],
    function (err, rows, fields) {
      if (rows[0] === undefined) {
        res.send(false);
      }
      else {
        dbPassword = rows.user_passwd;
        salt = rows.user_salt;
      }
    })

  let inputPassword = body.passwd;
  let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");

  if(dbPassword === hashPassword){
      console.log("비밀번호 일치");
      res.send(true);
  }
  else{
      console.log("비밀번호 불일치");
      res.send(false);
  }
});


router.post("/Sendmail", (req, res) => {
  const email = req.body.sendEmail;
  var authNum = Math.floor(Math.random() * 1000000) + 100000;
  if (authNum > 1000000) {
    authNum = authNum - 100000;
  }

  let emailParam = {
    toEmail: email + "@chanwon.ac.kr", //gmail.com -> changwon.ac.kr로 수정하기
    subject: "회원가입 인증 메일입니다.",
    text: "인증번호는 " + authNum + "입니다.",
  };
  connection.query(
    "SELECT user_email FROM user_info WHERE user_email = (?)",
    [email],
    function (err, rows, fields) {
      if (rows[0] === undefined) {
        //중복된 메일 없음 메일 발송
        mailSender.sendGmail(emailParam);
        res.send(authNum.toString());
      } else {
        //중복된 메일이 있음
        res.send(true);
      }
    }
  );
});


var mailSender = {
  // 메일발송 함수
  sendGmail: function (param) {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      prot: 587,
      host: "smtp.gmail.com",
      secure: false,
      requireTLS: true,
      auth: {
        user: "gjdnjsdud10@gmail.com",
        pass: "ekdms!98",
      },
    });
    // 메일 옵션
    var mailOptions = {
      from: "gjdnjsdud10@gmail.com",
      to: param.toEmail, // 수신할 이메일
      subject: param.subject, // 메일 제목
      text: param.text, // 메일 내용
    };
    // 메일 발송
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  },
};

http.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});