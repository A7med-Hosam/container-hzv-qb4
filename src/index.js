const express = require("express")
const { spawn } = require('child_process');

const app = express()
const port = 5000

const mysql = require('mysql2')

DB_USER = process.env.DB_USER;
DB_PASSWORD = process.env.DB_PASSWORD;
DB_HOST = process.env.DB_HOST;
DB_PORT = process.env.DB_PORT;
DB_NAME = process.env.DB_NAME;

console.log("Starting 9router via Node.js spawn...");
const routerEnv = Object.assign({}, process.env, { 
    PORT: 20128,
    HOSTNAME: '0.0.0.0',
    HOST: '0.0.0.0',
    CI: 'true',
    FORCE_COLOR: '0'
});

const routerProcess = spawn('npx', ['9router', '--port', '20128', '--no-browser', '--skip-update'], { 
    env: routerEnv, 
    stdio: ['pipe', 'inherit', 'inherit'] 
});
routerProcess.stdin.write('\n');

routerProcess.on('error', (err) => {
    console.error('Failed to start 9router:', err);
});

routerProcess.on('exit', (code, signal) => {
    console.error(`9router exited with code ${code} and signal ${signal}`);
});

app.get("/", (req, res) => {
  res.send("Hello World!<br />Check /health to verify database connection is also OK")
})

app.get("/health", (req, res) => {
  let health = "BAD"
  const connection = mysql.createConnection({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    database: DB_NAME,
    password: DB_PASSWORD,
  });

	connection.query(
		'SELECT NOW() AS now',
		function (err, results, fields) {
			if (err) {
        console.error(err)
				res.send(health)
			} else {
				console.log(results)
				console.log(fields)
				health = "OK"
				res.send(health)	
			}
		}
	);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
