const express = require("express");
const app = express();
const port = 3003;
const cors = require("cors");
const bodyparser = require("body-parser");
const mysql = require("mysql");
// nodemailer 모듈 요청
const nodemailer = require("nodemailer");
const request = require("request");
//salt 암호화 모듈
const crypto = require("crypto");
var parseString = require("xml2js").parseString; //xml을 json 으로 변환
var moment = require("moment");
require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");
var date2 = moment().format("YYYYMMDD");
var interval = setInterval(test, 1000);

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

var time = 42;
//기상청에서 날씨 데이터 불러오기 1
//메일 전송하기 2

var date = moment().format("mm");
if (date === time.toString()) {
  console.log("hi");
} else {
  console.log(time.length);
  console.log("nooooooooo");
}
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
        user: "cwnunight@gmail.com",
        pass: "a2586974",
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

async function weather_api(nx, ny, email) {
  var secret = "BWsUyQMVBQPnTE49yZ0rQS5WgxehKzSM%2BmUCHHFpkubpdNkQhNmYsg6GGeGZdBjhDrjRLv1W0HR0iHO0WYI8yw%3D%3D";
  var url = "http://apis.data.go.kr/1360000/VilageFcstInfoService/getVilageFcst?serviceKey=" + secret + "&numOfRows=20&pageNo=1&base_date=20201127&dataType=JSON&base_time=0200&nx=" + nx + "&ny=" + ny;
  console.log("n3");
  console.log(email);
  //queryParams += "&" +
  request(
    {
      url: url,
      method: "GET",
    },
    function (error, response, body) {
      if (error) {
        console.log(error);
      }
      var apidata = JSON.parse(body).response.body.items.item;
      var apiarr = [];
      apidata.map((value, index, array) => {
        var datajson = {};
        if (value.category === "POP" || value.category === "PTY" || value.category === "SKY" || value.category === "TMN" || value.category === "TMX" || value.category === "REH") {
          datajson.category = value.category;
          datajson.value = value.fcstValue;
          apiarr.push(datajson);
        }
      });
      sendmailer(apiarr, email);
    }
  );
}

function sendmailer(data, email) {
  console.log(email);
  let emailParam = {
    toEmail: email,
    subject: "회원가입 인증 메일입니다.",
    text: "인증번호는 " + data + "입니다.",
  };
  mailSender.sendGmail(emailParam);
}

function werther_service() {
  connection.query("SELECT * FROM user_info E JOIN location_table D ON E.user_key = D.user_key and user_sendtime= (?) and user_state = 1;", [time], function (err, rows, fields) {
    console.log(rows);
    if (rows[0] !== undefined) {
      rows.map((row, index, array) => {
        console.log("시발");
        weather_api(row.nx, row.ny, row.user_email);
      });
    } else {
      console.log("hi");
    }
  });
}

// 아이디 중복체크
function test() {
  var date = moment().format("mm:ss");
  if (date === time.toString().concat(":00")) {
    clearInterval(interval);
    werther_service();

    time++;
    if (time === 44) {
      time = 00;
      date2 = moment().format("YYYYMMDD");
    }
    console.log(time);
    console.log("QLDQLDQLDLQDLQLDQLDQLD");
    interval = setInterval(test, 1000);
    interval;
  } else {
    console.log(date);
    console.log(time);
  }
}
http.listen(port, () => {
  interval;
  console.log(`Example app listening at http://localhost:${port}`);
});
