# Research: Mitigating Privacy Management Tracking (XHR)

## Target

- **Domain**: weather.com
- **Issue Reference**: [Brave CookieCrumbler #1992](https://github.com/brave-experiments/cookiecrumbler-issues/issues/1992)
- **Problem**: Invasive cookie consent notices and background tracking telemetry via privacy-mgmt.com.

## Discovery

While investigating the persistent cookie consent notice on weather.com, I analyzed the network traffic to identify which script was responsible for rendering the dialogue and syncing tracking IDs.

Searching for "cookie" in the network inspector revealed a massive GET request to the Sourcepoint (Privacy Management) API. This request is triggered before the cookie notice is even fully interactive:

`GET https://cdn.privacy-mgmt.com/wrapper/v2/messages?hasCsp=true&env=prod&body={...}&scriptType=unified`

## Solution

I implemented a two-pronged approach to block both the data transmission (XHR) and the script execution.

`||privacy-mgmt.com^$xhr,domain=weather.com`
`||cdn.privacy-mgmt.com^$script,domain=weather.com`

## Logic

These rules target the "Unified" consent wrapper. By blocking the script and its XHR "phone-home" requests specifically when originating from weather.com, we prevent the site from ever initializing the cookie notice UI or syncing tracking metadata.

## Outcome

Successfully blocked tracking telemetry and prevented the cookie notice from appearing, while ensuring the primary weather data loads without interruption.
