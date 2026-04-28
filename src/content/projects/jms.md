---
title: Job Management System
summary: A Job Management System developed with React, Semantic UI, Express & Prisma designed to assist system administrators, technicians and support staff in managing ICT environments.
date: 2022
status: Discontinued
hero: /img/jms/hero.jpg
skills: [react, javascript, rest, api, gui]
gallery:
  - src: /img/jms/1.jpg
    desc: Job view
  - src: /img/jms/2.jpg
    desc: User view
  - src: /img/jms/3.jpg
    desc: Device view
  - src: /img/jms/4.jpg
    desc: Users list
  - src: /img/jms/5.jpg
    desc: Jobs list
  - src: /img/jms/6.jpg
    desc: Devices list
  - src: /img/jms/7.jpg
    desc: Viewing user permissions
  - src: /img/jms/8.jpg
    desc: Viewing device flags
  - src: /img/jms/9.jpg
    desc: Uploaded file view
  - src: /img/jms/10.jpg
    desc: Adding a device flag
  - src: /img/jms/11.jpg
    desc: Assigning a user to a device
  - src: /img/jms/12.jpg
    desc: Creating a job
  - src: /img/jms/13.jpg
    desc: Bulk importing devices
  - src: /img/jms/14.jpg
    desc: Generating document for a device scope
---

## Overview

This ICT Job Management System (JMS) is a full-stack web application designed for system administrators, technicians, and support staff to manage devices, repairs, and operational workflows.

It centralises asset tracking, job lifecycle management, and document handling into a single platform, replacing fragmented spreadsheets, emails, and ad-hoc tools.

The system is particularly suited for school or enterprise environments where devices move through structured repair and support processes.

## Key Features

### User Management
- Tracks user profiles and associated devices
- Maintains historical records of activity and ownership
- Supports organisational policy enforcement
- Links users to jobs and device history

### Device Management
- Centralised asset inventory
- Tracks ownership, lifecycle, and status
- Maintains complete device history
- Associates devices with jobs and users

### Job Management
- End-to-end job lifecycle tracking
- Status-based workflow (e.g. open, awaiting user, repair, finance, closed)
- Rich job records with:
  - Notes and logs
  - Attachments
  - Status history
- Assignment of technicians ("workers")
- Categorisation by hardware/software and subtype

### Document Management
- Generate documents tied to jobs (e.g. repair quotes, incident reports)
- Bulk document generation
- Automatic import of forms and attachments
- Centralised document storage linked to jobs and users

## UI / UX Highlights

### Job Dashboard
- Tabular job view with device, user, status, type, workers, and timestamps
- Color-coded status indicators
- Pagination and filtering

### Job Creation Workflow
- Structured job creation form with:
  - Device and user selection
  - Job type classification
  - Component-level fault selection
  - Worker assignment
- Options for device handling and notifications
- Comment and attachment support

### Job Detail View
- Full lifecycle tracking (timestamps, expected completion, location)
- Tabs for logs, attachments, finance, repairs, and more
- Rich text logging interface

## Architecture

```text
[ React Frontend ]
        ↓
[ Express API ]
        ↓
[ Prisma ORM ]
        ↓
[ Database ]
```

## Technology Stack

- React
- Semantic UI
- Express.js
- Prisma ORM
- Relational Database

## Technical Highlights

- Component-based frontend architecture
- RESTful API backend
- Strong relational data modelling with Prisma
- Status-driven workflow system
- Scalable job and asset tracking

## Example Use Cases

- Device repair lifecycle management
- School ICT asset tracking
- Helpdesk / support operations
- Compliance documentation and reporting

## Problem Solved

Replaces disconnected tools (spreadsheets, emails, manual logs) with a unified system for:

- Asset tracking
- Job management
- Documentation
- Workflow visibility

## Design Philosophy

- Practical and workflow-driven
- Clear lifecycle tracking
- Strong data relationships
- Operator-focused UX
