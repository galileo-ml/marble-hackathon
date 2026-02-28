
# Rate limits

> Rate limits and time estimates for world generation

## Rate limits

Each API user is limited to **about 6 world generation requests per minute**. This is to ensure fair usage and prevent abuse.

Note that this limit is not per API key, but rather per API user.

Usage is tracked in a rolling window, and the limit is not guaranteed to be exact. For example, you may very occasionally find you can only make 5 requests in a 1 minute window.

### How to handle rate limits

If you exceed the rate limit, you will receive a 429 error. You can retry your request after the rate limit has been reset.

### Time estimates

Each world generation will take about 5 minutes to complete.
