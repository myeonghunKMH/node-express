const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
const port = 3058;
let imageCounter = 0; // 이미지 파일 이름에 사용할 카운터

app.use(bodyParser.raw({ type: "application/octet-stream" }));

app.post("/api/upload-image", (req, res) => {
  const receivedImageData = req.body;

  // 이미지 데이터를 서버의 uploads 폴더에 저장
  const imagePath = `uploads/image_${imageCounter}.jpg`; // 이미지 파일 경로
  imageCounter++; // 이미지 카운터 증가

  fs.writeFile(imagePath, receivedImageData, (err) => {
    if (err) {
      console.error("이미지 저장 중 오류 발생:", err);
      res.status(500).send("이미지 저장 중 오류 발생");
    } else {
      console.log(`이미지를 성공적으로 저장했습니다. 파일 경로: ${imagePath}`);
      res.status(200).send("이미지를 성공적으로 받았고 저장했습니다.");
    }
  });
});

app.listen(port, () => {
  console.log(`서버가 http://10.0.2.2:${port} 포트에서 실행 중입니다.`);
});
