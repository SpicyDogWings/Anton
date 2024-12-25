const collections = new Map<string, string>();
collections.set("restaurants", "6755b45a001bde0ead00");

export function useAppwriteCollection(collectionName: string): string {
  const collectionId = collections.get(collectionName);
  if (!collectionId) {
    throw new Error(`Collection ID for ${collectionName} not found`);
  }
  return collectionId;
}
