const express = require("express")
const { spawn, execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const app = express()
const WEB_PORT = 5000;

let tunnelOutput = "Starting services...\n";

// Start 9router on port 20128
const routerEnv = Object.assign({}, process.env, { PORT: 20128 });
const routerProcess = spawn('9router', [], { env: routerEnv, stdio: 'inherit' });

// Generate SSH key for Serveo if it doesn't exist
const keyPath = path.join(__dirname, 'serveo_key');
if (!fs.existsSync(keyPath)) {
    tunnelOutput += "Generating SSH key...\n";
    execSync(`ssh-keygen -t rsa -b 2048 -f ${keyPath} -q -N ''`);
}

tunnelOutput += "Starting autossh tunnel...\n";

// Start autossh tunnel
const autosshProcess = spawn('autossh', [
    '-M', '0',
    '-o', 'StrictHostKeyChecking=no',
    '-o', 'ServerAliveInterval=30',
    '-i', keyPath,
    '-R', '9router-api:80:localhost:20128',
    'serveo.net'
]);

autosshProcess.stdout.on('data', (data) => {
    const text = data.toString();
    tunnelOutput += text;
    console.log(`[autossh] ${text.trim()}`);
});

autosshProcess.stderr.on('data', (data) => {
    const text = data.toString();
    tunnelOutput += text;
    console.error(`[autossh stderr] ${text.trim()}`);
});

app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>9router Tunnel Status</title>
        <style>
          body { font-family: monospace; padding: 20px; background: #f0f0f0; }
          .container { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
          h1 { color: #333; font-size: 1.2rem; }
          pre { background: #222; color: #0f0; padding: 15px; border-radius: 4px; overflow-x: auto; white-space: pre-wrap; word-wrap: break-word; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>9router Tunnel is Running</h1>
          <p>Your 9router is exposed via Serveo. Below is the live output from the autossh command:</p>
          <pre>${tunnelOutput}</pre>
          <p>Refresh this page to see the latest output.</p>
        </div>
      </body>
    </html>
  `);
});

app.listen(WEB_PORT, '0.0.0.0', () => {
  console.log(`Web interface listening on port ${WEB_PORT}`)
})
