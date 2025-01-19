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

  return {
    documents,
    error,
    registerUser,
    loginUser,
  };
}
