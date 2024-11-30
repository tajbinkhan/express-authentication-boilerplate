import pc from "picocolors";

const currentTime = new Date().toLocaleTimeString();
const message = `${pc.green(currentTime)} ${pc.blue("[nodemon]")} ${pc.yellow("File change detected")} ${pc.magenta("Restarting...")}`;

console.log(message);
