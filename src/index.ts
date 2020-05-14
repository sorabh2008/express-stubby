import express, { Application, Request, Response, NextFunction } from "express";
import fs from "fs";
import cors from "cors";
import log4js from "log4js";

log4js.configure({
  appenders: {
    errorLogs: { type: "file", filename: "error.log" },
    appLogs: { type: "file", filename: "app.log" },
    console: { type: "console" },
    out: {
      type: "file",
      filename: "pattern.log",
      layout: {
        type: "pattern",
        pattern: "%d %h %c %p - %m",
        tokens: {
          pid: function () {
            return process.pid;
          },
        },
      },
    },
  },
  categories: {
    error: { appenders: ["errorLogs", "appLogs"], level: "error" },
    app: { appenders: ["appLogs"], level: "trace" },
    pattern: { appenders: ["out"], level: "trace" },
    default: { appenders: ["console", "appLogs"], level: "trace" },
  },
});
const errorLogger = log4js.getLogger("error");
const appLogger = log4js.getLogger("app");
const patternLogger = log4js.getLogger("pattern");
const app: Application = express();

app.use(cors());

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  patternLogger.trace("combined logger message / ");
  res.send("I am ruunning!!!");
});
app.get("/stubs/:id", (req: Request, res: Response) => {
  appLogger.trace("Entering /stubs/" + req.params.id);
  try {
    const resp = fs.readFileSync("./stubs/" + req.params.id + ".json", "utf-8");
    res.json(JSON.parse(resp));
  } catch (e) {
    errorLogger.error(e.message);
    res.json({ status: 404, message: "not found" });
  }
});
app.listen(9000, "0.0.0.0", () => console.log("Server running on port 9000"));
