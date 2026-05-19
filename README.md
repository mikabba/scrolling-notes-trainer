# Scrolling Notes Trainer

A lightweight web-based music education tool designed to support real-time staff-reading practice for beginner students.

The application displays randomly generated notes on a scrolling staff. Students read the notes aloud while the teacher or student tracks reading errors during the exercise.

## Project Context

This project was developed as part of a practical music education workflow for beginner students.

The goal is to make traditional staff-reading drills more dynamic by turning them into a continuous, real-time reading exercise with score progression, increasing speed and error tracking.

## Problem

Beginner music students often need repeated practice to recognize notes on the staff quickly and fluently.

Traditional note-reading exercises can become static and predictable. Students may recognize notes correctly when they have unlimited time, but struggle when asked to read continuously and maintain fluency.

## Solution

Scrolling Notes Trainer introduces a moving staff-reading exercise.

The student follows the scrolling notes and reads them aloud in real time. The score increases while the exercise continues, the visual progression changes over time, and errors can be registered during the activity.

## Main Features

- Random note generation on the staff
- Continuous horizontal scrolling
- Score progression during the exercise
- Speed increase based on score
- Error tracking with the spacebar
- Level progression with background changes
- Keyboard-based interaction
- Lightweight static web implementation

## Screenshots

Add screenshots inside the `assets/` folder and update the paths below.

### Game Interface

```html
<img src="assets/game-interface.png" alt="Scrolling Notes Trainer interface" width="600">
```

### Exercise in Progress

```html
<img src="assets/exercise-in-progress.png" alt="Scrolling notes exercise in progress" width="600">
```

## Controls

| Input | Action |
|---|---|
| Right arrow | Hold to scroll the notes |
| Spacebar | Register one reading error |
| R | Reset the exercise |
| Start button | Start or pause the exercise |
| Reset button | Reset score, errors and generated notes |

## Technical Overview

The application is implemented as a lightweight front-end web tool.

| Layer | Technologies | Responsibility |
|---|---|---|
| Structure | HTML | Page layout and game interface |
| Styling | CSS | Responsive layout, staff rendering, notes and level background |
| Logic | JavaScript | Note generation, scrolling, score calculation, error tracking and level progression |

No build step, backend server or database is required.

## Learning Workflow

```text
Generate random notes on the staff
        |
        v
Student reads the notes aloud in real time
        |
        v
Teacher or student tracks errors with the spacebar
        |
        v
Score increases while the exercise continues
        |
        v
Scrolling speed and visual progression increase over time
```

## Project Structure

```text
scrolling-notes-trainer/
├── index.html          # Main application page
├── styles.css          # Application styling and responsive layout
├── script.js           # Note generation, scrolling and score logic
├── assets/
│   └── .gitkeep        # Placeholder for screenshots or other media
├── LICENSE             # Proprietary license
└── README.md
```

## Local Usage

Clone the repository and open `index.html` in a browser.

```bash
git clone https://github.com/mikabba/scrolling-notes-trainer.git
cd scrolling-notes-trainer
```

Then open:

```text
index.html
```

No build step is required.

## Portfolio Relevance

This project complements my main engineering portfolio by demonstrating my ability to:

- translate a real educational need into an interactive software tool;
- design a simple real-time learning exercise;
- implement dynamic visual behavior using plain JavaScript;
- structure a small front-end project for public documentation;
- build practical tools for non-technical users.

## Known Limitations

- The current version focuses on note-reading fluency rather than automatic note-name validation.
- Errors are manually registered through the spacebar during the exercise.
- The generated notes are randomized and do not currently follow a predefined pedagogical sequence.
- The application is designed as a lightweight browser-based tool rather than a complete music theory platform.

## Future Improvements

- Add configurable difficulty levels
- Add note-name validation mode
- Add different clefs
- Add mobile-friendly touch controls
- Add session summaries with score and error rate
- Add optional exercise presets for specific note ranges

## License and Usage

This project is not released under an open-source license.

The source code is made publicly visible for portfolio review, technical evaluation and demonstration purposes only.

Copying, modifying, redistributing, hosting, selling, sublicensing or creating derivative works based on this project is not permitted without prior written permission from the author.

Copyright (c) 2026 Michele Abbaticchio. All rights reserved.
