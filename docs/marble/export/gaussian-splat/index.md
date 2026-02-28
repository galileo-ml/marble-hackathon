
# Exporting from Marble

> Take your Marble content to popular 3D engines and platforms!

## Format

We currently support **gaussian splats exports** for all our content.

You can find the file specs and sample files for different options in the
[Export File Specs](/guides/export-options/options#splats).

<Tip>
  The lower-resolution files have been optimized to be as perceptually similar as possible to the higher-resolution files. For those of you working with applications where lighter compute is important, we encourage you to give this a try! You may convert these to .ply files [here](https://spz-to-ply.netlify.app) if needed.
</Tip>

## Integration

The [Radiance Fields](https://radiancefields.com/3d-gaussian-splatting-engine-support) website provides a comprehensive overview of platforms and plugins supporting splat integration. Here is a non-exhaustive subset of tools and platforms that we’ve either tested ourselves or received positive feedback from our user community about.

Click on one of these sub-categories to get started!

<Columns cols={1}>
  <Card title="Spark" icon="sparkle" href="/guides/export-options/spark">
    *Build custom applications using the spark.js framework for three.js developers.*

    \
    Provides the highest degree of control and customization for web-based applications. Perfect for creating VR experiences, interactive games, and custom visualization tools.
  </Card>

  <Card title="Professional Software" icon="palette">
    *Great for professional studios or creators using well-known tools like Unreal Engine, Unity, Houdini, or Blender.*

    These integrate well with offline production pipelines in established 3D software ecosystems. They allow teams to fit Gaussian Splat workflows into existing VFX, animation, or game development pipelines without needing to build tooling from scratch.

    **[Unreal Engine](/guides/export-options/unreal)**,
    **[Unity](/guides/export-options/unity)**,
    **[Blender](/guides/export-options/blender)**,
    **[Houdini](/guides/export-options/houdini)**
  </Card>

  <Card title="Web Platforms (Coming Soon!)" icon="globe">
    *Great for artists or teams prioritizing one-stop solutions and fast iteration over deep customization.*

    \
    These focus on ease of sharing and distribution, often requiring minimal setup. Perfect for quickly showcasing work or creating interactive experiences that can be accessed directly in a browser.
  </Card>
</Columns>

We greatly appreciate the contributions and feedback from our user community on these so far— if you have insights or experiences with other export options, please share them with us on Discord and we will update these resources as we go!
