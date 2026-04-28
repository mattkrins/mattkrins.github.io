---
title: JB-HiFi-Warranty
summary: A php web application to submit warranties to JB-HiFi. Reverse engineered from the source from their own online portal to create an easier to use interface.
date: 2016
status: Discontinued
hero: /img/jb-hifi-warranty/hero.jpg
skills: [javascript, api, php, html, css]
links:
  repo: https://github.com/mattkrins/JB-HiFi-Warranty
gallery:
  - src: /img/jb-hifi-warranty/1.png
    desc: Application dashboard
---

## Overview

JB Hi-Fi Warranty Tracker is a purpose-built application designed to manage warranty claims, repairs, and product tracking within a retail or service environment.

It centralises warranty workflows, allowing staff to track devices from initial claim through to resolution, while maintaining clear records of status, ownership, and outcomes.

The system replaces manual tracking methods (spreadsheets, notes, ad-hoc systems) with a structured, auditable workflow.

## Key Features

### Warranty Tracking
- Track warranty claims end-to-end
- Maintain status (submitted, in repair, approved, rejected, completed)
- Link claims to devices and customers

### Device Management
- Record product details and serial numbers
- Track ownership and claim history
- Maintain full lifecycle visibility

### Workflow Management
- Structured claim lifecycle
- Status-based progression
- Clear visibility for staff and administrators

### Record Keeping
- Centralised storage of warranty data
- Notes and updates per claim
- Historical audit trail

## Architecture

```text
[ Frontend Interface ]
        ↓
[ Application Logic ]
        ↓
[ Database ]
```

## Technology Stack

- Written in PHP
- LDAP connector
- JavaScript / Web stack
- lite database

## Technical Highlights

### Structured Workflow Model
- Claims move through defined states
- Reduces ambiguity in processing
- Enables consistent handling of warranties

### Data-Centric Design
- Strong relationships between:
  - Customers
  - Devices
  - Warranty claims
- Ensures traceability

### Operational Simplicity
- Designed for day-to-day retail usage
- Minimal friction for staff
- Focus on speed and clarity

## Example Use Cases

### Retail Warranty Processing
- Staff log a new warranty claim
- Track device through repair process
- Update status and notify stakeholders

### Service Desk Operations
- Manage incoming faulty products
- Maintain clear queue of active jobs
- Record outcomes for reporting

### Device Lifecycle Tracking
- Maintain history of repairs and claims
- Identify repeat issues
- Improve support decisions

## Problem Solved

Retail warranty workflows often rely on:
- Manual spreadsheets
- Paper records
- Disconnected systems

This leads to:
- Lost information
- Poor visibility
- Inconsistent processes

JB Hi-Fi Warranty Tracker solves this by:

- Centralising all warranty data
- Providing structured workflows
- Improving traceability and accountability
- Reducing manual overhead
