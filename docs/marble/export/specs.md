
> Tech specs on export files

# Export file specs

### Images

* <Icon icon="image-plus" /> **Prompt image**:
  * prompt from which the world is generated
* <Icon icon="scan" /> **360 Panorama**:
  * Equirectangular png of 2560 x 1280 pixels

### Splats

* <Icon icon="triangle-dashed" /> **Splats (SPZ)**:
  * Splat-based format optimized for Marble's rendering system, about 2M splats
* <Icon icon="triangle-dashed" /> **Splats (low-res SPZ)**:
  * Splat-based format optimized for Marble's rendering system, about 500k splats
* <Icon icon="triangle-dashed" /> **Splats (PLY)**:
  * Splat file with broader software compatibility, about 2M splats
* <Icon icon="triangle-dashed" /> **Splats (low-res PLY)**:
  * Splat file with broader software compatibility, about 500k splats

### Mesh

* <Icon icon="triangle" /> **Collider Mesh (GLB)**
  * coarse mesh optimized for simple physics calculations
  * glb format
  * 100-200k triangles
* <Icon icon="pyramid" /> **High-quality mesh (GLB)**
  * One glb around 600k triangles, with texture information
  * Another glb around 1M triangles, with vertex colors
  * Takes up to an hour to generate
  * Currently rate limited to 4 generation requests per hour per user
  * You can only generate high quality mesh on worlds you own

## Example files

Here we provide a few example scenes and export files to test against.

### Gaussian Splats

Scroll to the right to see all options.

