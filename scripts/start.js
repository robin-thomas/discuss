const { onExit } = require("@rauschma/stringio");
const { spawn } = require("child_process");
const _ = require("lodash");

const port = !_.isUndefined(process.env.PORT) ? process.env.PORT : 3000;

const cmd = spawn("next", ["start", "-p", port]);

cmd.stdout.on("data", data => console.log(data.toString()));
cmd.stderr.on("data", data => console.log(data.toString()));
