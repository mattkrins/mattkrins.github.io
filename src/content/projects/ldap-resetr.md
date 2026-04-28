---
title: ldap-resetr
summary: A simple tool to reset/generate a random password for an ldap user and print to a thermal receipt printer, built using Electron and React.
date: 2021
status: Discontinued
hero: /img/ldap-resetr/hero.jpg
skills: [react, javascript, api, gui]
links:
  repo: https://github.com/Warragul-Regional-College/ldap-resetr
gallery:
  - src: /img/ldap-resetr/1.png
    desc: Main application window
  - src: /img/ldap-resetr/2.png
    desc: Reset password output on thermal printer receipt
---

## Overview

LDAP Resetr is a lightweight internal tool that provides a controlled interface for resetting user passwords in LDAP-based environments.

It removes the need for direct directory access while enabling safe delegation to support staff.

## Key Features

- Web-based password reset interface
- Direct LDAP integration
- Delegated access for non-admin staff
- Fast, single-purpose workflow

## Architecture

```text
Web UI → App Server → LDAP Directory
```

## Tech Stack

- Node.js
- React.js
- Electron.js
- LDAP libraries

## Use Cases

- School IT helpdesk password resets
- First-line enterprise support
- Delegated credential management
