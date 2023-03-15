const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    expect(deterministicPartitionKey()).toBe("0");
  });

  it("Returns unhashed value when partitionKey length is less than 256", () => {
    const output = deterministicPartitionKey({
      partitionKey: "partitionKey_below_256",
    });
    expect(output.length).toBe(22);
    expect(output).toBe("partitionKey_below_256");
  });

  it("returns hashed value when partitionKey length is greater than 256", () => {
    const event = {
      partitionKey:
        "partition_string_with_long_text_partition_string_with_long_text_partition_string_with_long_text_partition_string_with_long_text_partition_string_with_long_text_partition_string_with_long_text_partition_string_with_long_text_partition_string_with_long_text_partition_string_with_long_text_partition_string_with_long_text",
    };
    const output = deterministicPartitionKey(event);
    expect(output.length).toBe(128);
    expect(output).not.toBe(event.partitionKey);
  });

  it("returns hashed of 128 for garbage values", () => {
    const partitionKey1 = { p: "garbagevalue" };
    const event = {
      partitionKey1,
    };
    const output = deterministicPartitionKey(event);
    expect(output.length).toBe(128);
    expect(output).not.toBe(JSON.stringify(event));
  });
});