| Scene                                                                                                        | SPZ 2m                                                                                                                                          | SPZ 500k                                                                                                                                          | PLY 2m                                                                                                                                          | PLY 500k                                                                                                                                          |
| ------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Rustic kitchen with natural light](https://marble.worldlabs.ai/world/69a9fc22-63ad-4e4c-9514-065b9aa56340)  | [<Icon icon="download" />](https://wlt-ai-cdn.art/example_exports/rustic_kitchen_with_natural_light/rustic_kitchen_with_natural_light_2m.spz)   | [<Icon icon="download" />](https://wlt-ai-cdn.art/example_exports/rustic_kitchen_with_natural_light/rustic_kitchen_with_natural_light_500k.spz)   | [<Icon icon="download" />](https://wlt-ai-cdn.art/example_exports/rustic_kitchen_with_natural_light/rustic_kitchen_with_natural_light_2m.ply)   | [<Icon icon="download" />](https://wlt-ai-cdn.art/example_exports/rustic_kitchen_with_natural_light/rustic_kitchen_with_natural_light_500k.ply)   |
| [Elegant library with fireplace](https://marble.worldlabs.ai/world/20fc27f9-5b1f-4c76-8b22-67b866195aaf)     | [<Icon icon="download" />](https://wlt-ai-cdn.art/example_exports/elegant_library_with_fireplace/elegant_library_with_fireplace_2m.spz)         | [<Icon icon="download" />](https://wlt-ai-cdn.art/example_exports/elegant_library_with_fireplace/elegant_library_with_fireplace_500k.spz)         | [<Icon icon="download" />](https://wlt-ai-cdn.art/example_exports/elegant_library_with_fireplace/elegant_library_with_fireplace_2m.ply)         | [<Icon icon="download" />](https://wlt-ai-cdn.art/example_exports/elegant_library_with_fireplace/elegant_library_with_fireplace_500k.ply)         |
| [Modern house with lush landscaping](https://marble.worldlabs.ai/world/e1d2610d-32a7-4364-acbb-8fcc97c1933d) | [<Icon icon="download" />](https://wlt-ai-cdn.art/example_exports/modern_house_with_lush_landscaping/modern_house_with_lush_landscaping_2m.spz) | [<Icon icon="download" />](https://wlt-ai-cdn.art/example_exports/modern_house_with_lush_landscaping/modern_house_with_lush_landscaping_500k.spz) | [<Icon icon="download" />](https://wlt-ai-cdn.art/example_exports/modern_house_with_lush_landscaping/modern_house_with_lush_landscaping_2m.ply) | [<Icon icon="download" />](https://wlt-ai-cdn.art/example_exports/modern_house_with_lush_landscaping/modern_house_with_lush_landscaping_500k.ply) |
| [Narrow European cobblestone lane](https://marble.worldlabs.ai/world/54fad6e4-9c9b-43ba-be6d-f1e31cbe7a95)   | [<Icon icon="download" />](https://wlt-ai-cdn.art/example_exports/narrow_european_cobblestone_lane/narrow_european_cobblestone_lane_2m.spz)     | [<Icon icon="download" />](https://wlt-ai-cdn.art/example_exports/narrow_european_cobblestone_lane/narrow_european_cobblestone_lane_500k.spz)     | [<Icon icon="download" />](https://wlt-ai-cdn.art/example_exports/narrow_european_cobblestone_lane/narrow_european_cobblestone_lane_2m.ply)     | [<Icon icon="download" />](https://wlt-ai-cdn.art/example_exports/narrow_european_cobblestone_lane/narrow_european_cobblestone_lane_500k.ply)     |
| [Warm traditional kitchen interior](https://marble.worldlabs.ai/world/30ac948d-6b19-4191-a12e-4ce4510ccfe7)  | [<Icon icon="download" />](https://wlt-ai-cdn.art/example_exports/warm_traditional_kitchen_interior/warm_traditional_kitchen_interior_2m.spz)   | [<Icon icon="download" />](https://wlt-ai-cdn.art/example_exports/warm_traditional_kitchen_interior/warm_traditional_kitchen_interior_500k.spz)   | [<Icon icon="download" />](https://wlt-ai-cdn.art/example_exports/warm_traditional_kitchen_interior/warm_traditional_kitchen_interior_2m.ply)   | [<Icon icon="download" />](https://wlt-ai-cdn.art/example_exports/warm_traditional_kitchen_interior/warm_traditional_kitchen_interior_500k.ply)   |

### Image & Mesh

| Scene                                                                                                        | 360 Pano                                                                                                                                          | Collider mesh GLB                                                                                                                                     | HQ mesh GLB                                                                                                                                     |
| ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| [Rustic kitchen with natural light](https://marble.worldlabs.ai/world/69a9fc22-63ad-4e4c-9514-065b9aa56340)  | [<Icon icon="download" />](https://wlt-ai-cdn.art/example_exports/rustic_kitchen_with_natural_light/rustic_kitchen_with_natural_light_pano.png)   | [<Icon icon="download" />](https://wlt-ai-cdn.art/example_exports/rustic_kitchen_with_natural_light/rustic_kitchen_with_natural_light_collider.glb)   | [<Icon icon="download" />](https://wlt-ai-cdn.art/example_exports/rustic_kitchen_with_natural_light/rustic_kitchen_with_natural_light_hq.glb)   |
| [Elegant library with fireplace](https://marble.worldlabs.ai/world/20fc27f9-5b1f-4c76-8b22-67b866195aaf)     | [<Icon icon="download" />](https://wlt-ai-cdn.art/example_exports/elegant_library_with_fireplace/elegant_library_with_fireplace_pano.png)         | [<Icon icon="download" />](https://wlt-ai-cdn.art/example_exports/elegant_library_with_fireplace/elegant_library_with_fireplace_collider.glb)         | [<Icon icon="download" />](https://wlt-ai-cdn.art/example_exports/elegant_library_with_fireplace/elegant_library_with_fireplace_hq.glb)         |
| [Modern house with lush landscaping](https://marble.worldlabs.ai/world/e1d2610d-32a7-4364-acbb-8fcc97c1933d) | [<Icon icon="download" />](https://wlt-ai-cdn.art/example_exports/modern_house_with_lush_landscaping/modern_house_with_lush_landscaping_pano.png) | [<Icon icon="download" />](https://wlt-ai-cdn.art/example_exports/modern_house_with_lush_landscaping/modern_house_with_lush_landscaping_collider.glb) | [<Icon icon="download" />](https://wlt-ai-cdn.art/example_exports/modern_house_with_lush_landscaping/modern_house_with_lush_landscaping_hq.glb) |
| [Narrow European cobblestone lane](https://marble.worldlabs.ai/world/54fad6e4-9c9b-43ba-be6d-f1e31cbe7a95)   | [<Icon icon="download" />](https://wlt-ai-cdn.art/example_exports/narrow_european_cobblestone_lane/narrow_european_cobblestone_lane_pano.png)     | [<Icon icon="download" />](https://wlt-ai-cdn.art/example_exports/narrow_european_cobblestone_lane/narrow_european_cobblestone_lane_collider.glb)     | [<Icon icon="download" />](https://wlt-ai-cdn.art/example_exports/narrow_european_cobblestone_lane/narrow_european_cobblestone_lane_hq.glb)     |
| [Warm traditional kitchen interior](https://marble.worldlabs.ai/world/30ac948d-6b19-4191-a12e-4ce4510ccfe7)  | [<Icon icon="download" />](https://wlt-ai-cdn.art/example_exports/warm_traditional_kitchen_interior/warm_traditional_kitchen_interior_pano.png)   | [<Icon icon="download" />](https://wlt-ai-cdn.art/example_exports/warm_traditional_kitchen_interior/warm_traditional_kitchen_interior_collider.glb)   | [<Icon icon="download" />](https://wlt-ai-cdn.art/example_exports/warm_traditional_kitchen_interior/warm_traditional_kitchen_interior_hq.glb)   |

## FAQ

### What's the difference between SPZ and PLY formats?

SPZ is Marble's native splat format optimized for file size, while PLY is a
uncompressed format compatible with more Gaussian splat software packages.

### Why are my splats / meshes up-side-down when I export them to other software?

Default world labs worlds are in OpenCV coordinate system (+x left, +y down, +z forward).
Many DCC software are in the OpenGL coordinate system (+x left, -y down, -z forward).
To correct for it, perform an OpenCV-to-OpenGL transformation by scaling the Y and Z
axes by -1 (keeping X unchanged).
[See more on coordinate systems.](https://stackoverflow.com/questions/44375149/opencv-to-opengl-coordinate-system-transform)
