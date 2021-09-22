const { execSync, exec } = require('child_process');
require('dotenv').config({
  path: '.env.development',
});

const bucketFiles = execSync(`gsutil ls -r gs://${process.env.GCP_BUCKET_NAME}/`);
// Convert string of bucket files to array of strings
const shortenedUrls = bucketFiles.toString("utf8").split("\n").map(url => url.replace(`gs://${process.env.GCP_BUCKET_NAME}/`, ''));

// Create newline string that python can ingest via env var
const arrayString = shortenedUrls.join("\n");
process.env.CAPTION_BUCKET_LIST = arrayString;

exec('python scripts/save-assets.py', (error, stdout, stderr) => {
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
