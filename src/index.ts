import express, {
  Application,
  Request,
  Response,
  NextFunction,
  response
} from "express";
import fs from "fs";
import cors from "cors";
import FormData from "./formdata";
import Calculator from "./calculator";
import axios from "axios";

var path = require("path");

const app: Application = express();

var bodyParser = require("body-parser");

// view engine setup
app.set("views", path.join(__dirname, "public/views"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.redirect("/debtform");
  // res.send("I am ruunning!!!");
});

app.get("/debtform", (req: Request, res: Response, next: NextFunction) => {
  res.render("index", { title: "Alohomora: Debt form" });
});

app.get(
  "/stubs/submission",
  (req: Request, res: Response, next: NextFunction) => {
    // console.log('req.body', req.body.data)
    console.log(req.query);
    // console.log(req.query("formdata"));
    console.log(req.query["formdata"]);
    let formData: FormData = req.query["formdata"];
    const calc = new Calculator();
    let totalAssets = calc.add([
      formData.estimatedEquipmentCost,
      formData.estimatedVehicleCost,
      formData.otherAssets,
      formData.totalInventoryValue,
      formData.totalPropertyValue
    ]);
    let totalExpense = calc.add([
      formData.bills,
      formData.cashOutflow,
      formData.officeExpense,
      formData.otherExpense
    ]);
    let totalIncome = calc.add([formData.cashInflow, formData.profit]);
    let totalDebt = Math.ceil(formData.debtAmount / formData.debtTermInYears);
    // axios.get('/stubs/get_debt_history')
    axios
      .get("http://localhost:9000/stubs/200.json")
      .then(response => {
        // console.log('success', response)
        // res.json(req.body.data);
        // res.json({ data: response });

        res.render("graphicaldata", {
          title: "Alohomora: Debt Prediction",
          formData: {
            ...formData,
            totalAssets,
            totalDebt,
            totalExpense,
            totalIncome
          }
        });
      })
      .catch(error => {
        console.log("error", error);
        res.json({ status: 500, msg: "Internal server error!!" });
      });

    // res.render('graphicaldata', { title: "Alohomora: Debt Prediction" });
  }
);

app.get("/stubs/get_debt_history", (req: Request, res: Response) => {
  fs.readFile("/stubs/debt.json", "utf-8", (err, fileContent) => {
    console.log("www", fileContent);
    res.json(fileContent);
  });
});

app.get("/stubs/:id", (req: Request, res: Response) => {
  try {
    const resp = fs.readFileSync("./stubs/" + req.params.id + ".json", "utf-8");
    res.json(JSON.parse(resp));
  } catch (e) {
    res.json({ status: 404, message: "not found" });
  }
});
app.listen(9000, "0.0.0.0", () => console.log("Server running on port 9000"));
