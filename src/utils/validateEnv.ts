export const validateEnv = () => {
  if (!process.env.BOT_TOKEN) {
    console.warn("Missing Discord Bot Token.");
    return false;
  }
  if (!process.env.MONGO_URI) {
    console.warn("Missing MonogDB Connection.");
    return false;
  }
  return true;
};
