
# Exporting to Unreal Engine

> Import Marble worlds into Unreal Engine using Gaussian Splatting plugins

<video autoPlay loop muted className="w-full aspect-video rounded-xl" src="https://mintcdn.com/worldlabs/MLFIZQFuNhLp0_rH/media/marble-export-unreal.mp4?fit=max&auto=format&n=MLFIZQFuNhLp0_rH&q=85&s=4a1abd9361819313e8ec0f30bdcba0c5" data-path="media/marble-export-unreal.mp4" />

There are a couple Unreal plugins currently available for Windows.

<AccordionGroup>
  <Accordion title="Postshot (Recommended)" icon="sparkles">
    The [**Postshot**](https://www.jawset.com/docs/d/Postshot+User+Guide/Unreal+Engine+Integration) plugin for Unreal works reliably (we've verified it works on UE5.2)! A free version is available, but you need to upgrade for the full set of functionality and for commercial use.\
    \
    It currently can only be run on Windows machines that have the standalone Postshot software installed. You'll need to import .ply files into Postshot and save out in postshot format (.psht) before loading into Unreal.
  </Accordion>

  <Accordion title="Volinga (Recommended)" icon="sparkles">
    The paid [**Volinga**](https://web.volinga.ai/#VolingaPlugin) plugin has been a popular option amongst our virtual production users and comes with additional features specific to virtual production.
  </Accordion>

  <Accordion title="Akiya">
    The [**Akiya**](https://vrlab.akiya-souken.co.jp/en/products/threedgaussianplugin/) plugin works pretty well! We suggest considering this option as well, but it is slightly more costly than Postshot and Volinga.
  </Accordion>

  <Accordion title="Luma / XVerse">
    While the [XVerse](https://github.com/xverse-engine/XScene-UEPlugin) and [Luma](https://www.fab.com/listings/b52460e0-3ace-465e-a378-495a5531e318) plugins are completely free, they are not actively maintained and our users have had partial-but-limited success with these.

    In particular, XVerse is functional on UE5.2 but may come with some visual artefacts from under-the-hood aggressive optimizing / downsampling!
  </Accordion>
</AccordionGroup>

If you have had positive or negative experiences with any of these plugins, we appreciate your feedback and will be updating this page as we go.

<Accordion title="Community FAQ">
  ### Q: Which Unreal Engine plugin supports depth of field with splats and meshes together?

  **A:** For depth of field support, **Volinga** is potentially the best option, especially for virtual production use cases. The **3D Gaussians Plugin** (Akiya) also supports depth of field and works with nDisplay. Note that Postshot didn't work well with nDisplay according to user reports. <small>[discord discussion](https://discord.com/channels/1288765343552110637/1422034485934821497)</small>

  ***

  ### Q: How can I get depth of field to work with splats in Unreal Engine?

  **A:** You can change the splat material from translucent to masked with AA Temporal Dither. This allows depth of field to work correctly, but note that it will slightly lower the visual quality compared to translucent materials. To do this, open the large Niagara node and look at the bottom section where you'll see the material your particles use. Change the material blend mode from translucent to masked and enable AA Temporal Dither. <small>[discord discussion](https://discord.com/channels/1288765343552110637/1422034485934821497)</small>

  ***

  ### Q: Why do my splats look low resolution in Unreal compared to viewing them on the Marble site?

  **A:** The **XVerse** plugin does internal downsampling that causes artifacts and reduces splat density. This is a known issue with that plugin. **Postshot** doesn't have this low resolution issue. Also, make sure you're not downloading files as "SPZ Low-res" format, as that will naturally have fewer splats. <small>[discord discussion](https://discord.com/channels/1288765343552110637/1422034485934821497)</small>

  ***

  ### Q: Does Postshot add a watermark to my Unreal Engine scenes?

  **A:** Yes, Postshot implements a watermark icon in the Unreal Engine scene when you import a .psht file. This watermark appears in the scene view. <small>[discord discussion](https://discord.com/channels/1288765343552110637/1422034485934821497)</small>

  ***

  ### Q: Can I still use the Luma plugin for Unreal Engine?

  **A:** No, Luma no longer supports its Unreal Engine plugin and it won't work properly. The plugin was discontinued and is not actively maintained. Even in UE 5.3 (the last supported version), the plugin doesn't function correctly. <small>[discord discussion](https://discord.com/channels/1288765343552110637/1422034485934821497)</small>

  ***

  ### Q: How can I convert SPZ files to PLY format for use with different plugins?

  **A:** You can use the online converter at [https://spz-to-ply.netlify.app/](https://spz-to-ply.netlify.app/) to convert SPZ files to PLY format. This is useful if you need to use a plugin that requires PLY format or if you're experiencing issues with SPZ files. <small>[discord discussion](https://discord.com/channels/1288765343552110637/1422034485934821497)</small>

  ***

  ### Q: Which plugin works best for virtual production with nDisplay?

  **A:** **Volinga** is the recommended option for virtual production and nDisplay compatibility. Postshot had issues with nDisplay according to user reports. The **3D Gaussians Plugin** (Akiya) also supports nDisplay and depth of field, though it's more expensive. <small>[discord discussion](https://discord.com/channels/1288765343552110637/1422034485934821497)</small>

  ***

  ### Q: I'm getting texture errors when importing PLY files with XV3DGS in Unreal Engine 5.5. Is this normal?

  **A:** Yes, this is a known issue. In UE 5.5, XV3DGS shows texture errors when importing PLY files. On first import, you may see an empty cube, and after reloading, you may see a gray mesh. This is expected behavior with this plugin in 5.5. <small>[discord discussion](https://discord.com/channels/1288765343552110637/1422034485934821497)</small>

  ***

  ### Q: My material status shows "none" after importing with XV3DGS. Will anything work?

  **A:** If the material status is "none", the splats won't render properly. Try exporting your Marble world as SPZ format and converting it to PLY using [https://spz-to-ply.netlify.app/](https://spz-to-ply.netlify.app/) before importing. Make sure you haven't modified the particle material or textures in the import folder. <small>[discord discussion](https://discord.com/channels/1288765343552110637/1422034485934821497)</small>

  ***

  ### Q: What's the best plugin for depth of field and nDisplay support if I'm willing to pay?

  **A:** The **3D Gaussians Plugin** (Akiya) is expensive but offers the most reliable solution. It supports depth of field, works with nDisplay, has an automatic splitting system to divide scenes into multiple Niagara effects for full quality, and provides better quality than XVerse. It's less problematic than other plugins according to user reports. <small>[discord discussion](https://discord.com/channels/1288765343552110637/1422034485934821497)</small>

  ***

  ### Q: Can I change the material settings in XVerse/XScene-UEPlugin to enable depth of field?

  **A:** While it's theoretically possible to change the material from translucent to masked in the Niagara component, users have reported that Unreal Engine crashes when attempting this with the XScene-UEPlugin. The material settings may be locked or cause instability with this particular plugin. <small>[discord discussion](https://discord.com/channels/1288765343552110637/1422034485934821497)</small>

  ***

  ### Q: Does Postshot still allow exporting to PLY format in the free version?

  **A:** No, the Postshot plugin no longer allows exporting as PLY if you don't have a paid subscription. This is a limitation of the free version. <small>[discord discussion](https://discord.com/channels/1288765343552110637/1422034485934821497)</small>
</Accordion>
