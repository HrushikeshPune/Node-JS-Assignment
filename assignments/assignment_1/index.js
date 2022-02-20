function getNameFromCommandLine() {
    var name =process.argv[process.argv.length-1];
    return name
}
function getNameFromEnv() {
    return process.env.name

}

function getNameFromReadLine() {
    const readline = require('readline');
    readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })
}

module.exports = {
    getNameFromCommandLine,
    getNameFromEnv,
    getNameFromReadLine
}