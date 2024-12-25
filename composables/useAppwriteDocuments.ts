export function useAppwriteDocuments() {
  const appwrite = useAppwriteStore();
  const documents = ref();
  const error = ref({
    message: "",
    bug: false,
  });

  const listDocuments = async (
    database: string,
    collection: string,
    query: string[] = [],
  ) => {
    try {
      const connection = useAppwriteConnection(database, collection);
      const response = await appwrite.db.listDocuments(
        connection.value.db,
        connection.value.collection,
        query,
      );
      if (response.documents.length > 0) {
        documents.value = response.documents;
        error;
      } else {
        throw new Error("No documents found.");
      }
    } catch (e) {
      console.error(e);
      error.value.message = "An error occurred while fetching documents.";
      documents.value = [];
    }
  };

  return {
    documents,
    error,
    listDocuments,
  };
}