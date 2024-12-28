import { ID } from "appwrite";

export function useAppwriteUsers() {
  const appwrite = useAppwriteStore();
  const documents = ref();
  const error = ref({
    message: "",
    bug: false,
  });

  const registerUser = async (email: string, password: string) => {
    try {
      const response = await appwrite.acc.create(ID.unique(), email, password);
      // have starus
      console.log(response);
    } catch (e) {
      console.error(e);
      error.value.message = "An error occurred while fetching documents.";
      documents.value = [];
    }
  };

  const loginUser = async (email: string, password: string) => {
    try {
      const response = await appwrite.acc.createEmailPasswordSession(
        email,
        password,
      );
      console.log(response);
    } catch (e) {
      console.error(e);
      error.value.message = "An error occurred while fetching documents.";
      documents.value = [];
    }
  };

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

  const createDocument = async (
    database: string,
    collection: string,
    item: object,
  ) => {
    try {
      const connection = useAppwriteConnection(database, collection);
      const response = await appwrite.db.createDocument(
        connection.value.db,
        connection.value.collection,
        ID.unique(),
        item,
      );
    } catch (e) {
      console.error(e);
      error.value.message = "An error occurred while adding document.";
      documents.value = [];
    }
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

  return {
    documents,
    error,
    registerUser,
    loginUser,
    listDocuments,
    getDocument,
    createDocument,
  };
}
