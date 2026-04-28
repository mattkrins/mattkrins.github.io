---
title: GarrýMon
summary: A large Garry's Mod addon built in Lua that turned NPC collection, item drops, gyms, hatching, and battle systems into a Pokemon GO-inspired gameplay loop for sandbox multiplayer servers.
date: 2016
status: Discontinued
hero: /img/garrymon/hero.jpg
skills: [lua, gui]
gallery:
  - src: /img/garrymon/logo.jpg
    desc: GarrýMon logo
  - src: /img/garrymon/garrymon.jpg
    desc: Showing a captured GarrýMon
  - src: /img/garrymon/menu.jpg
    desc: In-game menu interface
  - src: /img/garrymon/capture.jpg
    desc: Capturing a GarrýMon
  - src: /img/garrymon/pokestops.jpg
    desc: PokeStop interaction and item collection
  - src: /img/garrymon/eggs.jpg
    desc: Egg incubation and hatching system
  - src: /img/garrymon/fight.jpg
    desc: GarrýMon NPC combat
  - src: /img/garrymon/heal.jpg
    desc: Healing a hurt GarrýMon
---

## Overview

GarrýMon was a large-scale Garry's Mod addon inspired by Pokemon GO, designed to let players capture NPCs, collect items, hatch eggs, establish gyms, and battle using their captured GarrýMon.

The project turned Garry's Mod's sandbox environment into a progression-based creature collection game, layering persistent systems and structured gameplay on top of an engine normally associated with loose, emergent play.

It was published to the Steam Workshop in October 2016 and achieved significant reach, with more than 100,000 unique visitors, 35,000+ subscribers, 2,700+ favourites, inclusion in 6,000+ collections, and coverage in mod showcases and [YouTube](https://www.youtube.com/watch?v=3nDkTTD27mI) videos.

## Key Features

### NPC Capture System
- Players could capture supported NPCs using throwable "GarryBalls"
- Capture chance was influenced by target health
- Failed captures caused the GarrýMon to break free and re-engage
- Successful captures added the NPC to the player's collection

### Item and Reward System
- Random item acquisition across multiple gameplay paths
- PokeStops granted free items and XP at configured map locations
- Admin tools allowed controlled item generation for testing and server management
- Included support for item variants such as candy, eggs, incubators, and capture items

### Egg and Incubation System
- Eggs could be collected through item drops
- Players could incubate eggs and hatch them by walking
- Hatching rewarded a random GarrýMon, adding a second acquisition path

### Companion Control
- Captured GarrýMon could be released from the player's collection
- Players could command them to move or attack using mouse input
- Retrieval mechanics allowed companions to be returned to storage cleanly

### Gym and Battle Mechanics
- Server owners or single-player users could place gyms in the world
- Players could assign their GarrýMon to gyms
- Gyms supported ownership, battle interactions, defeat handling, and revival flow

### Server Configuration and Administration
- Included client and server settings through an in-game menu
- Supported world placement of gameplay objects such as PokeStops and gyms
- Included persistent saved settings restored on server restart
- Exposed console commands for administration, debugging, and factory reset behaviour

## Gameplay Design

GarrýMon was built around taking familiar Pokemon-inspired progression systems and adapting them to Garry's Mod's existing sandbox gameplay.

The design combined:

- open-world exploration
- NPC interaction
- item collection
- persistence
- map-based points of interest
- creature ownership and control

This gave players a more directed gameplay loop than a typical sandbox addon while still fitting naturally into Garry's Mod's flexible multiplayer environment.

## Technical Highlights

### Large Lua Addon Architecture

The addon was built as a substantial Lua codebase rather than a single-purpose script.

It combined multiple interconnected gameplay systems, including:

- capture logic
- item inventories
- egg incubation
- menu systems
- gym ownership
- battle flow
- admin configuration

This required maintaining state across several mechanics that all influenced each other.

### System Design Inside an Existing Sandbox Game

Rather than creating a small novelty addon, the project introduced a structured progression layer into Garry's Mod.

That meant designing rules and state transitions for:

- how NPCs qualify as collectible creatures
- how items are earned and consumed
- how companions are stored and retrieved
- how world interaction points behave
- how gyms are placed, owned, and battled

### In-Game UX and Configuration

The addon exposed much of its functionality through an in-game PokeDex menu and 3D world interfaces.

This reduced reliance on console-only administration and made the system more approachable for ordinary players while still giving server operators the controls they needed.

### Multiplayer-Oriented Modding

Because the addon was intended for real server use, it had to operate in multiplayer contexts with configurable server settings and admin-only actions.

That makes it a stronger example of practical gameplay programming than a purely local or single-mechanic prototype.

## Outcome

GarrýMon achieved strong workshop reach and visibility for a Garry's Mod addon, including:

- 100,000+ unique visitors
- 35,000+ subscribers
- 2,700+ favourites
- inclusion in 6,000+ collections
- coverage in mod showcases and YouTube content

## Video Showcase

<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border:1px solid var(--border);border-radius:12px;background:var(--card-bg);">
  <iframe
    src="https://www.youtube.com/embed/E8jHdq-gWCg"
    title="GarrýMon video showcase"
    style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
  ></iframe>
</div>
