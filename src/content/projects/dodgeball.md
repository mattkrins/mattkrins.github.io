---
title: DodgeBall
summary: A Garry's Mod gamemode built in Lua that turns classic dodgeball into a structured multiplayer ruleset with scoring, bot AI, admin controls, and round-based gameplay.
date: 2015
status: Active
hero: /img/dodgeball/hero.jpg
skills: [lua, gui]
links:
  live: https://steamcommunity.com/sharedfiles/filedetails/?id=473793126
  repo: https://github.com/mattkrins/dodgeball
gallery:
  - src: /img/dodgeball/logo.jpg
    desc: Gamemode logo
  - src: /img/dodgeball/team menu.jpg
    desc: Team selection menu
  - src: /img/dodgeball/gameplay.jpg
    desc: Standard dodgeball match gameplay
  - src: /img/dodgeball/gameplay chaos.jpg
    desc: Chaotic gameplay with too many bots
---

## Overview

DodgeBall is a custom Garry's Mod gamemode built in Lua that recreates dodgeball as a complete round-based multiplayer experience inside the sandbox engine.

Rather than functioning as a simple weapon or minigame script, the project defines a full gameplay loop with scoring, round flow, ball interaction rules, bot support, admin controls, and map rotation behaviour.

It is a good example of general programming skill in gameplay systems design, because it combines rules, state management, AI behaviour, configuration, and player-facing feedback into a coherent multiplayer mode.

## Key Features

### Round-Based Match Flow
- Players compete until a score cap is reached or the round timer expires
- Winning conditions are enforced by gamemode logic rather than ad-hoc sandbox play
- Supports structured sessions with clear start, end, and winner states

### Ball Interaction Rules
- Balls can be thrown, caught, dropped, and picked up according to timing-based rules
- Catching requires correct player state and precision timing
- Bounced balls become interactable after a delay, allowing rebound and recovery play
- Uncollected balls are cleaned up after a configurable period

### Player Flow and Equipment Recovery
- If a player does not pick up a ball after a period of time, the mode gives them one
- Keeps the match moving and prevents gameplay from stalling
- Reduces downtime and supports a more reliable competitive loop

### Bot AI
- Includes built-in bot support with configurable difficulty
- Bots can be enabled, disabled, added, or removed through commands
- Makes the gamemode usable for testing, small servers, and non-full lobbies

### Admin and Server Tooling
- Includes a primitive admin menu
- Includes optional map voting and MOTD systems
- Exposes console commands for ending rounds and controlling bots
- Allows operators to manage the mode without editing code directly

### Feedback and Presentation
- Includes kill announcer events such as first blood and multi-kill callouts
- Improves match pacing and gives the mode a stronger arcade identity
- Adds player feedback beyond basic damage and death events

## Architecture

The gamemode layers a structured competitive ruleset on top of Garry's Mod's sandbox systems.

```text
Player Input + Ball Entities
        ->
Gamemode Rules and Round State
        ->
Score / Timer / Win Conditions
        ->
Bot Logic + Admin Controls
        ->
Match Outcome and Rotation Flow
```

## Technical Highlights

### Full Gamemode Programming

This project is more substantial than a typical addon because it defines a complete gamemode rather than one isolated mechanic.

That includes:

- scoring logic
- round state transitions
- player equipment flow
- ball lifecycle rules
- bot behaviour
- map and server utility features

### Rule-Driven Gameplay Design

Dodgeball only works well when the rules are explicit and enforced consistently.

The gamemode therefore had to define and coordinate:

- when a ball counts as catchable
- when it becomes pick-up eligible after a bounce
- when it should be removed from the world
- when a replacement ball should be issued
- how wins and round endings are resolved

This is a strong example of translating a real-world game into deterministic game logic.

### Bot and Multiplayer Support

Supporting bots inside a multiplayer Garry's Mod gamemode adds a layer of complexity beyond player-only scripting.

Bot support improves the project as a programming showcase because it demonstrates:

- state-aware AI behaviour
- game loop participation by non-player agents
- configurable difficulty and control
- support for incomplete or test lobbies

### Operator-Focused Controls

The project includes administrative and server-facing tools such as map voting, menu toggles, and console commands.

That makes it practical for actual community use rather than only as a local prototype or proof of concept.

## Example Use Cases

### Community Server Gamemode
- Run structured dodgeball matches on a Garry's Mod server
- Offer a distinct rules-based experience separate from sandbox play

### Bot-Assisted Testing and Play
- Use bots to test balance and match flow
- Fill lobbies when there are not enough real players

### Event or Minigame Rotation
- Add the gamemode as part of a larger server rotation
- Use score caps and timers to support short, replayable sessions

## Problem Solved

Garry's Mod makes it easy to spawn props and improvise games, but informal play usually lacks:

- enforced rules
- reliable scoring
- proper round flow
- consistent feedback
- server controls

DodgeBall solves that by turning a familiar real-world game into a reusable multiplayer system with explicit mechanics and match structure.

## Design Philosophy

- **Simple concept, solid rules**: the game idea is easy to understand, but the implementation should feel dependable.
- **Fast feedback**: keep players active and reduce downtime where possible.
- **Server-ready**: include the controls needed for actual multiplayer hosting.
- **Replayable by design**: use score caps, timers, and bots to support repeated short matches.

## Outcome

DodgeBall was released on the Steam Workshop as a complete Garry's Mod gamemode and published alongside its source code on GitHub.

It remains a strong portfolio example of:

- Lua gameplay programming
- multiplayer rules implementation
- game state management
- bot integration
- user-facing server tooling

## Video Showcase

<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border:1px solid var(--border);border-radius:12px;background:var(--card-bg);">
  <iframe
    src="https://www.youtube.com/embed/737CeAHpYcw"
    title="DodgeBall video showcase"
    style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
  ></iframe>
</div>
