const API_BASE = "https://api.worldlabs.ai/marble/v1";

function getApiKey(): string {
  const key = process.env.WORLDLABS_API_KEY;
  if (!key) throw new Error("WORLDLABS_API_KEY is not set");
  return key;
}

function headers() {
  return {
    "WLT-Api-Key": getApiKey(),
    "Content-Type": "application/json",
  };
}

export async function generateWorld(params: {
  displayName: string;
  imageUri: string;
  textPrompt: string;
  model?: string;
}) {
  const res = await fetch(`${API_BASE}/worlds:generate`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({
      display_name: params.displayName,
      world_prompt: {
        type: "image",
        image_prompt: {
          source: "uri",
          uri: params.imageUri,
        },
        text_prompt: params.textPrompt,
      },
      model: params.model ?? "Marble 0.1-mini",
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`World generation failed (${res.status}): ${text}`);
  }

  return res.json();
}

export async function getOperationStatus(operationId: string) {
  const res = await fetch(`${API_BASE}/operations/${operationId}`, {
    headers: headers(),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Status check failed (${res.status}): ${text}`);
  }

  return res.json();
}
