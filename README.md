# Universal Short-Link Auto-Bypasser

A userscript that automatically bypasses most short-link services and redirects to the final destination without user interaction.

## Features

- ⚡ Accelerates long ad timers on short-link pages
- 🔄 Supports 80+ popular short-link services
- 🎯 Automatic skip button detection and clicking
- 💾 Intelligent caching system to avoid repeated requests
- 🚀 Fast resolution using HEAD requests with fallback to full page analysis

## Supported Services

The script supports a wide variety of short-link services including:
- AdFly and variants (adf.ly, 9.bb, u.bb, j.gs, q.gs)
- LinkVertise (linkvertise.com, linkvertise.net)
- OUO (ouo.io, ouo.press, ouo.se)
- And many more including bc.vc, shorte.st, exe.io, clk.sh, etc.

## Installation

1. Install a userscript manager like [Tampermonkey](https://www.tampermonkey.net/) or [Greasemonkey](https://www.greasespot.net/)
2. Click [here](https://raw.githubusercontent.com/YOUR_USERNAME/universal-shortlink-bypasser/main/bypassShortlinks.user.js) to install the script
3. The script will automatically activate on short-link pages

## How It Works

1. **Timer Acceleration**: Caps long timers to 800ms to speed up countdown pages
2. **Smart Detection**: Identifies short-link services by domain patterns and known hosts
3. **Multiple Resolution Methods**:
   - Quick URL parameter extraction (e.g., `?url=`, `?dest=`)
   - HTTP redirect following
   - Meta refresh tag parsing
   - JavaScript redirect detection
   - Base64 encoded URL decoding
4. **Auto-clicking**: Automatically finds and clicks "Skip", "Continue", or "Get Link" buttons
5. **Caching**: Stores resolved URLs for 24 hours to avoid repeated requests

## Configuration

The script includes several configuration options:
- `maxRedirects`: Maximum redirect depth (default: 8)
- `timeout`: Request timeout in milliseconds (default: 10000)
- `openInNewTab`: Open final URL in new tab (default: false)

## Contributing

Feel free to submit issues or pull requests to add support for additional short-link services or improve the existing functionality.

## License

This project is open source and available under the MIT License.