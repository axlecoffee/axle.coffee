# Copilot Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

This is a Next.js TypeScript project for Axle's personal website migration. Key
requirements:

## Project Setup

- Next.js 15 with App Router and TypeScript
- Tailwind CSS for styling
- Static export for PM2 hosting
- Legacy browser detection for IE compatibility

## Code Style

- Use TypeScript throughout
- Follow component-based architecture
- Use Tailwind CSS classes for styling
- Maintain existing design and functionality from original HTML site

## Legacy Support

- Preserve IE browser detection logic
- Keep legacy folder structure for older browsers
- Ensure modern browsers get the React version

## Hosting Requirements

- Configure for static export
- Set up PM2 configuration for production
- Use pnpm for package management
