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
        "correctOption": 1,
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
- Styling
- Captions for all the audio/video files
- Sound effects used throughout the application
- Update with final assets
- Code cleanup and optimization
- Some edge cases for the quiz

## Edge cases
1. The users are able to answer even after the solution has been revealed. *This is only relevant for styling purposes, as the scores are not updated*.
2. If all players enter answers before audio narration completes, the results are shown as soon as the audio narration completes.
3. When appropriate, the media asset updates to display the "reveal" answer version.
4. Inactivity timeout - if no answers are entered for two quiz questions in a row, the application reloads/resets to the Attract screen.
5. Software must be able to run in an exhibit for ~twelve hours without crashing or noticeable performance issues. You may reload the
page programmatically after a period of inactivity to help avoid memory issues.


