import counter from "./counter";

describe("reducers", () => {
  describe("counter", () => {
    it("should provide the initial state", () => {
      expect(counter(undefined, {})).toStrictEqual({ value: 0 });
    });

    it("should handle INCREMENT action", () => {
      expect(counter({ value: 1 }, { type: "INCREMENT" })).toStrictEqual({
        value: 2,
      });
    });

    it("should handle INCREMENTBY action", () => {
      expect(
        counter({ value: 1 }, { type: "INCREMENTBY", payload: { factor: 11 } })
      ).toStrictEqual({ value: 12 });
    });

    it("should handle DECREMENT action", () => {
      expect(counter({ value: 1 }, { type: "DECREMENT" })).toStrictEqual({
        value: 0,
      });
    });

    it("should handle DECREMENTBY action", () => {
      expect(
        counter({ value: 1 }, { type: "DECREMENTBY", payload: { factor: 10 } })
      ).toStrictEqual({ value: -9 });
    });

    it("should ignore unknown actions", () => {
      expect(counter({ value: 1 }, { type: "unknown" })).toStrictEqual({
        value: 1,
      });
    });
  });
});
