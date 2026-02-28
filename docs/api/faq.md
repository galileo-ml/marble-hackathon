
# Frequently asked questions

> Common questions and answers about the World API

### Can I retrieve PLY files from the API?

The World Labs API currently returns scene geometry in **.spz (3D Gaussian Splat)** format only. Direct export of .ply files via the API is not supported.

For production or large-scale workflows, .spz files should be converted programmatically using existing libraries:

* C++: [https://github.com/nianticlabs/spzJavaScript](https://github.com/nianticlabs/spzJavaScript)
* TypeScript: [https://github.com/arrival-space/spz-js](https://github.com/arrival-space/spz-js)

For small-scale or one-off use, a hosted web tool is available for ad-hoc conversion: [https://spz-to-ply.netlify.app](https://spz-to-ply.netlify.app)

### How does API billing work?

Billing for the World API is separate from billing for the Marble web app.

* Credits purchased for the Marble app cannot be used with the API
* API usage requires credits purchased through the World Labs Platform

If you plan to use the API, make sure you purchase credits on the World Labs Platform, NOT in the Marble app.

### How do I get a panorama image from my world generation?

Every world generation includes a panorama image in the response, accessible via `assets.imagery.pano_url`. This panorama is automatically generated as part of the world creation process.

If you only need the panorama and want faster, cheaper results, use `Marble 0.1-mini` (draft mode):

* Generation time: 30-45 seconds (vs. 5+ minutes for `Marble 0.1-plus`)
* Cost: 150-330 credits (vs. 1,500-1,600 credits for `Marble 0.1-plus`)

To use draft mode, add `"model": "Marble 0.1-mini"` to your world generation request:

```json  theme={null}
{
  "display_name": "Quick Panorama",
  "world_prompt": {
    "type": "text",
    "text_prompt": "A serene mountain landscape"
  },
  "model": "Marble 0.1-mini"
}
```

The panorama URL will be available in the response at `operation.response.assets.imagery.pano_url` or when you fetch the world via `GET /marble/v1/worlds/{world_id}`.

### What is the difference between the `Marble 0.1-mini` and `Marble 0.1-plus` models? When should I use each?

World Labs offers two model variants for scene generation:

* `Marble 0.1-mini` is optimized for **speed and cost**. It's best suited for rapid iteration, previews, testing, and large-scale batch jobs where throughput matters more than maximum fidelity.
* `Marble 0.1-plus` prioritizes **higher visual quality and detail**. It's recommended for final assets, production scenes, and use cases where accuracy and realism are important.

**Best practice**: Use `Marble 0.1-mini` during development and experimentation, then switch to `Marble 0.1-plus` for final or customer-facing outputs.

### Where can I read more about World Labs policies?

Please view our [Terms of Service](/terms-of-service) and [Privacy Policy](/privacy-policy) for details.
