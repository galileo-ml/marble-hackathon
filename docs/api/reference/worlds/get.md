
# Get a World

> Get a world by ID.

Retrieves a world's details including generated assets if available.
Only the world owner or users with access to public worlds can retrieve them.

Args:
    world_id: The unique identifier of the world.

Returns:
    World object with world_id, display_name, tags, assets, created_at,
    updated_at, permission, model, world_prompt, and world_marble_url.

Raises:
    HTTPException: 404 if world not found or access denied



## OpenAPI

````yaml GET /marble/v1/worlds/{world_id}
openapi: 3.1.0
info:
  description: Public-facing API for the Marble platform
  summary: Marble Public API v1
  title: Marble Public API v1
  version: 1.0.0
servers:
  - description: World API
    url: https://api.worldlabs.ai
security:
  - ApiKeyAuth: []
paths:
  /marble/v1/worlds/{world_id}:
    get:
      summary: Get World
      description: >-
        Get a world by ID.


        Retrieves a world's details including generated assets if available.

        Only the world owner or users with access to public worlds can retrieve
        them.


        Args:
            world_id: The unique identifier of the world.

        Returns:
            World object with world_id, display_name, tags, assets, created_at,
            updated_at, permission, model, world_prompt, and world_marble_url.

        Raises:
            HTTPException: 404 if world not found or access denied
      operationId: get_world_marble_v1_worlds__world_id__get
      parameters:
        - in: path
          name: world_id
          required: true
          schema:
            title: World Id
            type: string
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/World'
          description: Successful Response
        '422':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/HTTPValidationError'
          description: Validation Error
