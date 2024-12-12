const database = new Map<string, string>();
database.set("main", "6755b44100123eb143b6");

export function useDatabaseId(databaseName: string): string {
  const databaseId = database.get(databaseName);
  if (!databaseId) {
    throw new Error(`Database ID for ${databaseName} not found`);
  }
  return databaseId;
}
