import os
import requests

project = os.environ["AMARA_PROJECT"]
team = os.environ["AMARA_TEAM"]
headers = {
    "X-api-key": os.environ["AMARA_API_KEY"],
    "X-api-username": os.environ["AMARA_USER"],
}

print('get captions, python file')

api_url = 'http://amara.org/api/videos/?team=' + team + '&project=' + project
response = requests.get(api_url, headers=headers)
videos = response.json()['objects']

for i in videos:
  if i['languages']:
    for j in i['languages']:
      res = requests.get(j['subtitles_uri'] + '?team=' + team + '&sub_format=vtt', headers=headers)
      sub = res.json()
      name = i['title'][11:100]
      with open('./static/caption-assets/'+ name + '.' + j['code'] + '.vtt', 'w') as data:
        data.write(str(sub['subtitles']))
