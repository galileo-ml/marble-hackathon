
# Exporting to Blender

> Import Marble worlds into Blender using Gaussian Splatting plugins

<video autoPlay loop muted className="w-full aspect-video rounded-xl" src="https://mintcdn.com/worldlabs/MLFIZQFuNhLp0_rH/media/marble-export-blender.mp4?fit=max&auto=format&n=MLFIZQFuNhLp0_rH&q=85&s=9d67abd67dee3e069d3bfca1f6db9645" data-path="media/marble-export-blender.mp4" />

There are a couple of Blender plugins available, and we've looked into the following.

<AccordionGroup>
  <Accordion title="KIRI Engine">
    The [**KIRI Engine**](https://www.kiriengine.app/blender-addon/3dgs-render) plugin for Blender is the most well-known and actively maintained option! We've verified it works on Blender 4.2+.
  </Accordion>

  <Accordion title="Reshot AI">
    Some users reported a better experience working with the [**Reshot AI**](https://github.com/ReshotAI/gaussian-splatting-blender-addon) plugin, preferring it over the more maintained KIRI engine plugin, and stating that it was more performant and flexible.
  </Accordion>

  <Accordion title="SplatForge">
    The [SplatForge](https://splatforge.cloud) plugin is the most performant/responsive Blender option we've seen so far! However, the render pass is entirely separate from Blender's main render loops (EEVEE/Cycles), so compositer graph workarounds are needed to combine splats with other Blender geometry.
  </Accordion>

  <Accordion title="Jetset iOS" icon="sparkles">
    The [Jetset iOS app](https://docs.lightcraft.pro/tutorials/blender-workflows/gaussian-splat-setup) allows you to first set up your splats in Blender via a modified Reshot AI plugin, then do virtual production on your phone! We've had a **ton** of fun with this one.
  </Accordion>
</AccordionGroup>

If you have had positive or negative experiences with any of these plugins, we appreciate your feedback and will be updating this page as we go.

<Accordion title="Community FAQ">
  ### Q: Why does the lighting look different in point cloud vs splat mode in ReshotAI? The lighting is darker in splat mode.

  **A:** This is unavoidable due to how splats are represented as differently sized geometry in point cloud vs splat mode. In splat mode, the per-splat meshes are denser, so they occlude the lighting in the scene more. Neither lighting mode is "correct" - they're just different representations.

  There are two solutions:

  1. **Place lights within the scene:** Treat the splats as solid geometry and position your lights strictly within the scene.
  2. **Make lights ignore splats for shadow-casting:** Click on the light → Object tab → Shading → Shadow Linking, then drag the splats into a new collection in that tab and uncheck it. This prevents the splats from casting shadows on other objects in your scene.
     <small>[discord discussion](https://discord.com/channels/1288765343552110637/1448516454055153674)</small>

  ***

  ### Q: How does ReshotAI compare to other Blender plugins?

  **A:** Based on user feedback, ReshotAI is the easiest and most straightforward option out of the plugins tested. While it may not look as great in point cloud mode (giving the Gaussian splats a more "dreamy" look), users have reported preferring it over other options like KIRI Engine and GS loader for its simplicity and ease of use. However, note that the GS loader method doesn't emit lights for objects in the scene, so it relies entirely on your scene lighting.
  <small>[discord discussion](https://discord.com/channels/1288765343552110637/1448516454055153674)</small>
</Accordion>
