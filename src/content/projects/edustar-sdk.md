---
title: eduSTAR STMC SDK
summary: A robust TypeScript Node.js client for the eduSTAR School Technology Management Centre API, supporting both NTLM and form-based authentication.
date: 2025
status: Active
hero: /img/edustar-sdk/hero.jpg
skills: [typescript, automation, cli, api]
links:
  repo: https://gitlab.edustar.tech/st01350/edustar-sdk
gallery:
  - src: /img/edustar-sdk/1.png
    desc: Using API programmatically
  - src: /img/edustar-sdk/2.jpg
    desc: CLI help output
  - src: /img/edustar-sdk/3.jpg
    desc: CLI login via user prompt
  - src: /img/edustar-sdk/4.jpg
    desc: CLI login via switch inputs
  - src: /img/edustar-sdk/5.jpg
    desc: CLI showing school NPS configuration with mix of prompt and switch
---

## Overview

The eduSTAR SDK is a TypeScript-based client library and command-line tool designed to interact with the eduSTAR School Technology Management Centre API.

It provides a unified interface for managing school infrastructure, users, and services within the Victorian Department of Education network.

The project focuses on automating administrative workflows that are otherwise manual and fragmented across web interfaces.

## Key Features

### Dual Interface (SDK + CLI)
- Programmatic SDK for integration into scripts and applications
- Command-line interface (CLI) for direct administration tasks
- Shared underlying API layer

### API Coverage
Supports operations across:
- User identity and authentication
- School data and infrastructure
- Student and staff management
- Group and directory operations
- Device and service management

### Authentication
- NTLM authentication (VPN / external access)
- Form-based authentication (internal access)
- Automatic fallback handling

### CLI Automation
- Structured commands (`user`, `school`, `student`, etc.)
- JSON output for scripting
- Supports interactive and scripted usage

## Architecture

```text
CLI (Commander.js)
        ↓
SDK Core (eduSTAR class)
        ↓
HTTP Layer (undici + NTLM)
```

## Technical Highlights

### TypeScript-First
- Strong typing
- Distributed type definitions
- IDE-friendly developer experience

### Build System
- SDK compiled to /dist
- CLI compiled to /bin
- Separate TypeScript configs

### Authentication Handling
- Custom handling for eduSTAR-specific requirements
- Session and cookie management
- Abstracted complexity

### Networking
- Uses undici for HTTP performance
- Keep-alive connections
- Proxy support

## Example Usage

### SDK

```ts
import { eduSTAR } from "edustar-sdk";

const client = new eduSTAR({ verbose: true });

await client.login("username", "password");

const schools = await client.getSchools();
console.log(schools);
```

### CLI

```bash
edustar whoami -u username
edustar school list all
edustar student list -s 1234
```

## Problem Solved

- Reduces manual admin work
- Enables scripting and automation
- Standardises workflows across environments

## Design Philosophy

- Minimal surface area
- Composable (SDK + CLI)
- Practical over abstract
- Transparent outputs (JSON)

## Engineering Decisions

- Thin CLI wrapper mapped directly to SDK
- Dual authentication strategy for reliability
- Custom dependency handling for compatibility
