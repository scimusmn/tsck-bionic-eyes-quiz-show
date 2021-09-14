import os
import requests
from google.cloud import storage

project = os.environ["AMARA_PROJECT"]
bucket_name = os.environ["GCP_BUCKET_NAME"]
headers = {
    "X-api-key": os.environ["AMARA_API_KEY"],
    "X-api-username": os.environ["AMARA_USER"],
}
lang = 'en'
local_asset_folder = './static/caption-assets'
google_prefix = 'https://storage.googleapis.com/'
api_url = "http://amara.org/api/videos/?team=" + os.environ["AMARA_TEAM"]

file_array = os.environ["CAPTION_BUCKET_LIST"].split('\n')

# post media urls to specific amara project
# for filename in os.listdir(local_asset_folder):
for filename in file_array:
  media_url = google_prefix + bucket_name + '/' + filename
  print("posting media_url:", media_url)
  requests.post(api_url, headers=headers, data={
      "video_url": media_url,
      "project": project,
      "team": os.environ["AMARA_TEAM"],
      "primary_audio_language_code": lang
  }, timeout=10)
