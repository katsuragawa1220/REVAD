const CHANGE = require("./lib/changecode");

module.exports = (robot) => {
    robot.on("pull_request.opened", CHANGE.hasIf);
};
