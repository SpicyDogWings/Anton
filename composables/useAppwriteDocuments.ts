import { ID, Query } from "appwrite";

export function useAppwriteDocuments() {
  const appwrite = useAppwriteStore();
  const documents = ref();
  const user = ref(null)

  const listDocuments = async (
    database: string,
    collection: string,
    query: string[] = [],
  ) => {
    try {
      const connection = useAppwriteConnection(database, collection);
      const fetchedUser = await appwrite.getUser();
      user.value = fetchedUser; 
      query.push(Query.equal("user", [user.value.$id]))
      const response = await appwrite.db.listDocuments(
        connection.value.db,
        connection.value.collection,
        query,
      );
      if (response.documents.length > 0) {
        documents.value = response.documents;
      } else {
        throw new Error("No documents found.");
      }
    } catch (e) {
      documents.value = [];
    }
  };

  const createDocument = async (
    database: string,
    collection: string,
    item: object,
  ) => {
    const connection = useAppwriteConnection(database, collection);
    const response = await appwrite.db.createDocument(
      connection.value.db,
      connection.value.collection,
      ID.unique(),
      item,
    );
  };

  const getDocument = async (
    database: string,
    collection: string,
    document: string,
  ) => {
    try {
      const connection = useAppwriteConnection(database, collection);
      const response = await appwrite.db.getDocument(
        connection.value.db,
        connection.value.collection,
        document,
        [],
      );
      if (response) {
        documents.value = response;
      } else {
        throw new Error("No hay registros");
      }
    } catch (e) {
      console.log(e);
      documents.value = "no hay registros";
    }
  };
  
  const putDocument = async (
    database: string,
    collection: string,
    document: string
  ) => {
    try {
      const connection = useAppwriteConnection(database, collection)
      const response = await appwrite.db.updateDocument(
        connection.value.db,
        connection.value.collection,
        document,
        [],
      )
      if (response) {
        documents.value = response;
      } else {
        throw new Error("No hay registros");
      }
    } catch (e) {
      console.log(e);
      documents.value = "no hay registros";
    }
  }

  return {
    documents,
    listDocuments,
    getDocument,
    createDocument,
  };
}
