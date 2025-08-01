# IP Hub - IP Address Lookup Tool

A modern, responsive web application built with Next.js that displays your public IP address along with location information.

## Features

- 🌐 Displays both IPv4 and IPv6 addresses
- 📍 Shows location information (city, region, country)
- 📋 One-click copy to clipboard functionality
- 🔗 Quick access to useful network tools and services
- 📱 Fully responsive design
- ⚡ Built with modern technologies

## Tech Stack

- **Framework**: Next.js 13+ with App Router
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/aamanbhagat/iphub.git
cd iphub
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## API Endpoints Used

- **IPv4**: `api.ipify.org`
- **IPv6**: `api64.ipify.org`
- **Location**: `ipapi.co`

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).
