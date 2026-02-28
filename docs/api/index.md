
# Quickstart

> Learn how to use the World API

## Quickstart

<Steps>
  <Step title="Get an API key">
    <Steps>
      <Step>
        Sign in to the [World Labs Platform](https://platform.worldlabs.ai) with your Marble account.

        If you don't have a Marble account, you'll be prompted to create one.
      </Step>

      <Step>
        Visit the [billing page](https://platform.worldlabs.ai/billing).

        Add a payment method to your account and then purchase some credits to get started.
      </Step>

      <Step>
        Generate an API key from the [API keys page](https://platform.worldlabs.ai/api-keys).

        <Warning>
          Save your API key in a secure location and never share it with anyone.
        </Warning>
      </Step>
    </Steps>
  </Step>

  <Step title="Create your first world">
    To verify your development setup is working, we recommend creating a world from only a text prompt.

    You can also create a world from an image, multiple images of the same scene, or a video.

    <Note>
      Iterate more quickly with `Marble 0.1-mini` (equivalent to Draft in Marble).

      This example uses `Marble 0.1-plus` by default for best quality. If you’re iterating or debugging, you can use `Marble 0.1-mini` for much faster (30-45s) and cheaper generations.

      To use it, add `"model": "Marble 0.1-mini"` to your request body.
    </Note>

    <Tabs>
      <Tab title="Text input">
        <Steps>
          <Step>
            Make a `POST` request to the [`/marble/v1/worlds:generate`](/api/reference/worlds/generate) endpoint.

            <CodeGroup dropdown>
              ```bash Request theme={null}
              curl -X POST 'https://api.worldlabs.ai/marble/v1/worlds:generate' \
                -H 'Content-Type: application/json' \
                -H 'WLT-Api-Key: YOUR_API_KEY' \
                -d '{
                  "display_name": "Mystical Forest",
                  "world_prompt": {
                    "type": "text",
                    "text_prompt": "A mystical forest with glowing mushrooms"
                  }
                }'
              ```

              ```javascript Request theme={null}
              const response = await fetch('https://api.worldlabs.ai/marble/v1/worlds:generate', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'WLT-Api-Key': 'YOUR_API_KEY'
                },
                body: JSON.stringify({
                  display_name: 'Mystical Forest',
                  world_prompt: {
                    type: 'text',
                    text_prompt: 'A mystical forest with glowing mushrooms'
                  }
                })
              });

              const data = await response.json();

              console.log(data);
              ```

              ```python Request theme={null}
              import requests

              url = "https://api.worldlabs.ai/marble/v1/worlds:generate"

              payload = {
                  "display_name": "Mystical Forest",
                  "world_prompt": {
                      "type": "text",
                      "text_prompt": "A mystical forest with glowing mushrooms"
                  }
              }
              headers = {
                  "WLT-Api-Key": "YOUR_API_KEY",
                  "Content-Type": "application/json"
              }

              response = requests.post(url, json=payload, headers=headers)

              print(response.text)
              ```
            </CodeGroup>

            This will return an Operation object.

            <CodeGroup>
              ```json Response theme={null}
              {
                "operation_id": "20bffbb1-4ba7-453f-a116-93eaw1a6843e",
                "created_at": "2025-01-15T10:30:00Z",
                "updated_at": "2025-01-15T10:30:00Z",
                "expires_at": "2025-01-15T11:30:00Z",
                "done": false,
                "error": null,
                "metadata": null,
                "response": null
              }
              ```
            </CodeGroup>
          </Step>

          <Step>
            Poll the [`/marble/v1/operations/{operation_id}`](/api/reference/operations/get) endpoint until the operation is done.

            <CodeGroup>
              ```bash Request theme={null}
              curl -X GET 'https://api.worldlabs.ai/marble/v1/operations/20bffbb1-4ba7-453f-a116-93eaw1a6843e' \
                -H 'WLT-Api-Key: YOUR_API_KEY'
              ```

              ```javascript Request theme={null}
              const response = await fetch('https://api.worldlabs.ai/marble/v1/operations/20bffbb1-4ba7-453f-a116-93eaw1a6843e', {
                method: 'GET',
                headers: {
                  'WLT-Api-Key': 'YOUR_API_KEY'
                }
              });

              const data = await response.json();

              console.log(data);
              ```

              ```python Request theme={null}
              import requests

              url = "https://api.worldlabs.ai/marble/v1/operations/20bffbb1-4ba7-453f-a116-93eaw1a6843e"

              headers = {
                  "WLT-Api-Key": "YOUR_API_KEY"
              }

              response = requests.get(url, headers=headers)

              print(response.text)
              ```
            </CodeGroup>

            This will return an Operation object. If the operation is not done, it will return a `200` status code and the Operation object will have a `done` field set to `false`:

            <CodeGroup>
              ```json Response theme={null}
              {
                "operation_id": "20bffbb1-4ba7-453f-a116-93eaw1a6843e",
                "created_at": "2025-01-15T10:30:00Z",
                "updated_at": "2025-01-15T10:30:00Z",
                "expires_at": "2025-01-15T11:30:00Z",
                "done": false,
                "error": null,
                "metadata": {
                  "progress": { "status": "IN_PROGRESS", "description": "World generation in progress" },
                  "world_id": "dc2c65e4-68d3-4210-a01e-7a54cc9ded2a"
                },
                "response": null
              }
              ```
            </CodeGroup>

            World generation should take **about 5 minutes** to complete. Once the world is generated, the `done` field will be set to `true` and the `response` field will contain the generated World:

            <CodeGroup>
              ```json Response theme={null}
              {
                "operation_id": "20bffbb1-4ba7-453f-a116-93eab1a6843e",
                "created_at": "2025-01-15T10:30:00Z",
                "updated_at": "2025-01-15T10:35:00Z",
                "expires_at": "2025-01-15T11:30:00Z",
                "done": true,
                "error": null,
                "metadata": {
                  "progress": {
                    "status": "SUCCEEDED",
                    "description": "World generation completed successfully"
                  },
                  "world_id": "dc2c65e4-68d3-4210-a01e-7a54cc9ded2a"
                },
                "response": {
                  "id": "dc2c65e4-68d3-4210-a01e-7a54cc9ded2a",
                  "display_name": "",
                  "tags": null,
                  "world_marble_url": "https://marble.worldlabs.ai/world/dc2c65e4-68d3-4210-a01e-7a54cc9ded2a",
                  "assets": {
                    "caption": "The scene is a fantastical forest...",
                    "thumbnail_url": "<thumbnail_url>",
                    "splats": {
                      "spz_urls": {
                        "500k": "<500k_spz_url>",
                        "100k": "<100k_spz_url>",
                        "full_res": "<full_res_spz_url>"
                      }
                    },
                    "mesh": {
                      "collider_mesh_url": "<collider_mesh_url>"
                    },
                    "imagery": {
                      "pano_url": "<pano_url>"
                    }
                  },
                  "created_at": null,
                  "updated_at": null,
                  "permission": null,
                  "world_prompt": null,
                  "model": null
                }
              }
              ```
            </CodeGroup>

            <Note>
              The `response` field contains a snapshot of the World at the time the operation completed. This allows you to access the generated assets without making a separate API call. Note that some fields like `display_name`, `created_at`, `updated_at`, `world_prompt`, and `model` may be empty or null in this snapshot. Use the [`GET /marble/v1/worlds/{world_id}`](/api/reference/worlds/get) endpoint to fetch the complete, up-to-date world.
            </Note>

            You can view the generated world in Marble at `https://marble.worldlabs.ai/world/{world_id}`.
          </Step>

          <Step title="(Optional) Get the latest world">
            If you need to fetch the most up-to-date version of the world later, use the `world_id` to retrieve it.

            <CodeGroup dropdown>
              ```bash Request theme={null}
              curl -X GET 'https://api.worldlabs.ai/marble/v1/worlds/dc2c65e4-68d3-4210-a01e-7a54cc9ded2a' \
                -H 'WLT-Api-Key: YOUR_API_KEY'
              ```

              ```javascript Request theme={null}
              const response = await fetch('https://api.worldlabs.ai/marble/v1/worlds/dc2c65e4-68d3-4210-a01e-7a54cc9ded2a', {
                method: 'GET',
                headers: {
                  'WLT-Api-Key': 'YOUR_API_KEY'
                }
              });

              const data = await response.json();

              console.log(data);
              ```

              ```python Request theme={null}
              import requests

              url = "https://api.worldlabs.ai/marble/v1/worlds/dc2c65e4-68d3-4210-a01e-7a54cc9ded2a"

              headers = {
                  "WLT-Api-Key": "YOUR_API_KEY"
              }

              response = requests.get(url, headers=headers)

              print(response.text)
              ```
            </CodeGroup>

            This returns the latest version of the world:

            <CodeGroup>
              ```json Response theme={null}
              {
                "world": {
                  "id": "dc2c65e4-68d3-4210-a01e-7a54cc9ded2a",
                  "display_name": "Mystical Forest",
                  "tags": null,
                  "world_marble_url": "https://marble.worldlabs.ai/world/dc2c65e4-68d3-4210-a01e-7a54cc9ded2a",
                  "assets": {
                    "caption": "The scene is a fantastical forest...",
                    "thumbnail_url": "<thumbnail_url>",
                    "splats": {
                      "spz_urls": {
                        "500k": "<500k_spz_url>",
                        "full_res": "<full_res_spz_url>",
                        "100k": "<100k_spz_url>"
                      }
                    },
                    "mesh": {
                      "collider_mesh_url": "<collider_mesh_url>"
                    },
                    "imagery": {
                      "pano_url": "<pano_url>"
                    }
                  },
                  "created_at": "2025-01-15T10:30:00Z",
                  "updated_at": "2025-01-15T10:35:00Z",
                  "permission": null,
                  "world_prompt": {
                    "type": "text",
                    "text_prompt": "The scene is a fantastical forest..."
                  },
                  "model": "Marble 0.1-plus"
                }
              }
              ```
            </CodeGroup>

            The world object includes:

            * `assets.splats.spz_urls`: 3D Gaussian splat files in SPZ format (100k, 500k, and full resolution)
            * `assets.mesh.collider_mesh_url`: Collider mesh in GLB format
            * `assets.imagery.pano_url`: Panorama image
            * `assets.caption`: AI-generated description of the world
            * `assets.thumbnail_url`: Thumbnail image for the world
            * `world_prompt`: The prompt used to generate the world (may be recaptioned)
            * `model`: The model used for generation
          </Step>
        </Steps>
      </Tab>

      <Tab title="Image input">
        You can create a world from a single image using either a public URL or by uploading a local file.

        Recommended image formats: `jpg`, `jpeg`, `png`, `webp`.

        <Tabs>
          <Tab title="From URL">
            If your image is already hosted at a public URL, you can reference it directly.

            <Steps>
              <Step>
                Make a `POST` request to the [`/marble/v1/worlds:generate`](/api/reference/worlds/generate) endpoint with your image URL.

                <CodeGroup dropdown>
                  ```bash Request theme={null}
                  curl -X POST 'https://api.worldlabs.ai/marble/v1/worlds:generate' \
                    -H 'Content-Type: application/json' \
                    -H 'WLT-Api-Key: YOUR_API_KEY' \
                    -d '{
                      "display_name": "My Image World",
                      "world_prompt": {
                        "type": "image",
                        "image_prompt": {
                          "source": "uri",
                          "uri": "https://example.com/my-image.jpg"
                        },
                        "text_prompt": "A beautiful landscape"
                      }
                    }'
                  ```

                  ```javascript Request theme={null}
                  const response = await fetch('https://api.worldlabs.ai/marble/v1/worlds:generate', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'WLT-Api-Key': 'YOUR_API_KEY'
                    },
                    body: JSON.stringify({
                      display_name: 'My Image World',
                      world_prompt: {
                        type: 'image',
                        image_prompt: {
                          source: 'uri',
                          uri: 'https://example.com/my-image.jpg'
                        },
                        text_prompt: 'A beautiful landscape'
                      }
                    })
                  });

                  const data = await response.json();
                  console.log(data);
                  ```

                  ```python Request theme={null}
                  import requests

                  url = "https://api.worldlabs.ai/marble/v1/worlds:generate"

                  payload = {
                      "display_name": "My Image World",
                      "world_prompt": {
                          "type": "image",
                          "image_prompt": {
                              "source": "uri",
                              "uri": "https://example.com/my-image.jpg"
                          },
                          "text_prompt": "A beautiful landscape"
                      }
                  }
                  headers = {
                      "WLT-Api-Key": "YOUR_API_KEY",
                      "Content-Type": "application/json"
                  }

                  response = requests.post(url, json=payload, headers=headers)
                  print(response.text)
                  ```
                </CodeGroup>

                This returns an Operation object. Poll the operation as shown in the text input example until `done` is `true`. The completed operation's `response` field will contain the generated World.
              </Step>
            </Steps>
          </Tab>

          <Tab title="From local file">
            To use a local image file, first upload it as a media asset, then reference it in your generation request.

            <Steps>
              <Step title="Prepare the upload">
                Make a `POST` request to [`/marble/v1/media-assets:prepare_upload`](/api/reference/media-assets/prepare-upload) to get a signed upload URL.

                <CodeGroup dropdown>
                  ```bash Request theme={null}
                  curl -X POST 'https://api.worldlabs.ai/marble/v1/media-assets:prepare_upload' \
                    -H 'Content-Type: application/json' \
                    -H 'WLT-Api-Key: YOUR_API_KEY' \
                    -d '{
                      "file_name": "my-image.jpg",
                      "kind": "image",
                      "extension": "jpg"
                    }'
                  ```

                  ```javascript Request theme={null}
                  const response = await fetch('https://api.worldlabs.ai/marble/v1/media-assets:prepare_upload', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'WLT-Api-Key': 'YOUR_API_KEY'
                    },
                    body: JSON.stringify({
                      file_name: 'my-image.jpg',
                      kind: 'image',
                      extension: 'jpg'
                    })
                  });

                  const data = await response.json();
                  console.log(data);
                  ```

                  ```python Request theme={null}
                  import requests

                  url = "https://api.worldlabs.ai/marble/v1/media-assets:prepare_upload"

                  payload = {
                      "file_name": "my-image.jpg",
                      "kind": "image",
                      "extension": "jpg"
                  }
                  headers = {
                      "WLT-Api-Key": "YOUR_API_KEY",
                      "Content-Type": "application/json"
                  }

                  response = requests.post(url, json=payload, headers=headers)
                  print(response.text)
                  ```
                </CodeGroup>

                This returns the media asset and upload information:

                <CodeGroup>
                  ```json Response theme={null}
                  {
                    "media_asset": {
                      "id": "550e8400-e29b-41d4-a716-446655440000",
                      "file_name": "my-image.jpg",
                      "kind": "image",
                      "extension": "jpg",
                      "created_at": "2025-01-15T10:30:00Z",
                      "updated_at": null,
                      "metadata": null
                    },
                    "upload_info": {
                      "upload_url": "<signed_upload_url>",
                      "upload_method": "PUT",
                      "required_headers": {
                        "x-goog-content-length-range": "0,1048576000"
                      }
                    }
                  }
                  ```
                </CodeGroup>
              </Step>

              <Step title="Upload the file">
                Upload your image to the signed URL using the method and headers from the response.

                <CodeGroup dropdown>
                  ```bash Request theme={null}
                  curl -X PUT '<signed_upload_url>' \
                    -H 'x-goog-content-length-range: 0,1048576000' \
                    --data-binary '@/path/to/my-image.jpg'
                  ```

                  ```javascript Request theme={null}
                  const fs = require('fs');

                  const imageBuffer = fs.readFileSync('/path/to/my-image.jpg');

                  await fetch('<signed_upload_url>', {
                    method: 'PUT',
                    headers: upload_info.required_headers,
                    body: imageBuffer
                  });
                  ```

                  ```python Request theme={null}
                  import requests

                  with open('/path/to/my-image.jpg', 'rb') as f:
                      image_data = f.read()

                  requests.put(
                      '<signed_upload_url>',
                      headers=upload_info['required_headers'],
                      data=image_data
                  )
                  ```
                </CodeGroup>
              </Step>

              <Step title="Generate the world">
                Use the `media_asset_id` from Step 1 to generate a world.

                <CodeGroup dropdown>
                  ```bash Request theme={null}
                  curl -X POST 'https://api.worldlabs.ai/marble/v1/worlds:generate' \
                    -H 'Content-Type: application/json' \
                    -H 'WLT-Api-Key: YOUR_API_KEY' \
                    -d '{
                      "display_name": "My Image World",
                      "world_prompt": {
                        "type": "image",
                        "image_prompt": {
                          "source": "media_asset",
                          "media_asset_id": "550e8400-e29b-41d4-a716-446655440000"
                        },
                        "text_prompt": "A beautiful landscape"
                      }
                    }'
                  ```

                  ```javascript Request theme={null}
                  const response = await fetch('https://api.worldlabs.ai/marble/v1/worlds:generate', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'WLT-Api-Key': 'YOUR_API_KEY'
                    },
                    body: JSON.stringify({
                      display_name: 'My Image World',
                      world_prompt: {
                        type: 'image',
                        image_prompt: {
                          source: 'media_asset',
                          media_asset_id: '550e8400-e29b-41d4-a716-446655440000'
                        },
                        text_prompt: 'A beautiful landscape'
                      }
                    })
                  });

                  const data = await response.json();
                  console.log(data);
                  ```

                  ```python Request theme={null}
                  import requests

                  url = "https://api.worldlabs.ai/marble/v1/worlds:generate"

                  payload = {
                      "display_name": "My Image World",
                      "world_prompt": {
                          "type": "image",
                          "image_prompt": {
                              "source": "media_asset",
                              "media_asset_id": "550e8400-e29b-41d4-a716-446655440000"
                          },
                          "text_prompt": "A beautiful landscape"
                      }
                  }
                  headers = {
                      "WLT-Api-Key": "YOUR_API_KEY",
                      "Content-Type": "application/json"
                  }

                  response = requests.post(url, json=payload, headers=headers)
                  print(response.text)
                  ```
                </CodeGroup>

                This returns an Operation object. Poll the operation as shown in the text input example until `done` is `true`. The completed operation's `response` field will contain the generated World.
              </Step>
            </Steps>
          </Tab>
        </Tabs>

        <Note>
          The `text_prompt` field is optional. If omitted, a caption will be automatically generated from your image.
        </Note>

        <Note>
          Set `is_pano: true` in the `image_prompt` if your input image is a panorama.
        </Note>
      </Tab>

      <Tab title="Multi-image input">
        You can create a world from multiple images of the same scene, each with an optional azimuth (horizontal angle in degrees).

        Recommended image formats: `jpg`, `jpeg`, `png`, `webp`.

        <Tabs>
          <Tab title="From URLs">
            If your images are already hosted at public URLs, you can reference them directly.

            <Steps>
              <Step>
                Make a `POST` request to the [`/marble/v1/worlds:generate`](/api/reference/worlds/generate) endpoint with your image URLs and their azimuth positions.

                <CodeGroup dropdown>
                  ```bash Request theme={null}
                  curl -X POST 'https://api.worldlabs.ai/marble/v1/worlds:generate' \
                    -H 'Content-Type: application/json' \
                    -H 'WLT-Api-Key: YOUR_API_KEY' \
                    -d '{
                      "display_name": "My Multi-Image World",
                      "world_prompt": {
                        "type": "multi-image",
                        "multi_image_prompt": [
                          {
                            "azimuth": 0,
                            "content": {
                              "source": "uri",
                              "uri": "https://example.com/front.jpg"
                            }
                          },
                          {
                            "azimuth": 180,
                            "content": {
                              "source": "uri",
                              "uri": "https://example.com/back.jpg"
                            }
                          }
                        ],
                        "text_prompt": "A cozy living room"
                      }
                    }'
                  ```

                  ```javascript Request theme={null}
                  const response = await fetch('https://api.worldlabs.ai/marble/v1/worlds:generate', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'WLT-Api-Key': 'YOUR_API_KEY'
                    },
                    body: JSON.stringify({
                      display_name: 'My Multi-Image World',
                      world_prompt: {
                        type: 'multi-image',
                        multi_image_prompt: [
                          {
                            azimuth: 0,
                            content: {
                              source: 'uri',
                              uri: 'https://example.com/front.jpg'
                            }
                          },
                          {
                            azimuth: 180,
                            content: {
                              source: 'uri',
                              uri: 'https://example.com/back.jpg'
                            }
                          }
                        ],
                        text_prompt: 'A cozy living room'
                      }
                    })
                  });

                  const data = await response.json();
                  console.log(data);
                  ```

                  ```python Request theme={null}
                  import requests

                  url = "https://api.worldlabs.ai/marble/v1/worlds:generate"

                  payload = {
                      "display_name": "My Multi-Image World",
                      "world_prompt": {
                          "type": "multi-image",
                          "multi_image_prompt": [
                              {
                                  "azimuth": 0,
                                  "content": {
                                      "source": "uri",
                                      "uri": "https://example.com/front.jpg"
                                  }
                              },
                              {
                                  "azimuth": 180,
                                  "content": {
                                      "source": "uri",
                                      "uri": "https://example.com/back.jpg"
                                  }
                              }
                          ],
                          "text_prompt": "A cozy living room"
                      }
                  }
                  headers = {
                      "WLT-Api-Key": "YOUR_API_KEY",
                      "Content-Type": "application/json"
                  }

                  response = requests.post(url, json=payload, headers=headers)
                  print(response.text)
                  ```
                </CodeGroup>

                This returns an Operation object. Poll the operation as shown in the text input example until `done` is `true`. The completed operation's `response` field will contain the generated World.
              </Step>
            </Steps>
          </Tab>

          <Tab title="From local files">
            To use local image files, first upload each as a media asset, then reference them in your generation request.

            <Steps>
              <Step title="Prepare and upload each image">
                For each image, prepare the upload and upload the file as shown in the [image input example](#from-local-file).

                <CodeGroup dropdown>
                  ```bash Request theme={null}
                  # Prepare upload for first image
                  curl -X POST 'https://api.worldlabs.ai/marble/v1/media-assets:prepare_upload' \
                    -H 'Content-Type: application/json' \
                    -H 'WLT-Api-Key: YOUR_API_KEY' \
                    -d '{
                      "file_name": "front.jpg",
                      "kind": "image",
                      "extension": "jpg"
                    }'

                  # Upload the file to the returned upload_url
                  curl -X PUT '<upload_url>' \
                    -H 'Content-Type: image/jpeg' \
                    --data-binary '@/path/to/front.jpg'

                  # Repeat for each additional image
                  ```

                  ```javascript Request theme={null}
                  const fs = require('fs');

                  async function uploadImage(filePath, fileName) {
                    // Prepare upload
                    const prepareResponse = await fetch('https://api.worldlabs.ai/marble/v1/media-assets:prepare_upload', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        'WLT-Api-Key': 'YOUR_API_KEY'
                      },
                      body: JSON.stringify({
                        file_name: fileName,
                        kind: 'image',
                        extension: 'jpg'
                      })
                    });

                    const { media_asset, upload_info } = await prepareResponse.json();

                    // Upload file
                    const imageBuffer = fs.readFileSync(filePath);
                    await fetch(upload_info.upload_url, {
                      method: 'PUT',
                      headers: upload_info.required_headers,
                      body: imageBuffer
                    });

                    return media_asset.id;
                  }

                  const frontId = await uploadImage('/path/to/front.jpg', 'front.jpg');
                  const backId = await uploadImage('/path/to/back.jpg', 'back.jpg');
                  ```

                  ```python Request theme={null}
                  import requests

                  def upload_image(file_path, file_name):
                      # Prepare upload
                      prepare_response = requests.post(
                          'https://api.worldlabs.ai/marble/v1/media-assets:prepare_upload',
                          headers={
                              'WLT-Api-Key': 'YOUR_API_KEY',
                              'Content-Type': 'application/json'
                          },
                          json={
                              'file_name': file_name,
                              'kind': 'image',
                              'extension': 'jpg'
                          }
                      )

                      data = prepare_response.json()
                      media_asset = data['media_asset']
                      upload_info = data['upload_info']

                      # Upload file
                      with open(file_path, 'rb') as f:
                          requests.put(
                              upload_info['upload_url'],
                              headers=upload_info['required_headers'],
                              data=f.read()
                          )

                      return media_asset['id']

                  front_id = upload_image('/path/to/front.jpg', 'front.jpg')
                  back_id = upload_image('/path/to/back.jpg', 'back.jpg')
                  ```
                </CodeGroup>
              </Step>

              <Step title="Generate the world">
                Use the media asset IDs to generate a world.

                <CodeGroup dropdown>
                  ```bash Request theme={null}
                  curl -X POST 'https://api.worldlabs.ai/marble/v1/worlds:generate' \
                    -H 'Content-Type: application/json' \
                    -H 'WLT-Api-Key: YOUR_API_KEY' \
                    -d '{
                      "display_name": "My Multi-Image World",
                      "world_prompt": {
                        "type": "multi-image",
                        "multi_image_prompt": [
                          {
                            "azimuth": 0,
                            "content": {
                              "source": "media_asset",
                              "media_asset_id": "<front_image_id>"
                            }
                          },
                          {
                            "azimuth": 180,
                            "content": {
                              "source": "media_asset",
                              "media_asset_id": "<back_image_id>"
                            }
                          }
                        ],
                        "text_prompt": "A cozy living room"
                      }
                    }'
                  ```

                  ```javascript Request theme={null}
                  const response = await fetch('https://api.worldlabs.ai/marble/v1/worlds:generate', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'WLT-Api-Key': 'YOUR_API_KEY'
                    },
                    body: JSON.stringify({
                      display_name: 'My Multi-Image World',
                      world_prompt: {
                        type: 'multi-image',
                        multi_image_prompt: [
                          {
                            azimuth: 0,
                            content: {
                              source: 'media_asset',
                              media_asset_id: frontId
                            }
                          },
                          {
                            azimuth: 180,
                            content: {
                              source: 'media_asset',
                              media_asset_id: backId
                            }
                          }
                        ],
                        text_prompt: 'A cozy living room'
                      }
                    })
                  });

                  const data = await response.json();
                  console.log(data);
                  ```

                  ```python Request theme={null}
                  import requests

                  url = "https://api.worldlabs.ai/marble/v1/worlds:generate"

                  payload = {
                      "display_name": "My Multi-Image World",
                      "world_prompt": {
                          "type": "multi-image",
                          "multi_image_prompt": [
                              {
                                  "azimuth": 0,
                                  "content": {
                                      "source": "media_asset",
                                      "media_asset_id": front_id
                                  }
                              },
                              {
                                  "azimuth": 180,
                                  "content": {
                                      "source": "media_asset",
                                      "media_asset_id": back_id
                                  }
                              }
                          ],
                          "text_prompt": "A cozy living room"
                      }
                  }
                  headers = {
                      "WLT-Api-Key": "YOUR_API_KEY",
                      "Content-Type": "application/json"
                  }

                  response = requests.post(url, json=payload, headers=headers)
                  print(response.text)
                  ```
                </CodeGroup>

                This returns an Operation object. Poll the operation as shown in the text input example until `done` is `true`. The completed operation's `response` field will contain the generated World.
              </Step>
            </Steps>
          </Tab>
        </Tabs>

        <Note>
          The `azimuth` field specifies the horizontal angle (in degrees) where the image was taken. Use `0` for front, `90` for right, `180` for back, `270` for left.
        </Note>

        <Note>
          The `text_prompt` field is optional. If omitted, a caption will be automatically generated.
        </Note>
      </Tab>

      <Tab title="Video input">
        You can create a world from a video using either a public URL or by uploading a local file.

        Recommended video formats: `mp4`, `mov`, `mkv`.

        <Tabs>
          <Tab title="From URL">
            If your video is already hosted at a public URL, you can reference it directly.

            <Steps>
              <Step>
                Make a `POST` request to the [`/marble/v1/worlds:generate`](/api/reference/worlds/generate) endpoint with your video URL.

                <CodeGroup dropdown>
                  ```bash Request theme={null}
                  curl -X POST 'https://api.worldlabs.ai/marble/v1/worlds:generate' \
                    -H 'Content-Type: application/json' \
                    -H 'WLT-Api-Key: YOUR_API_KEY' \
                    -d '{
                      "display_name": "My Video World",
                      "world_prompt": {
                        "type": "video",
                        "video_prompt": {
                          "source": "uri",
                          "uri": "https://example.com/my-video.mp4"
                        },
                        "text_prompt": "A scenic mountain landscape"
                      }
                    }'
                  ```

                  ```javascript Request theme={null}
                  const response = await fetch('https://api.worldlabs.ai/marble/v1/worlds:generate', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'WLT-Api-Key': 'YOUR_API_KEY'
                    },
                    body: JSON.stringify({
                      display_name: 'My Video World',
                      world_prompt: {
                        type: 'video',
                        video_prompt: {
                          source: 'uri',
                          uri: 'https://example.com/my-video.mp4'
                        },
                        text_prompt: 'A scenic mountain landscape'
                      }
                    })
                  });

                  const data = await response.json();
                  console.log(data);
                  ```

                  ```python Request theme={null}
                  import requests

                  url = "https://api.worldlabs.ai/marble/v1/worlds:generate"

                  payload = {
                      "display_name": "My Video World",
                      "world_prompt": {
                          "type": "video",
                          "video_prompt": {
                              "source": "uri",
                              "uri": "https://example.com/my-video.mp4"
                          },
                          "text_prompt": "A scenic mountain landscape"
                      }
                  }
                  headers = {
                      "WLT-Api-Key": "YOUR_API_KEY",
                      "Content-Type": "application/json"
                  }

                  response = requests.post(url, json=payload, headers=headers)
                  print(response.text)
                  ```
                </CodeGroup>

                This returns an Operation object. Poll the operation as shown in the text input example until `done` is `true`. The completed operation's `response` field will contain the generated World.
              </Step>
            </Steps>
          </Tab>

          <Tab title="From local file">
            To use a local video file, first upload it as a media asset, then reference it in your generation request.

            <Steps>
              <Step title="Prepare the upload">
                Make a `POST` request to [`/marble/v1/media-assets:prepare_upload`](/api/reference/media-assets/prepare-upload) to get a signed upload URL.

                <CodeGroup dropdown>
                  ```bash Request theme={null}
                  curl -X POST 'https://api.worldlabs.ai/marble/v1/media-assets:prepare_upload' \
                    -H 'Content-Type: application/json' \
                    -H 'WLT-Api-Key: YOUR_API_KEY' \
                    -d '{
                      "file_name": "my-video.mp4",
                      "kind": "video",
                      "extension": "mp4"
                    }'
                  ```

                  ```javascript Request theme={null}
                  const response = await fetch('https://api.worldlabs.ai/marble/v1/media-assets:prepare_upload', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'WLT-Api-Key': 'YOUR_API_KEY'
                    },
                    body: JSON.stringify({
                      file_name: 'my-video.mp4',
                      kind: 'video',
                      extension: 'mp4'
                    })
                  });

                  const data = await response.json();
                  console.log(data);
                  ```

                  ```python Request theme={null}
                  import requests

                  url = "https://api.worldlabs.ai/marble/v1/media-assets:prepare_upload"

                  payload = {
                      "file_name": "my-video.mp4",
                      "kind": "video",
                      "extension": "mp4"
                  }
                  headers = {
                      "WLT-Api-Key": "YOUR_API_KEY",
                      "Content-Type": "application/json"
                  }

                  response = requests.post(url, json=payload, headers=headers)
                  print(response.text)
                  ```
                </CodeGroup>

                This returns the media asset and upload information:

                <CodeGroup>
                  ```json Response theme={null}
                  {
                    "media_asset": {
                      "id": "550e8400-e29b-41d4-a716-446655440000",
                      "file_name": "my-video.mp4",
                      "kind": "video",
                      "extension": "mp4",
                      "created_at": "2025-01-15T10:30:00Z",
                      "updated_at": null,
                      "metadata": null
                    },
                    "upload_info": {
                      "upload_url": "<signed_upload_url>",
                      "upload_method": "PUT",
                      "required_headers": {
                        "x-goog-content-length-range": "0,1048576000"
                      }
                    }
                  }
                  ```
                </CodeGroup>
              </Step>

              <Step title="Upload the file">
                Upload your video to the signed URL using the method and headers from the response.

                <CodeGroup dropdown>
                  ```bash Request theme={null}
                  curl -X PUT '<signed_upload_url>' \
                    -H 'x-goog-content-length-range: 0,1048576000' \
                    --data-binary '@/path/to/my-video.mp4'
                  ```

                  ```javascript Request theme={null}
                  const fs = require('fs');

                  const videoBuffer = fs.readFileSync('/path/to/my-video.mp4');

                  await fetch('<signed_upload_url>', {
                    method: 'PUT',
                    headers: upload_info.required_headers,
                    body: videoBuffer
                  });
                  ```

                  ```python Request theme={null}
                  import requests

                  with open('/path/to/my-video.mp4', 'rb') as f:
                      video_data = f.read()

                  requests.put(
                      '<signed_upload_url>',
                      headers=upload_info['required_headers'],
                      data=video_data
                  )
                  ```
                </CodeGroup>
              </Step>

              <Step title="Generate the world">
                Use the `media_asset_id` from Step 1 to generate a world.

                <CodeGroup dropdown>
                  ```bash Request theme={null}
                  curl -X POST 'https://api.worldlabs.ai/marble/v1/worlds:generate' \
                    -H 'Content-Type: application/json' \
                    -H 'WLT-Api-Key: YOUR_API_KEY' \
                    -d '{
                      "display_name": "My Video World",
                      "world_prompt": {
                        "type": "video",
                        "video_prompt": {
                          "source": "media_asset",
                          "media_asset_id": "550e8400-e29b-41d4-a716-446655440000"
                        },
                        "text_prompt": "A scenic mountain landscape"
                      }
                    }'
                  ```

                  ```javascript Request theme={null}
                  const response = await fetch('https://api.worldlabs.ai/marble/v1/worlds:generate', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'WLT-Api-Key': 'YOUR_API_KEY'
                    },
                    body: JSON.stringify({
                      display_name: 'My Video World',
                      world_prompt: {
                        type: 'video',
                        video_prompt: {
                          source: 'media_asset',
                          media_asset_id: '550e8400-e29b-41d4-a716-446655440000'
                        },
                        text_prompt: 'A scenic mountain landscape'
                      }
                    })
                  });

                  const data = await response.json();
                  console.log(data);
                  ```

                  ```python Request theme={null}
                  import requests

                  url = "https://api.worldlabs.ai/marble/v1/worlds:generate"

                  payload = {
                      "display_name": "My Video World",
                      "world_prompt": {
                          "type": "video",
                          "video_prompt": {
                              "source": "media_asset",
                              "media_asset_id": "550e8400-e29b-41d4-a716-446655440000"
                          },
                          "text_prompt": "A scenic mountain landscape"
                      }
                  }
                  headers = {
                      "WLT-Api-Key": "YOUR_API_KEY",
                      "Content-Type": "application/json"
                  }

                  response = requests.post(url, json=payload, headers=headers)
                  print(response.text)
                  ```
                </CodeGroup>

                This returns an Operation object. Poll the operation as shown in the text input example until `done` is `true`. The completed operation's `response` field will contain the generated World.
              </Step>
            </Steps>
          </Tab>
        </Tabs>

        <Note>
          The `text_prompt` field is optional. If omitted, a caption will be automatically generated from your video.
        </Note>
      </Tab>
    </Tabs>
  </Step>
</Steps>
