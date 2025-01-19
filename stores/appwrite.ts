export const useAppwriteStore = defineStore("appwrite", () => {
  // states
  const { account, database } = useAppwrite();

  const acc = account;
  const db = database;
  const user = ref()
  const sessions = ref();
  const userSession = ref();

  onMounted(async () => {
    //try {
    //  sessions.value = await acc.listSessions();
    //  userSession.value = sessions.value.sessions.find(
    //    (sess: any) => sess.userId === user.value.$id,
    //  );
    //} catch (e: any) {
    //  if (e.code === 401) {
    //    console.error("Unauthenticated", e);
    //  }
    //}
  });

  // getters
  async function getUser() {
    user.value = await acc.get();
    return user.value;
  }
  async function getUserSession() {}

  // return
  return {
    acc,
    db,
    getUser
  };
});
