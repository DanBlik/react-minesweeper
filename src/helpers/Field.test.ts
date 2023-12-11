import { CellState, emptyFieldGenerator, fieldGenerator } from "./Field"

const { empty, hidden, bomb } = CellState

describe("Field generator", () => {
  describe("Empty field generator", () => {
    it("2x2", () => {
      expect(emptyFieldGenerator(2)).toStrictEqual([
        [empty, empty],
        [empty, empty],
      ])
    })
    it("3x3", () => {
      expect(emptyFieldGenerator(3)).toStrictEqual([
        [empty, empty, empty],
        [empty, empty, empty],
        [empty, empty, empty],
      ])
    })
    it("3x3 with hidden state", () => {
      expect(emptyFieldGenerator(3, hidden)).toStrictEqual([
        [hidden, hidden, hidden],
        [hidden, hidden, hidden],
        [hidden, hidden, hidden],
      ])
    })
  })
  describe("simple cases", () => {
    it("Wrong dencity", () => {
      const errText = "Dencity must be between 0 and 1"
      expect(() => fieldGenerator(1, -1)).toThrow(errText)
      expect(() => fieldGenerator(1, 2)).toThrow(errText)
    })
    it("Smallest possible field without bomb", () => {
      expect(fieldGenerator(1, 0)).toStrictEqual([[empty]])
    })
    // it("Smallest possible field with bomb", () => {
    //   expect(fieldGenerator(1, 1)).toStrictEqual([[bomb]])
    // })
  })
})
