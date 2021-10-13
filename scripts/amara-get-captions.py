import os
import requests

project = os.environ["AMARA_PROJECT"]
team = os.environ["AMARA_TEAM"]
headers = {
    "X-api-key": os.environ["AMARA_API_KEY"],
    "X-api-username": os.environ["AMARA_USER"],
}

print('get captions, python file')

# Amara API gets any file assigned to AMARA_PROJECT
api_url = 'http://amara.org/api/videos/?team=' + team + '&project=' + project
response = requests.get(api_url, headers=headers)
videos = response.json()['objects']

# Creates url that saves vtt file to local captions directory
for i in videos:
  if i['languages']:
    for j in i['languages']:
      res = requests.get(j['subtitles_uri'] + '?team=' + team + '&sub_format=vtt', headers=headers)
      sub = res.json()
      # strips file name from longer Amara default name
      name = i['title'][11:100]
      # strips file extension for name since it already exists in media asset name
      name = os.path.splitext(name)[0]
      # TODO: Abstract caption asset path to env var
      with open('./static/captions/'+ name + '.vtt', 'w') as data:
        data.write(str(sub['subtitles']))
