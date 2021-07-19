# Bionic Eyes Quiz Show
Quiz show app using GatsbyJS

## Content Structure

### 1. Quiz
```js
{
    "questionIntro": {
        "title": STRING,
        "audio": PATH,
        "captions": PATH
    },
    
    "question": {
        "type": NUMBER,
        "text": STRING,
        "audio": PATH,
        "options": [
            STRING,
            STRING,
            STRING
        ],
        "visualMedia": {
          "image": PATH,
          "video": PATH,
          "images": ARRAY
        }
    },
    
    "solution": {
        "correctOptionIndex": NUMBER,
        "text": STRING,
        "audio": PATH
    }
}
```

