# Bionic Eyes Quiz Show
Quiz show app to learn more about Bionic eyes. 3 players can use this app at a time.

## Content Structure
You can find all the content files in the `/src/content` directory. There are two types of content files we'll be using i.e. `common.json` and `quiz.json`. We will have two separate (quiz.json and common.json) files to handle the arabic and english content.

### 1. Common
```js
{
  "attract": {
    "title": "Bionic Eye Quiz",
    "instructions": "Press <strong>Start</strong> to begin",
    "video": "/media/attract_video.mp4"
  },

  "introduction": {
    "title": "Welcome to the Bionic Eye Quiz",
    "video": "/media/quizintro_video_en.mp4",
    "captions": "/captions/s1_quizintro_video_en.vtt"
  },

  "quizCommon": {
    "players": ["Player 1", "Player 2", "Player 3"],
    "scoreTitle": "Score"
  },

  "score": {
    "title": "Final Score",
    "video": "/media/finalscore_video_en.mp4",
    "captions": "/captions/s1_finalscore_video_en.vtt"
  }
}
```

### 2. Quiz
```js
"questionSets": [
  [
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
            "options": ["1", "2", "3"],
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
    },
    // next questions in the quiz
    ...
  ],
  // next question sets
  ...
]
```
Note: There can be three types of questions i.e. `multi-choice-text`, `multi-choice-media`, and `true-false`.

## Config
You can set the global config of the application in `/src/config.json`.
```js
{
  // time to answer a question (default: 10sec)
  "timePerQuestion": 10,
  // point awarded to the player if they answer correctly
  "pointPerQuestion": 1,
  // number of (consecutive) unanswered questions before the app refreshes
  "unansweredLimit": 2,
  // path to sound effects used throughout the app
  "soundEffect": {
    "success": "/sound-effects/success.wav",
    "fail": "/sound-effects/fail.wav",
    "finalScore": "/sound-effects/final score.wav",
    "input": "/sound-effects/input.wav",
    "wait": "/sound-effects/wait.wav"
  },
  // controls/keypresses to use the app
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

## Assets directory
All the assets used in the app are available in the `/static` directory.

## Media (size + optimization)
According to the design the width x height of the images used in `multi-choice-media` should be `699 x 395`. The size of all other images/videos should be `1900 x 1200`. The size of fullscreen videos, however, should be `3840 x 2160`.

The images can be compressed using a service like TinyPNG plugin (https://tinypng.com/). They can also be converted to `jpg` to reduce their size even further.

## Prevent a single hanging word
It was requested that there should be no one-word lines in the `solution` text. Look at the image below to understand the issue:

<img width="238" alt="Screenshot 2022-02-11 at 11 15 05 PM" src="https://user-images.githubusercontent.com/26784406/153648309-514a5cff-73c8-46b0-8095-442c8a50a6bc.png">

To solve this, you need to add `&nbsp;` between the second-last and the last word.

<img width="854" alt="Screenshot 2022-02-11 at 11 20 42 PM" src="https://user-images.githubusercontent.com/26784406/153648333-e21f69fc-b668-45bd-b198-0f8d72e7712c.png">

Here's the same text after making this change:

<img width="227" alt="Screenshot 2022-02-11 at 11 21 39 PM" src="https://user-images.githubusercontent.com/26784406/153648354-f493ce5f-28ba-47dd-896f-43e81eb4bf7a.png">


