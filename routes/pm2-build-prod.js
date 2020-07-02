const {exec} = require('child_process')

        // exec('npm run build-prod')
        console.log("run buil prod")
exec("npm run build-prod", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        next
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        next
        return;
    }
    console.log(`stdout: ${stdout}`);
});