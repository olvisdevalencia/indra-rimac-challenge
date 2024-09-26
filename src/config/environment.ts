function getEnv(variable: string, defaultValue?: string): string {
  const value = process.env[variable];
  if (!value && !defaultValue) {
    throw new Error(`Missing environment variable: ${variable}`);
  }
  return value || defaultValue!;
}

export const environment = {
  dynamoDbTable: getEnv("DYNAMODB_TABLE"),
};
