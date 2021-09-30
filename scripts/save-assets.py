# Downloads caption assets from the GCP bucket into local app's static folder
import os
import requests

bucket_name = os.environ["GCP_BUCKET_NAME"]

# GCP bucket files passed in from update-urls.js
file_array = os.environ["CAPTION_BUCKET_LIST"].split('\n')

file_types = ['.m4v', '.mp4', '.mp3', '.wav', '.ogg']
google_prefix = 'https://storage.googleapis.com/'

for filename in file_array:
  for filetype in file_types:
    if (filename.find(filetype, 0, 1000) != -1):
      media_url = google_prefix + bucket_name + '/' + filename
      print(media_url)
      r = requests.get(media_url, timeout=10)
      open('./static/captions/' + filename, 'wb').write(r.content)
