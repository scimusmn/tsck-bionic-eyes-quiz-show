import os
import requests

project = os.environ["AMARA_PROJECT"]
bucket_name = os.environ["GCP_BUCKET_NAME"]
headers = {
    "X-api-key": os.environ["AMARA_API_KEY"],
    "X-api-username": os.environ["AMARA_USER"],
}
lang = 'en'
local_asset_folder = './static/caption-assets'
google_prefix = 'https://storage.googleapis.com/'
print(os.listdir('./static/caption-assets'))
api_url = "http://amara.org/api/videos/?team=" + os.environ["AMARA_TEAM"]

# post media urls to specific amara project
for filename in os.listdir(local_asset_folder):
  requests.post(api_url, headers=headers, data={
      "video_url": google_prefix + bucket_name + '/' + filename,
      "project": project,
      "team": os.environ["AMARA_TEAM"],
      "primary_audio_language_code": lang
  }, timeout=10)
