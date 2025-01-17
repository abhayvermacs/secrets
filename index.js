import express from "express";
import bodyParser from "body-parser";
import {dirname} from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
var isAuthenticated = false;

app.use(bodyParser.urlencoded({extended:true}));

function passwordChecker(req, res, next) {
    const password = req.body["password"];
    if(password === "ILoveProgramming"){
        isAuthenticated = true;
    }
    next();
}

app.use(passwordChecker);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.post("/check", (req, res) => {
    if(isAuthenticated){
        res.sendFile(__dirname + "/public/secret.html");
    }
    else{
        res.sendFile(__dirname + "/public/index.html");
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});