components:
  schemas:
    World:
      description: A generated world, including asset URLs.
      properties:
        assets:
          anyOf:
            - $ref: '#/components/schemas/WorldAssets'
            - type: 'null'
          description: Generated world assets
        created_at:
          anyOf:
            - format: date-time
              type: string
            - type: 'null'
          description: Creation timestamp
          title: Created At
        display_name:
          description: Display name
          title: Display Name
          type: string
        model:
          anyOf:
            - type: string
            - type: 'null'
          description: Model used for generation
          title: Model
        permission:
          anyOf:
            - $ref: '#/components/schemas/Permission'
            - type: 'null'
          description: Access control permissions for the world
        tags:
          anyOf:
            - items:
                type: string
              type: array
            - type: 'null'
          description: Tags associated with the world
          title: Tags
        updated_at:
          anyOf:
            - format: date-time
              type: string
            - type: 'null'
          description: Last update timestamp
          title: Updated At
        world_id:
          description: World identifier
          title: World Id
          type: string
        world_marble_url:
          description: World Marble URL
          title: World Marble Url
          type: string
        world_prompt:
          anyOf:
            - discriminator:
                mapping:
                  depth-pano:
                    $ref: '#/components/schemas/DepthPanoPrompt'
                  image:
                    $ref: '#/components/schemas/Prompt'
                  inpaint-pano:
                    $ref: '#/components/schemas/InpaintPanoPrompt'
                  multi-image: '#/components/schemas/MultiImagePrompt-Output'
                  text: '#/components/schemas/WorldTextPrompt-Output'
                  video: '#/components/schemas/VideoPrompt-Output'
                propertyName: type
              oneOf:
                - $ref: >-
                    #/components/schemas/wlt__marble__v1__schema__api_schema__WorldTextPrompt
                - $ref: '#/components/schemas/Prompt'
                - $ref: >-
                    #/components/schemas/wlt__marble__v1__schema__api_schema__MultiImagePrompt
                - $ref: >-
                    #/components/schemas/wlt__marble__v1__schema__api_schema__VideoPrompt
                - $ref: '#/components/schemas/DepthPanoPrompt'
                - $ref: '#/components/schemas/InpaintPanoPrompt'
            - type: 'null'
          description: World prompt
          title: World Prompt
      required:
        - world_id
        - display_name
        - world_marble_url
      title: World
      type: object
    HTTPValidationError:
      properties:
        detail:
          items:
            $ref: '#/components/schemas/ValidationError'
          title: Detail
          type: array
      title: HTTPValidationError
      type: object
    WorldAssets:
      description: Downloadable outputs of world generation.
      properties:
        caption:
          anyOf:
            - type: string
            - type: 'null'
          description: AI-generated description of the world
          title: Caption
        imagery:
          anyOf:
            - $ref: '#/components/schemas/ImageryAssets'
            - type: 'null'
          description: Imagery assets
        mesh:
          anyOf:
            - $ref: '#/components/schemas/MeshAssets'
            - type: 'null'
          description: Mesh assets
        splats:
          anyOf:
            - $ref: '#/components/schemas/SplatAssets'
            - type: 'null'
          description: Gaussian splat assets
        thumbnail_url:
          anyOf:
            - type: string
            - type: 'null'
          description: Thumbnail URL for the world
          title: Thumbnail Url
      title: WorldAssets
      type: object
    Permission:
      description: Access control permissions for a resource.
      properties:
        allowed_readers:
          items:
            type: string
          title: Allowed Readers
          type: array
        allowed_writers:
          items:
            type: string
          title: Allowed Writers
          type: array
        public:
          default: false
          title: Public
          type: boolean
      title: Permission
      type: object
    DepthPanoPrompt:
      description: For models conditioned on a depth pano and text.
      properties:
        depth_pano_image:
          $ref: '#/components/schemas/Content'
        text_prompt:
          anyOf:
            - type: string
            - type: 'null'
          title: Text Prompt
        type:
          const: depth-pano
          default: depth-pano
          title: Type
          type: string
        z_max:
          title: Z Max
          type: number
        z_min:
          title: Z Min
          type: number
      required:
        - depth_pano_image
        - z_min
        - z_max
      title: DepthPanoPrompt
      type: object
    Prompt:
      description: |-
        For world models generating a world from a single image (+ text).
        Images can be generated using the :image-generation method.
        If no text prompt is provided, it will be generated via recaption.
      properties:
        image_prompt:
          $ref: '#/components/schemas/Content'
        is_pano:
          default: false
          title: Is Pano
          type: boolean
        text_prompt:
          anyOf:
            - type: string
            - type: 'null'
          title: Text Prompt
        type:
          const: image
          default: image
          title: Type
          type: string
      required:
        - image_prompt
      title: Prompt
      type: object
    InpaintPanoPrompt:
      description: For models that inpaint the masked portion of a pano image.
      properties:
        pano_image:
          $ref: '#/components/schemas/Content'
        pano_mask:
          $ref: '#/components/schemas/Content'
        text_prompt:
          anyOf:
            - type: string
            - type: 'null'
          title: Text Prompt
        type:
          const: inpaint-pano
          default: inpaint-pano
          title: Type
          type: string
      required:
        - pano_image
        - pano_mask
      title: InpaintPanoPrompt
      type: object
    wlt__marble__v1__schema__api_schema__WorldTextPrompt:
      description: Input prompt class for text-conditioned world generation.
      properties:
        text_prompt:
          anyOf:
            - type: string
            - type: 'null'
          title: Text Prompt
        type:
          const: text
          default: text
          title: Type
          type: string
      title: WorldTextPrompt
      type: object
    wlt__marble__v1__schema__api_schema__MultiImagePrompt:
      description: For world models supporting multi-image (+ text) input.
      properties:
        multi_image_prompt:
          items:
            $ref: >-
              #/components/schemas/wlt__marble__v1__schema__api_schema__SphericallyLocatedContent
          title: Multi Image Prompt
          type: array
        reconstruct_images:
          default: false
          title: Reconstruct Images
          type: boolean
        text_prompt:
          anyOf:
            - type: string
            - type: 'null'
          title: Text Prompt
        type:
          const: multi-image
          default: multi-image
          title: Type
          type: string
      required:
        - multi_image_prompt
      title: MultiImagePrompt
      type: object
    wlt__marble__v1__schema__api_schema__VideoPrompt:
      description: For world models supporting video (+ text) input.
      properties:
        text_prompt:
          anyOf:
            - type: string
            - type: 'null'
          title: Text Prompt
        type:
          const: video
          default: video
          title: Type
          type: string
        video_prompt:
          $ref: '#/components/schemas/Content'
      required:
        - video_prompt
      title: VideoPrompt
      type: object
    ValidationError:
      properties:
        loc:
          items:
            anyOf:
              - type: string
              - type: integer
          title: Location
          type: array
        msg:
          title: Message
          type: string
        type:
          title: Error Type
          type: string
      required:
        - loc
        - msg
        - type
      title: ValidationError
      type: object
    ImageryAssets:
      description: Imagery asset URLs.
      properties:
        pano_url:
          anyOf:
            - type: string
            - type: 'null'
          description: Panorama image URL
          title: Pano Url
      title: ImageryAssets
      type: object
    MeshAssets:
      description: Mesh asset URLs.
      properties:
        collider_mesh_url:
          anyOf:
            - type: string
            - type: 'null'
          description: Collider mesh URL
          title: Collider Mesh Url
      title: MeshAssets
      type: object
    SplatAssets:
      description: Gaussian splat asset URLs.
      properties:
        spz_urls:
          anyOf:
            - additionalProperties:
                type: string
              type: object
            - type: 'null'
          description: URLs for SPZ format Gaussian splat files
          title: Spz Urls
      title: SplatAssets
      type: object
    Content:
      description: >-
        Represents content (media, text, images) that can be stored inline or
        via URL.


        Supports both direct data storage (up to 10MB) and URL references (up to
        20MB).
      properties:
        data_base64:
          anyOf:
            - type: string
            - type: 'null'
          title: Data Base64
        extension:
          anyOf:
            - type: string
            - type: 'null'
          description: File extension without dot
          examples:
            - jpg
            - png
            - pdf
            - txt
          title: Extension
        uri:
          anyOf:
            - type: string
            - type: 'null'
          title: Uri
      title: Content
      type: object
    wlt__marble__v1__schema__api_schema__SphericallyLocatedContent:
      description: Content with a preferred location on the sphere.
      properties:
        azimuth:
          anyOf:
            - type: number
            - type: 'null'
          title: Azimuth
        data_base64:
          anyOf:
            - type: string
            - type: 'null'
          title: Data Base64
        extension:
          anyOf:
            - type: string
            - type: 'null'
          description: File extension without dot
          examples:
            - jpg
            - png
            - pdf
            - txt
          title: Extension
        uri:
          anyOf:
            - type: string
            - type: 'null'
          title: Uri
      title: SphericallyLocatedContent
      type: object
  securitySchemes:
    ApiKeyAuth:
      description: API key for authentication. Get your key from the developer portal.
      in: header
      name: WLT-Api-Key
      type: apiKey

````