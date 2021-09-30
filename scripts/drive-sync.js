// TODO: Refactor this to Google functions
const open = require('open');
require('dotenv').config({
  path: '.env.development',
});

const gcpproject = process.env.GCP_PROJECT_ID;
const drivefolder = process.env.CAPTION_DRIVE_FOLDER;
const bucketname = process.env.GCP_BUCKET_NAME;
const colabCode = `#******COPY AND RUN IN COLAB NOTEBOOK*****\n
from google.colab import drive\n
from google.colab import auth\n
drive.mount('/content/drive')\n
auth.authenticate_user()\n
!gcloud config set project '${gcpproject}'\n
!gsutil -m cp -r '${drivefolder}'/* gs://${bucketname}/\n
#******COPY TO HERE*****\n`;

console.log(colabCode);

(async () => {
    // Opens the url in the default browser
    await open('https://colab.research.google.com/drive/1sFL43aNMOHpp1Vj_3jB4spLppmYbLPTf');
})();
