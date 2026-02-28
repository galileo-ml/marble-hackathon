
# Get media asset

> Get a media asset by ID.

Retrieves metadata for a previously created media asset.

Args:
    media_asset_id: The media asset identifier.

Returns:
    MediaAsset object with media_asset_id, file_name, extension, kind,
    metadata, created_at, and updated_at.

Raises:
    HTTPException: 404 if not found



## OpenAPI

````yaml GET /marble/v1/media-assets/{media_asset_id}
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
  /marble/v1/media-assets/{media_asset_id}:
    get:
      summary: Get Media Asset
      description: |-
        Get a media asset by ID.

        Retrieves metadata for a previously created media asset.

        Args:
            media_asset_id: The media asset identifier.

        Returns:
            MediaAsset object with media_asset_id, file_name, extension, kind,
            metadata, created_at, and updated_at.

        Raises:
            HTTPException: 404 if not found
      operationId: get_media_asset_marble_v1_media_assets__media_asset_id__get
      parameters:
        - in: path
          name: media_asset_id
          required: true
          schema:
            title: Media Asset Id
            type: string
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/MediaAsset'
          description: Successful Response
        '422':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/HTTPValidationError'
          description: Validation Error
components:
  schemas:
    MediaAsset:
      description: |-
        A user-uploaded media asset stored in managed storage.

        MediaAssets can be images, videos, or binary blobs that are used
        as input to world generation.
      properties:
        created_at:
          description: Creation timestamp
          format: date-time
          title: Created At
          type: string
        extension:
          anyOf:
            - type: string
            - type: 'null'
          description: File extension without dot
          examples:
            - mp4
            - png
            - jpg
          title: Extension
        file_name:
          description: File name
          title: File Name
          type: string
        kind:
          $ref: '#/components/schemas/MediaAssetKind'
          description: High-level media type
          examples:
            - image
            - video
        media_asset_id:
          description: Server-generated media asset identifier
          title: Media Asset Id
          type: string
        metadata:
          anyOf:
            - type: object
            - type: 'null'
          description: Optional application-specific metadata
          title: Metadata
        updated_at:
          anyOf:
            - format: date-time
              type: string
            - type: 'null'
          description: Last update timestamp
          title: Updated At
      required:
        - media_asset_id
        - file_name
        - kind
        - created_at
      title: MediaAsset
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
    MediaAssetKind:
      description: High-level media asset type.
      enum:
        - image
        - video
      title: MediaAssetKind
      type: string
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
  securitySchemes:
    ApiKeyAuth:
      description: API key for authentication. Get your key from the developer portal.
      in: header
      name: WLT-Api-Key
      type: apiKey

````