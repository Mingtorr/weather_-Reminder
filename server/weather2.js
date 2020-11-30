const express = require("express");
const app = express();
const port = 3003;

const mysql = require("mysql");
const nodemailer = require("nodemailer");
const request = require("request");
var moment = require("moment");
require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");
var http = require("http").createServer(app);
var xml2js = require("xml2js");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "2ajrrhtlvj",
  database: "mydb",
});

connection.connect();

var time = moment().format("hh");
var interval = setInterval(test, 1000 * 60);
var mailSender = {
  // 메일발송 함수
  sendGmail: function (param) {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      auth: {
        user: "cwnunight@gmail.com",
        pass: "ggicrsmibrbylhwj",
      },
    });
    // 메일 옵션
    var mailOptions = {
      from: "gjdnjsdud10@gmail.com",
      to: param.toEmail, // 수신할 이메일
      subject: param.subject, // 메일 제목
      html: param.html, // 메일 내용
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
  var url = "http://www.kma.go.kr/wid/queryDFS.jsp?gridx=55&gridy=123";

  request(
    {
      url: url,
      method: "GET",
    },
    function (error, response, body) {
      xml2js.parseString(body, function (err, obj) {
        let now = obj.wid.body[0].data[0];
        var body = JSON.parse(now.sky);
        var arr = [];
        var temper = obj.wid.body[0].data;
        var i = 0;
        var j = 0;
        arr.push(obj.wid.body[0].data[0].pop[0]);
        arr.push(obj.wid.body[0].data[0].pty[0]);
        arr.push(obj.wid.body[0].data[0].reh[0]);
        arr.push(obj.wid.body[0].data[0].sky[0]);
        while (i < temper.length) {
          if (temper[i].tmn[0] != "-999.0") {
            arr.push(temper[i].tmn[0]);
            break;
          }
          i++;
        }
        while (j < temper.length) {
          if (temper[j].tmx[0] != "-999.0") {
            arr.push(temper[j].tmx[0]);
            break;
          }
          j++;
        }
        arr.push(obj.wid.body[0].data[0].wfKor[0]);
        sendmailer(arr, email);
      });
      if (error) {
      }
    }
  );
}

function sendmailer(data, email) {
  const sky = data[3];
  const rain = data[1]; //rain = '1'
  var date3 = moment().format("YYYY 년 MM 월 DD 일");
  if (rain != "0") {
    let emailParam = {
      toEmail: email,
      subject: "[날씨알리미]오늘은 비가 옵니다. 우산챙기세요!!!!!",
      html: `  <body style="margin: 0; padding: 0">
      <div style=
        "font-family:Apple SD Gothic Neo, sans-serif ; width: 540px; height: 600px; border-top: 4px solid #6f9df1;
        margin: 100px auto; padding: 30px 0; box-sizing: border-box; ">
        <h1 style=" margin: 0; padding: 0 5px; font-size: 28px; font-weight: 400">
        <b style="font-size: 15px; margin: 0 0 10px 3px">창원대 우산알리미</b><br />
        <b style="color: #3f4144">오늘의 날씨</b>  <b style="color: #6f9df1;">비옴.</b>
        </h1>
       
        <img src="https://raw.githubusercontent.com/jybin96/weathersite/master/server/rain.png" style="height: 200px; width: 200px; padding-left: 150px; padding-top: 30px; padding-bottom: 30px;"/>
        <p style="color: #8bb7e7; font-weight: bolder; font-size: 18px;">우산을 지참하고 나가세요.</p>
        <p style="color: #3f4144; font-weight: bold; font-size: 20px;">
          ${date3} 날씨정보
        </p>
        <p style="
              font-size: 16px;
              line-height: 26px;
              margin-top: 50px;
              padding: 0 5px;
              margin-bottom: 30px;
            ">
          <b style="color: #6f9df1">강수확률</b> :&nbsp; ${data[0]}%
          <br />
          <b style="color: #6f9df1">하늘상태</b> :&nbsp; 비
          <br />
          <b style="color: #6f9df1">오전최저기온</b> :&nbsp; ${data[4]} 도
          <br />
          <b style="color: #6f9df1">오후최고기온</b> :&nbsp; ${data[5]} 도
          <br />
          <script>
            document.write(authNumber);
          </script>
        </p>
    
        <a style="color: #fff; text-decoration: none; text-align: center" href="{$auth_url}" target="_blank">
          <p style="
                display: inline-block;
                width: 210px;
                height: 45px;
                margin: 30px 5px 40px;
                background: #2d73f5;
                line-height: 45px;
                vertical-align: middle;
                font-size: 16px;
              " class="move_wagle">
            우산알리미 홈페이지 이동
          </p>
        </a>
      </div>
    </body>`,
    };
    mailSender.sendGmail(emailParam);
  }
}

function werther_service() {
  connection.query("SELECT D.nx, D.ny, E.user_email FROM user_info E JOIN location_table D ON E.user_key = D.user_key and user_sendtime= (?) and user_state = 1;", [time], function (err, rows, fields) {
    if (rows[0] !== undefined) {
      rows.map((row, index, array) => {
        console.log("user found! email is " + row.user_email);
        weather_api(row.nx, row.ny, row.user_email);
      });
    }
  });
}

// 아이디 중복체크
function test() {
  var date = moment().format("hh:mm");
  time = moment().format("hh");
  if (date.toString() === time.toString().concat(":00") || date === "0".concat(time.toString().concat(":00"))) {
    clearInterval(interval);
    werther_service();
    interval = setInterval(test, 1000 * 60);
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
