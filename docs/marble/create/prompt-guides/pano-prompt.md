
> Use panoramas for maximum control over the world.

# Pano prompt tips

# Creating Worlds from Panoramic Images

Upload 360° panoramic images to create immersive 3D worlds with maximum control over your environment.
Panoramas provide complete spatial information, allowing for more accurate and detailed world generation than standard images.

## Getting Started with Panorama Upload

You can obtain a full 360 equirectangular panorama by capturing it with a 360 camera,
rendering it from a 3D software, or downloading from a Marble world.
To create a world with panorama, you can simply drag and drop it to the omnibox; it
will expand with <Icon icon="image" /> 2D input mode.
Check the left and right edge of your panorama is continuous for best results.
If the image is successfully recognized as a panorama, a <Icon icon="panorama" />
icon will appear on the image thumbnail. You can then start a
generation by clicking on <Icon icon="brush" /> Create.

## Troubleshooting Common Issues

### "Image is not recognized as a panorama"

* **Check Aspect Ratio**: Ensure exactly 2:1 width to height ratio
* **Check sky and ground coverage**: Phone panoramas often lack full vertical 180 coverage

### "Seam visible in generated world"

* **Fix Source Panorama**: Repair edge alignment in image editing software,
* **"Use advanced editing"**: to edit panorama with AI assistance on Marble.

## Frequently Asked Questions

### Are multi panorama inputs supported?

* **Not directly**: Multiple panoramic images cannot be uploaded together in a single generation. However, you can create larger worlds by generating a world from each panorama separately, then stitching them together using [Studio Compose](/marble/create/studio-tools/compose).

Panoramic uploads give you the most control over the final world layout, as the 360° image provides complete spatial information for the AI to work with.
