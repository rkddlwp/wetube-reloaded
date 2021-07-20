import "regenerator-runtime";
import "dotenv/config";
import "./db"; // 파일자체를 import, import 되자마자 바로 실행됨.
import "./models/Video";
import "./models/User";
import "./models/Comment";
import app from "./server"

const PORT = 4000;

const handleListening = () =>
    console.log(`✅ Server listenting on http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);  