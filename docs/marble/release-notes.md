
# Release notes

> Latest updates and improvements to Marble

## January 29, 2026

### Features and Improvements

* Meshes can now be imported into Composer
* **Cancel Subscription** button is easier to find
* Video prompt file **size** limit for the API **increased** to 100MB

## January 1, 2026

### Features and Improvements

* Improved export options
* Assets are now roughly scaled and grounded to better match real-world units
* Option to choose between \*\*OpenGL \*\*and **OpenCV** coordinate systems
* Customize export preferences for **high-quality meshes** (vertex-colored vs textured)

## December 18, 2025

### Features and Improvements

* You can now copy & paste in Chisel using Ctrl+C / Ctrl+V
* Expand mode now provides clearer guidance on valid expansion regions, including more **explicit feedback** when the target position is too high or too low in the scene

## December 11, 2025

### Features and Improvements

* Record mode in Studio now gives you more creative control: You can now freely move the floating preview window as you plan your flythrough, and you now have **expanded video export settings for quality**, resolution, aspect ratio, frame rate and codec (compression format) to tailor your final video.
* Improved export compatibility with external tools: World generations now export in the OpenGL coordinate system (previously OpenCV) for both splats and meshes. SPZ splats in Studio now export by default in SPZ v2 format (v3 still available as opt-in).

### Bug Fixes

* Fixed bugs around world generation status and added better error messaging for failed generations.
* Fixed bug around display of thumbnails for in-progress world generations.
* Fixed a bug in Compose mode within Studio where importing the same world twice caused edits to be shared across both imported worlds.
* Fixed bugs around payment downgrade/cancellation processing.

## December 5, 2025

### Features and Improvements

* Added ability to take screenshots of 360° panoramas.
* Added option to remove previously linked payment methods from your account.
* Upgraded pano editing to the latest high-quality model version. As part of this update, the credit cost per pano edit has been adjusted from **50 to 150 credits**.

### Bug Fixes

* Fixed issue that prevented some projects from loading in Marble Studio.
* Fixed transform handles not being clickable in **Compose** mode.
* Fixed bug causing **video export in Animate** mode to fail on certain devices.
* Fixed issue where **Chisel panorama view** restricted camera controls after returning to the page.
* Fixed several bugs around **payment success**, **downgrades**, and **cancellation** flows.

## November 20, 2025

### Features and Improvements

* Marble Studio now supports editing and composing significantly larger worlds using a new **Level-of-Detail splat-rendering backend**. Performance should remain stable as you scale up to more worlds and higher splat counts.
* **World IDs** are now displayed in the Worlds section, making it easier to share them with support for debugging.

### Bug Fixes

* Fixed bug where some world generations appeared to be ongoing/spinning for long durations of time without finishing.
* Fixed bug where users could exceed their available credit balances and were subsequently charged for the overage amount when upgrading their subscription plans. Also corrected a credit-to-dollar conversion issue that could overstate the overage amount. Refunds have been issued and all balances were restored to their original subscription credit amounts.
* Fixed bug that caused some users to be unable to upgrade their subscriptions.
