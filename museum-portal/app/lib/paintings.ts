export interface Painting {
  id: string;
  title: string;
  artist: string;
  year: string;
  spzPath: string;
  glbPath: string;
}

export const paintings: Painting[] = [
  {
    id: "bedroom-in-ares",
    title: "Bedroom in Arles",
    artist: "Vincent van Gogh",
    year: "1888",
    spzPath: "/paintings/bedroom-in-ares.spz",
    glbPath: "/paintings/bedroom-in-ares.glb",
  },
  {
    id: "music-lesson",
    title: "The Music Lesson",
    artist: "Johannes Vermeer",
    year: "1662",
    spzPath: "/paintings/music-lesson.spz",
    glbPath: "/paintings/music-lesson.glb",
  },
  {
    id: "nighthawks",
    title: "Nighthawks",
    artist: "Edward Hopper",
    year: "1942",
    spzPath: "/paintings/nighthawks.spz",
    glbPath: "/paintings/nighthawks.glb",
  },
  {
    id: "courtyard-in-delft",
    title: "The Courtyard of a House in Delft",
    artist: "Pieter de Hooch",
    year: "1658",
    spzPath: "/paintings/courtyard-in-delft.spz",
    glbPath: "/paintings/courtyard-in-delft.glb",
  },
  {
    id: "the-dream",
    title: "The Dream",
    artist: "Henri Rousseau",
    year: "1910",
    spzPath: "/paintings/the-dream.spz",
    glbPath: "/paintings/the-dream.glb",
  },
  {
    id: "red-studio",
    title: "The Red Studio",
    artist: "Henri Matisse",
    year: "1911",
    spzPath: "/paintings/red-studio.spz",
    glbPath: "/paintings/red-studio.glb",
  },
  {
    id: "art-of-painting",
    title: "The Art of Painting",
    artist: "Johannes Vermeer",
    year: "1666",
    spzPath: "/paintings/art-of-painting.spz",
    glbPath: "/paintings/art-of-painting.glb",
  },
  {
    id: "voyage-of-life",
    title: "The Voyage of Life: Youth",
    artist: "Thomas Cole",
    year: "1842",
    spzPath: "/paintings/voyage-of-life.spz",
    glbPath: "/paintings/voyage-of-life.glb",
  },
  {
    id: "interior-of-panthenon",
    title: "Interior of the Pantheon",
    artist: "Giovanni Paolo Panini",
    year: "1734",
    spzPath: "/paintings/interior-of-panthenon.spz",
    glbPath: "/paintings/interior-of-panthenon.glb",
  },
];

export function getPainting(id: string): Painting | undefined {
  return paintings.find((p) => p.id === id);
}
