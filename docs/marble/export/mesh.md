
# Mesh export

<iframe width="100%" height="400" src="https://www.youtube.com/embed/I7rYwrgXRmg" title="Mesh Export" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />

# Mesh Export: Downloading 3D Assets

Export your Marble worlds as 3D meshes for use in game engines, 3D software, and other
applications. Choose from multiple mesh formats and quality levels to suit your specific
needs, from quick prototyping to high-quality production assets.

## Getting Started with Collider Mesh Export

You can export collider mesh along with a splat to provide simple physics for games.
For example, see [**first person shooting game**](https://github.com/bmild/spark-physics).
To download collider mesh, navigate to the <Icon icon="download" /> download menu from
world viewer, or world in <Icon icon="globe" /> Worlds, and download from the
<Icon icon="triangle" /> Collider Mesh (GLB) link.

## Getting Started with High Quality Mesh Export

1. **Trigger Offline Generation**: Select
   <Icon icon="rectangle-ellipsis" /> **High-quality mesh (GLB)** from your world's
   export options
2. **Wait for Processing**: <Icon icon="loader-2" /> High-quality mesh generation takes up to an hour to complete
3. **Continue Working**: You can close tabs and browser windows - the process continues in the background
4. **Download When Ready**: Return later to find a
   <Icon icon="pyramid" /> **High-quality mesh (GLB)** button replacing the generate option
5. **Access Premium Quality**: Download detailed meshes, one around 600k triangles and
   texture maps, another around 1M triangles with vertex colors.

## FAQ

### How long does offline mesh generation take?

High-quality mesh generation could take up to 1 hour, depending on world complexity and
system load. You can close your browser and the process will continue in the background.

### Can I use collider meshes for visual rendering?

No. **Collider meshes** are optimized for physics interactions and have simplified geometry.
For visual rendering, use splats or the high-quality offline-generated meshes instead.

### How do I know when my offline mesh is ready?

Return to your world's <Icon icon="download" /> download menu after several hours.
The <Icon icon="rectangle-ellipsis" /> **High-quality mesh (GLB)** or option will be
replaced with a <Icon icon="pyramid" /> **High-quality mesh (GLB)** button when processing
is complete.

### What's included with high-quality meshes?

High-quality meshes include detailed geometry (around 600k triangles), and texture maps
. Some versions also include vertex color data for additional
material flexibility. See examples on [Export File Specs →](/marble/export/specs).

### Can I cancel offline mesh generation?

Currently, once started, offline mesh generation runs to completion in the background.

### What's the file size of exported meshes?

File sizes vary by complexity and format. Collider mesh are typically 3-4 MB,
while high-quality meshes with textures are typical around 100 - 200 MB depending on
world details. See examples on [Export File Specs →](/marble/export/specs).
