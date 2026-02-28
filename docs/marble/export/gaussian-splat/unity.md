
# Exporting to Unity

> Import Marble worlds into Unity using Gaussian Splatting plugins

<video autoPlay loop muted className="w-full aspect-video rounded-xl" src="https://mintcdn.com/worldlabs/MLFIZQFuNhLp0_rH/media/marble-export-unity.mp4?fit=max&auto=format&n=MLFIZQFuNhLp0_rH&q=85&s=2bdc9ac35a56a7e3b6bc929c8af3ad17" data-path="media/marble-export-unity.mp4" />

The free [**aras-p plugin**](https://github.com/aras-p/UnityGaussianSplatting) works well on Unity 6.1! Users have also reported positive results with this plugin. However, note that users have also reported draw-order issues in bringing multiple splat components in. So if you want to use multiple marble worlds in the same level, you may need to combine them into a single component beforehand.

If you have had positive or negative experiences with this plugin, we appreciate your feedback and will be updating this page as we go.

<Accordion title="Community FAQ">
  ### Q: I'm getting an "Index out of range" error when trying to import 500k splats in Unity. The 2M splats work fine, but the low-res ones don't load.

  **A:** This is a known issue with the 500k spz files. As a workaround, convert the 500k spz file to a ply file using the converter at [https://spz-to-ply.netlify.app/](https://spz-to-ply.netlify.app/). The converted 500k ply file should import into Unity without issues. <small>[discord discussion](https://discord.com/channels/1288765343552110637/1421913319538954472)</small>

  ***

  ### Q: How can I convert a splat into a working 3D mesh inside Unity so I can interact with it and try new things?

  **A:** There's nothing inside Unity that supports converting splats to meshes. The only plugin we're aware of that supports this is the Houdini GSOPs plugin. We have collider meshes and high quality mesh baking natively in Marble though! <small>[discord discussion](https://discord.com/channels/1288765343552110637/1421913319538954472)</small>

  ***

  ### Q: My splat renders fine in Unity's Game view, but when I export to Quest 3 VR, I get a completely black screen. What's wrong?

  **A:** Enable HDR on your URP asset. This simple setting fix resolves the black screen issue in VR builds. Make sure HDR is enabled in your Universal Render Pipeline asset settings. <small>[discord discussion](https://discord.com/channels/1288765343552110637/1421913319538954472)</small>

  ***

  ### Q: What Unity version should I use for VR projects with splats?

  **A:** Use Unity 6.0 (specifically 6000.0.23f1 or similar). The aras-p plugin does not work for VR on Unity 6.3. After downgrading to 6.0, make sure you have all the XR packages installed and check your graphics API settings. <small>[discord discussion](https://discord.com/channels/1288765343552110637/1421913319538954472)</small>

  ***

  ### Q: What are the recommended settings for getting splats working in VR on Quest 3?

  **A:** Here's the recommended setup:

  * **Unity Version:** 6.0 (6000.0.23f1 or similar)
  * **Plugin:** aras-p UnityGaussianSplatting package
  * **Render Pipeline:** URP (Universal Render Pipeline) with HDR enabled
  * **Graphics API:** Vulkan
  * **Rendering Mode:** Multi-view (not Single Pass Instanced - SPI causes black screens when the headset is active)
  * **XR Packages:** Make sure all XR packages are installed

  Both URP and BiRP (Built-in Render Pipeline) work, but URP is recommended. The visual quality looks the same between them. <small>[discord discussion](https://discord.com/channels/1288765343552110637/1421913319538954472)</small>

  ***

  ### Q: I'm getting a "PLY vertex size mismatch, expected 252 but file has 68" error with the ninjamode Gaussian splat VR plugin. The same file works fine with the aras plugin.

  **A:** Unfortunately, we haven't tested the ninjamode plugin ourselves and can't advise on it. The aras-p plugin is the recommended solution for Unity splat imports. We've put the ninjamode plugin on our list to try out in the future. <small>[discord discussion](https://discord.com/channels/1288765343552110637/1421913319538954472)</small>

  ***

  ### Q: I can't get Multi-pass rendering to work in VR - it automatically switches back to Single-pass when I open it in VR.

  **A:** This is expected behavior. Multi-view rendering works, but Single Pass Instanced (SPI) causes black screens when the headset is active. Stick with Multi-view rendering for VR builds. <small>[discord discussion](https://discord.com/channels/1288765343552110637/1421913319538954472)</small>

  ***

  ### Q: What's the performance like with splats on Quest 3?

  **A:** Based on testing:

  * **2M splat files:** Cause Quest 3 builds to crash when opening. Not recommended for standalone VR.
  * **500k splat files:** Work better for VR, with better small details than 2M files in some cases. Performance is around 12fps in Unity, compared to 19fps in PlayCanvas (via Oculus browser). The 500k files are more suitable for standalone VR, while 2M files may only be viable for desktop VR. <small>[discord discussion](https://discord.com/channels/1288765343552110637/1421913319538954472)</small>

  ***

  ### Q: I need to place assets inside my Marble environment, but they're falling through the floor even though I have a mesh collider component on the GLB. Any tips?

  **A:** This question was raised but not fully resolved in the discussion. The GLB mesh collider may need additional configuration. We're planning to support coarse nav meshes and collider meshes natively in Marble soon, which should help with physics interactions. <small>[discord discussion](https://discord.com/channels/1288765343552110637/1421913319538954472)</small>

  ***

  ### Q: Which splat export format should I use for Unity?

  **A:** Marble offers three export options:

  * **2M ply** - Full resolution PLY format
  * **2M spz** - Full resolution SPZ format
  * **500K spz** - Lower resolution SPZ format

  For Unity, the 2M spz files work out of the box. The 500k spz files have a known issue and need to be converted to ply format using [https://spz-to-ply.netlify.app/](https://spz-to-ply.netlify.app/) before importing. <small>[discord discussion](https://discord.com/channels/1288765343552110637/1421913319538954472)</small>

  ***

  ### Q: The aras plugin works in the sample project, but when I try to use it in an empty project, the .ply file doesn't show up at all.

  **A:** Make sure you have all the required XR packages installed and that your graphics API is set correctly (Vulkan for VR). Also ensure HDR is enabled on your URP asset. Try recreating the setup from the aras-p sample project to ensure all dependencies are properly configured. <small>[discord discussion](https://discord.com/channels/1288765343552110637/1421913319538954472)</small>
</Accordion>
