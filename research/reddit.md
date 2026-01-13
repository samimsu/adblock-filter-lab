# Research: Neutralizing Dynamic Ad-Injection on Reddit

## Target

- **Domain**: reddit.com
- **Problem**: Dynamic injection of `shreddit-ad-post` custom elements.

## Discovery

Reddit utilizes a specific Custom Element, `shreddit-ad-post`, to serve promoted content. These elements are injected dynamically into the feed, acting as containers for the ad's shadow DOM and tracking scripts.

## Solution

Developed a declarative filtering rule targeting the unique custom element tag.

## Logic

The filter identifies the `shreddit-ad-post` tag as a structural anomaly within the feed. By targeting the element directly rather than its randomized internal classes, the filter remains resilient against minor CSS updates or obfuscation of the ad's content. **Webcompat**: By isolating the filter to the custom tag, standard site elements and essential security features remain unaffected, ensuring zero interference with legitimate site functionality.

## Outcome

The ad elements are suppressed or hidden at the browser level as they appear. This prevents the rendering of the ad's visual assets and collapses the space they would have occupied in the user's feed.
