# Research: Bypassing Bild.de Adblock Wall

## Target

- **Domain**: bild.de
- **Problem**: Adblock Wall redirecting to `/adblockwall.html`.

## Discovery

The wall is not a simple CSS overlay but is triggered by a site-wide JSON state variable (`adBlockWallEnabled`) and specific script executions. It was identified using the **uBlock Origin Logger** to spot the scriptlets and network requests causing the redirect.

## Solution

The following steps were taken:

1. **uBlock Origin Logger**: Analyzed the real-time request log while refreshing bild.de.
2. **Filter Identification**: Identified that the active rule was originating from the built-in list: "uBlock filters – Ads".
3. **Source Inspection**: Clicking the list name in the logger opened the full source of the filter list.
4. **Pattern Matching**: Searched the source file for `adBlockWallEnabled` related logic. This revealed the specific scriptlet injections and `$doc,replace` parameters used.

## Logic

- Utilized pre-processor directives (`!#if cap_html_filtering`) to ensure compatibility between standard uBO and MV3-based engines (uBlock Origin Lite).
- The filter changes the JSON state to disable the adblock wall check.

## Outcome

Successfully neutralized the redirect loop while maintaining first-party site functionality.
