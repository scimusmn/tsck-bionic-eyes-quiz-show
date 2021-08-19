# Bionic Eyes Quiz Show
Quiz show app using GatsbyJS

## Content Structure
You can find all the content files in the `/src/content` directory.
### 1. Quiz
```json
{
    "questionIntro": {
        "title": "Question Intro",
        "audio": "/path/to/audio/file",
        "captions": "/path/to/captions/file"
    },
    
    "question": {
        "type": "multi-choice-text", 
        "text": "Is this the question?",
        "audio": "/path/to/audio/file",
        "options": ["A", "B", "C"],
        "visualMedia": {
          "image": "",
          "video": "/path/to/video/file",
          "images": []
        }
    },
    
    "solution": {
        "correctOptionIndex": 0,
        "text": "This is the solution.",
        "audio": "/path/to/audio/file"
    }
}
```

## Config
You can set the global config of the application in `/src/config.json`.
```json
{
  "timePerQuestion": 15,
  
  "pointPerQuestion": 5,

  "soundEffect": {
    "wait": "/path/to/players/waiting/music",
    "correct": "/path/to/correct/answer/sound",
    "wrong": "/path/to/wrong/answer/sound",
    "beforeTimer": "/path/to/players/answer/before/timer/sound",
    "afterTimer": "/path/to/players/answer/after/timer/sound"
  },

  "controls": {
    "start": {
      "ar": "1",
      "en": "2"
    },

    "skip": " ",
    "p1": ["q", "a", "z"],
    "p2": ["w", "s", "x"],
    "p3": ["e", "d", "c"]
  }
}
```

## To Do
1. Styling
2. Captions
3. Code cleanup & optimization
4. Sound effects
5. Some edge cases 

