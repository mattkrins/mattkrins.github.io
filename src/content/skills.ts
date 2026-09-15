import type { SkillTag } from '$lib/types';

export const skills: Record<string, SkillTag> = {
  api:        { label: 'api',        color: '#22c55e', description: 'Uses an Application Programming Interface (API) endpoint.' },
  automation: { label: 'automation', color: '#14b8a6', description: 'Uses tasks and workflows automatically based on triggers or schedules.' },
  cli:        { label: 'cli',        color: '#a855f7', description: 'Uses a Command-Line Interface (CLI) for user interaction.' },
  css:        { label: 'css',        color: '#264de4', description: 'Uses CSS (Cascading Style Sheets) for content styling.' },
  docker:     { label: 'docker',     color: '#2496ed', description: 'Uses Docker for containerised builds or deployment.' },
  electron:   { label: 'electron',   color: '#47848f', description: 'Uses Electron to build desktop applications with web technologies.' },
  gui:        { label: 'gui',        color: '#0ea5e9', description: 'Uses an extensive Graphical User Interface (GUI) for user interaction.' },
  html:       { label: 'html',       color: '#e34f26', description: 'Uses HTML (HyperText Markup Language) to display content.' },
  javascript: { label: 'javascript', color: '#f7df1e', description: 'Uses the JavaScript programming language.' },
  lua:        { label: 'lua',        color: '#2f6feb', description: 'Uses the Lua programming language.' },
  php:        { label: 'php',        color: '#777bb4', description: 'Uses the PHP (Hypertext Preprocessor) programming language.' },
  powershell: { label: 'powershell', color: '#5391fe', description: 'Uses the PowerShell (PS) scripting language.' },
  ai: { label: 'ai', color: '#ff8c42', description: 'Uses Large Language Model (LLM) prompts.' },
  python:     { label: 'python',     color: '#ffd43b', description: 'Uses the Python programming language.' },
  react:      { label: 'react',      color: '#61dafb', description: 'Uses the React.js front-end library for building user interfaces.' },
  rest:       { label: 'rest',       color: '#ef4444', description: 'Uses a RESTful (Representational State Transfer) API endpoint.' },
  security:   { label: 'security',   color: '#dc2626', description: 'Involves authentication, encryption, access control, credential handling, or security-sensitive administration.' },
  ssh:        { label: 'ssh',        color: '#64748b', description: 'Uses Secure Shell (SSH) for remote command execution or administration.' },
  svelte:     { label: 'svelte',     color: '#ff3e00', description: 'Uses the Svelte framework for building reactive user interfaces.' },
  typescript: { label: 'typescript', color: '#3178c6', description: 'Uses the TypeScript programming language.' },
};
