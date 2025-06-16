# Life Progress

A modern, elegant web application that visualizes your life journey in weeks. Built with SvelteKit and designed to be a Progressive Web App (PWA), Life Progress helps you gain perspective on your life's timeline and encourages mindful living.

![Life Progress Screenshot](public/screenshot.png)

## Features

- **Life Visualization**: See your life journey represented as a grid of weeks, with each week as a dot
- **Progress Tracking**: View your life progress as a percentage and in weeks
- **Responsive Design**: Beautiful, responsive interface that works on all devices
- **PWA Support**: Install as a Progressive Web App for offline access
- **Data Persistence**: Your data is saved locally and persists between sessions
- **Modern UI**: Clean, modern interface with smooth animations and transitions
- **Accessibility**: Built with accessibility in mind
- **Dark Mode**: Beautiful dark theme that's easy on the eyes

## Tech Stack

- **Framework**: [SvelteKit](https://kit.svelte.dev/)
- **UI Components**: [shadcn-svelte](https://www.shadcn-svelte.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide Icons](https://lucide.dev/)
- **PWA Support**: Custom service worker implementation
- **Package Manager**: [Bun](https://bun.sh/)

## Getting Started

### Prerequisites

- Node.js 18.x or later
- [Bun](https://bun.sh/) (recommended) or npm/pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/zed-wong/life-progress.git
   cd life-progress
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Start the development server:
   ```bash
   bun run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Building for Production

```bash
bun run build
```

## Usage

1. **First Visit**: Enter your birth date to start tracking your life journey
2. **View Progress**: See your life progress visualized as a grid of weeks
3. **Install as PWA**: Click the install button in your browser to use the app offline
4. **Reset Data**: Use the reset button in the stats page if you want to start over

## PWA Features

- **Offline Support**: Works without an internet connection
- **Installable**: Add to your home screen for quick access
- **Data Persistence**: Your data is saved locally and syncs when online
- **Automatic Updates**: Service worker ensures you always have the latest version

## Development

### Project Structure

```
life-progress/
├── src/
│   ├── lib/
│   │   ├── components/     # UI components
│   │   ├── utils/         # Utility functions
│   │   └── stores/        # Svelte stores
│   ├── routes/            # SvelteKit routes
│   └── app.html          # HTML template
├── static/               # Static assets
├── public/              # Public files
└── package.json
```

### Key Components

- `LifeProgressGrid.svelte`: Main visualization component
- `BirthDateForm.svelte`: Initial setup form
- `service-worker.js`: PWA functionality
- `manifest.json`: PWA configuration

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by the "Your Life in Weeks" visualization
- Built with [SvelteKit](https://kit.svelte.dev/)
- UI components from [shadcn-svelte](https://www.shadcn-svelte.com/)
- Icons from [Lucide](https://lucide.dev/)

## Support

If you find this project helpful, please consider giving it a star on GitHub. For issues and feature requests, please use the GitHub issue tracker.
