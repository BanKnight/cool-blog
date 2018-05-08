const fs = require("fs")
const path = require("path")

const server = require("./head")

module.exports = server

require("./data")
require("./core")
require("./impl")
