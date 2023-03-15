const crypto = require("crypto");
const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

//Duplicate code moved to one function
const generateHash = (key) => {
  if (!key) {
    return null;
  }
  return crypto.createHash("sha3-512").update(key).digest("hex");
};

exports.deterministicPartitionKey = (event) => {
  //if no event then return TRIVIAL_PARTITION_KEY
  if (!event) {
    return TRIVIAL_PARTITION_KEY;
  }
  //if no event.partitionKey then return hashed of event
  if (!event.partitionKey) {
    return generateHash(JSON.stringify(event));
  }

  const partitionKey =
    typeof event.partitionKey !== "string"
      ? JSON.stringify(event.partitionKey)
      : event.partitionKey;

  if (partitionKey.length > MAX_PARTITION_KEY_LENGTH) {
    return generateHash(partitionKey);
  }

  return partitionKey;
};
