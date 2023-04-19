import express from "express";

const port = 3001;
const app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

import { make_wallet } from "./master/wallet";
import { maker } from "./master/mint";
import bodyParser from "body-parser";
import { transfer } from "./master/transfer";

app.use(bodyParser.urlencoded({ extended: false }));
var y: { [key: string]: string } = {};

app.get("/wallet", (req, res) => {
  (async function () {
    y = await make_wallet();
    console.log(y);
    res.render("wall", y);
  })();
});

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/make-your-own-token", (req, res) => {
  res.render("tokenmaker");
});
var z = "";
app.post("/make-your-own-token", (req, res) => {
  (async function t() {
    var p = await maker(
      req.body.tokenname,
      req.body.symbol1,
      req.body.description1,
      req.body.image1,
      y.secret
    );
    console.log(p);

    res.render("final", p);
    // setTimeout(() => {
    //   try {
    //     transfer(z, y.secret);
    //     res.render("transfer", { status: "success" });
    //   } catch {
    //     res.render("transfer", { status: "fail" });
    //   }
    // }, 60000);
    // res.render("middletime");
  })();
});

// app.post("/transfer-money");
// {
//   (async function t() {
//     transfer(z, y.secret);
//   })();
// }

app.listen(port, () => {
  console.log(`now listening to ${port} `);
});

// all commented out is for the next version of the app
