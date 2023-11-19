export const validateEnv = () => {
  const {
    DISCORD_TOKEN,
    DISCORD_CLIENT_ID,
    DISCORD_GUILD_ID,
    DATABASE_URL,
    GOOGLESHEET_API,
  } = process.env;

  let errors: string[] = [];

  if (!DISCORD_TOKEN) {
    errors.push("DISCORD_TOKEN is required");
  }

  if (!DISCORD_CLIENT_ID) {
    errors.push("DISCORD_CLIENT_ID is required");
  }

  if (!DISCORD_GUILD_ID) {
    errors.push("DISCORD_GUILD_ID is required");
  }

  if (!DATABASE_URL) {
    errors.push("DATABASE_URL is required");
  }

  if (!GOOGLESHEET_API) {
    errors.push("GOOGLESHEET_API is required");
  }

  if (errors.length) {
    throw new Error(errors.join("\n"));
  }

  return true;
};
