# Hackathon Ideas

Judging reminder: **Spatial impact** (does it fundamentally rely on 3D?), **Innovation** (creative marble usage), **Execution/demo quality** (story > polish).

Tech stack note: SparkJS (THREE.js-based gaussian splat renderer) is the recommended way to render worlds in-browser. Marble 0.1-mini generates in ~30-45s (good for iteration). Marble 0.1-plus takes ~5 min but higher quality. Can generate from text, image, multi-image, or video.

---

## 1. Step Into the Painting (Museum Portal)

**Concept:** A web app that shows a virtual gallery wall of famous paintings (Monet, Van Gogh, Vermeer, etc.). Click on a painting and it generates a full 3D world from that artwork using the image-to-world API, then transitions you *into* the painting rendered with SparkJS. You're now standing inside Starry Night or wandering through a Monet garden.

**Why it's strong:**
- Spatial impact is the entire point -- the "step in" moment from 2D to 3D is visceral
- Universal appeal, immediately understandable demo story
- Can pre-generate a few hero worlds before demo, generate one live to show the magic

**Tech:** Next.js/React frontend with a gallery grid UI. On click, call image-to-world API with the painting image + descriptive text prompt. Render result with SparkJS. Simple camera animation for the "stepping in" transition.

**Risk:** Paintings with abstract/non-photorealistic styles might not generate great worlds. Mitigation: curate paintings that depict real places (landscapes, interiors, cityscapes).

---

## 2. Crime Scene Reconstructor

**Concept:** Upload a few photos of a room/location from different angles. The app generates a 3D crime scene world using multi-image input. Then an LLM (Claude) analyzes the scene and places interactive markers/annotations in the 3D space -- "blood spatter pattern suggests...", "entry point was here...", "trajectory analysis..." Users explore the 3D scene clicking on evidence markers.

**Why it's strong:**
- Spatial understanding is core -- proximity, angles, trajectories only make sense in 3D
- Multi-image reconstruction is a power feature of the API
- Judges will remember this -- it's unusual and has clear real-world utility (forensics, insurance)
- Great demo narrative: "what if CSI had World Labs?"

**Tech:** Multi-image upload -> world generation -> SparkJS renderer with THREE.js overlay for markers/annotations. Claude API call to generate spatial analysis text from the images.

---

## 3. Memory Palace Builder

**Concept:** A study/memorization tool based on the ancient "method of loci." User enters a list of things to memorize (vocabulary, speech points, historical dates). The app generates a 3D world (e.g., a cozy library, a castle hallway) and places each item at a distinct spatial location in the world. Users walk through the 3D space to review items, building spatial memory associations. Each "station" has the item floating in 3D text overlaid on the scene.

**Why it's strong:**
- Spatial memory is literally the mechanism -- this is the purest "spatial impact" pitch
- Backed by real neuroscience (method of loci is proven to boost recall)
- Personally useful, great demo story
- Can generate different themed palaces (medieval castle, space station, underwater temple)

**Tech:** Text-to-world for the palace environment. SparkJS + THREE.js text/sprite overlays at fixed positions along a walkable path. Could use Claude to generate evocative descriptions for each memory station.

---

## 4. Travel Time Machine

**Concept:** Enter a famous location (e.g., "Times Square") and a year (e.g., "1920"). The app uses an LLM to generate a historically-informed text prompt describing what that place looked like in that era, then generates a 3D world you can explore. Toggle between eras -- see the same place in 1800, 1920, 1960, 2024. A timeline slider morphs between different generated worlds.

**Why it's strong:**
- Spatial impact: you're comparing the same physical space across time, scale/proximity matters
- Educational and emotionally resonant -- people love "then vs now"
- Great demo: show Pompeii before and after eruption, or Paris 1890 vs today
- Timeline slider is a visually memorable mechanic for judges

**Tech:** Claude generates era-specific prompts -> text-to-world API -> pre-generate 2-3 eras per location. SparkJS renderer with a timeline UI. Could also use historical photos as image inputs for more accuracy.

---

## 5. Dreamscape Journal

**Concept:** A personal dream diary where users describe their dreams in text, and each entry generates a 3D world they can revisit. Over time, builds a gallery of explorable dreamscapes. The twist: an LLM analyzes dream patterns across entries and generates a "recurring dream space" that blends common elements.

**Why it's strong:**
- Dreams are inherently spatial (rooms, landscapes, impossible architecture) -- perfect fit
- Emotional/personal hook makes demo memorable
- Text-to-world is the core API feature, and dream descriptions are naturally vivid prompts
- The "recurring dream" mashup is a creative novel use

**Tech:** Text input -> Claude enhances prompt for visual richness -> text-to-world API -> SparkJS gallery. Store entries with tags, find patterns across them.

---

## 6. Disaster Simulator / Emergency Planner

**Concept:** Upload a photo or describe a building/neighborhood. Generate a 3D world of it. Then simulate disaster scenarios: flood (water plane rising), earthquake (camera shake + debris overlays), fire (particle effects). Users can plan evacuation routes through the 3D space, marking exits and safe zones. Measures distances and shows optimal paths.

**Why it's strong:**
- Fundamentally spatial: evacuation planning requires understanding of layout, scale, proximity, exits
- Clear real-world utility that's easy to pitch to judges
- THREE.js effects on top of SparkJS world are visually impressive
- Strong narrative for a 2-min demo

**Tech:** Image-to-world API for the building/space. SparkJS renderer + THREE.js overlays for water/fire/debris effects. Simple pathfinding visualization with distance measurements.

---

## 7. Real Estate Reimaginer

**Concept:** Upload photos of an empty apartment/house. Generate a 3D world of the space. Then use text prompts to generate *variations* of the same space with different interior design styles -- "mid-century modern", "japanese minimalist", "maximalist bohemian." Compare worlds side-by-side or toggle between them in the same viewport.

**Why it's strong:**
- Spatial by nature -- interior design is about how objects relate in 3D space
- Huge commercial appeal that judges (especially a16z partner) will appreciate
- Multi-image input for the base space, text-guided variations for styles
- Side-by-side comparison is a strong visual demo moment

**Tech:** Multi-image upload of the room -> base world. Then image + text prompt variations for each style. SparkJS with split-screen or toggle UI.

---

## My Ranking (feasibility in 3.5 hrs + impact)

| Rank | Idea | Feasibility | Wow Factor | Spatial Score |
|------|------|-------------|------------|---------------|
| 1 | Step Into the Painting | High | Very High | Very High |
| 2 | Crime Scene Reconstructor | Medium | Very High | Very High |
| 3 | Travel Time Machine | Medium-High | High | High |
| 4 | Memory Palace Builder | High | High | Very High |
| 5 | Real Estate Reimaginer | Medium | High | High |
| 6 | Disaster Simulator | Medium-Low | High | Very High |
| 7 | Dreamscape Journal | High | Medium | Medium |

**Top pick: Step Into the Painting** -- highest feasibility, immediately understandable, the 2D-to-3D transition is the perfect showcase for marble, and it has universal emotional appeal. Pre-generate 5-6 famous paintings as worlds before the demo, do one live generation during the pitch.

**Runner-up: Crime Scene Reconstructor** -- if we want to stand out more and the judges value novelty. Riskier to execute but more memorable.
