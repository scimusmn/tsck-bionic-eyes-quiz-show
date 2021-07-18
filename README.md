# Bionic Eyes Quiz Show
Quiz show app using GatsbyJS

## Content Structure

### 1. Question
```json
{
    "questionIntro": {
        "title": STRING,
        "audio": PATH,
        "captions": PATH
    },
    "question": {
        "type": NUMBER,
        "text": TEXT,
        "audio": PATH,
        "options": [
            BOOLEAN/TEXT/PATH,
            BOOLEAN/TEXT/PATH,
            TEXT/PATH
        ],
        "singleVideo": PATH,
        "singleImage": PATH
    },
    "solution": {
        "correctOptionIndex": NUMBER,
        "text": TEXT,
        "audio": PATH
    }
}
```
