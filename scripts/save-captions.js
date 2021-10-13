const { exec } = require('child_process');
require('dotenv').config({
  path: '.env.development',
});

exec('python scripts/amara-get-captions.py', (error, stdout, stderr) => {
  if (error) {
    console.log(`error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.log(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
});
