# Axle's Coffee - Next.js Website

A modern Next.js TypeScript website migration from static HTML/CSS to a
React-based framework with legacy browser support.

## Features

- **Next.js 15** with App Router and TypeScript
- **Tailwind CSS** for styling
- **Static Export** for production deployment
- **Legacy Browser Support** - IE5-11 compatibility through browser detection
- **PM2 Production Hosting** with Express server
- **Responsive Design** with dark/light mode support

## Development

### Prerequisites

- Node.js 22+
- pnpm (its sigma)

### Setup

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Available Scripts

```bash
# Development
pnpm dev          # Start development server with Turbopack
pnpm lint         # Run ESLint

# Production Build
pnpm build        # Build and export static files to 'out' directory
pnpm serve        # Serve production build locally

# PM2 Production Deployment
pnpm pm2:start    # Start with PM2
pnpm pm2:stop     # Stop PM2 process
pnpm pm2:restart  # Restart PM2 process
pnpm pm2:delete   # Delete PM2 process
```

## Project Structure

```
src/
├── app/
│   ├── components/     # React components
│   ├── styles/        # CSS files (migrated from original)
│   ├── layout.tsx     # Root layout with metadata
│   └── page.tsx       # Homepage component
public/
├── img/              # Images and assets
├── js/               # JavaScript files
└── legacy/           # Legacy HTML files for IE browsers
```

## Browser Support

- **Modern Browsers**: Served the React/Next.js version
- **Internet Explorer 5-11**: Automatically redirected to `/legacy/` folder with
  static HTML

## Deployment

### Static Export

The site builds to static files in the `out/` directory for hosting anywhere.

### PM2 Production

Uses PM2 with Express server for production hosting:

1. Build the project: `pnpm build`
2. Start with PM2: `pnpm pm2:start`
3. Monitor: `pm2 list`

## Technologies

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **Express 4** - Production server
- **PM2** - Process management

## License

Licensed under SkyStats Development license.

- [Main License](https://github.com/SkyStats-Development/license)
- [Miscellaneous Applications](https://github.com/SkyStats-Development/license/blob/main/Miscellaneous%20Applications)
