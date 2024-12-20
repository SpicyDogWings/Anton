const connection = ref({
  db: "",
  collection: "",
  document: "",
});

export function useAppwriteConnection(database: string, collection: string) {
  connection.value.db = useAppwriteDatabase(database);
  connection.value.collection = useAppwriteCollection(collection);
  if (!connection.value.db || !connection.value.collection) {
    throw new Error(`Connection not found: ${database}/${collection}`);
  }
  return connection;
}
