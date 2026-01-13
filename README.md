# Adblock Filter Lab

A laboratory for researching, testing, and generating adblock filters. This repository serves as a workspace for analyzing anti-adblock mechanisms and developing robust counter-filters.

## Repository Structure

- **`filters.txt`**: The core collection of adblock rules developed in this lab. These are written in standard Adblock Plus / uBlock Origin syntax.
- **`research/`**: Documentation and analysis of specific sites or adblock walls. Contains research notes on bypass techniques (e.g., `bild.md`, `lemonde.md`).
- **`validator/`**: Automated validation scripts using [Playwright](https://playwright.dev/). These tests ensure the filters effectively block ads or bypass walls without breaking site functionality.

## Usage

### Applying Filters

To use the filters developed here:

1. Open **uBlock Origin** settings (Dashboard).
2. Go to the **Filter lists** tab.
3. Scroll to **Import** at the bottom.
4. Paste the raw URL of `filters.txt` (or the file path if local).
5. Click **Apply changes**.

## Validation

This project uses Playwright to verify filters.

### Prerequisites

- Node.js installed.
- `validator` dependencies installed:
  ```bash
  cd validator
  npm install
  ```

### Running Tests

To run specific site tests:

```bash
cd validator
# Test Reddit filters
npm run test-reddit

# Test Le Monde filters
npm run test-lemonde
```

Check `validator/package.json` for all available scripts.
