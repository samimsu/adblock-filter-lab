# Research: Bypassing the Lemonde.fr Cookie Consent Wall & Scroll Lock

## Target

- **Domain**: lemonde.fr
- **Problem**: Intrusive GDPR cookie consent overlay and scroll locking.

## Discovery

- A container (`.gdpr-lmd-wall`) creates a modal overlay that prevents interaction.
- Even if hidden, the site remains frozen due to `popin-gdpr-no-scroll` class injected into `<html>` and `<body>`, applying `overflow: hidden`.

## Solution

Applied filters to purge the overlay and remove the scroll-locking class.

- `lemonde.fr##.gdpr-lmd-wall`
- `lemonde.fr##html,body:remove-class(popin-gdpr-no-scroll)`

## Logic

- The first rule removes the visual obstruction.
- The second rule force-removes the locking class to restore native scrolling behavior.

## Outcome

Achieved a frictionless user experience by neutralizing the consent wall and restoring core browser functionality (scrolling).
