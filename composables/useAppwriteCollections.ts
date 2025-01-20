const collections = new Map<string, string>();
collections.set("restaurants", "6755b45a001bde0ead00");
collections.set("plates", "676e9cbc001ee9f59a79");
collections.set("departments", "6782b2f5002ae33df251");

export function useAppwriteCollection(collectionName: string): string {
  const collectionId = collections.get(collectionName);
  if (!collectionId) {
    throw new Error(`Collection ID for ${collectionName} not found`);
  }
  return collectionId;
}
