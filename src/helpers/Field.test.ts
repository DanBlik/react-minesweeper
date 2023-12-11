import { Cell, CellState, emptyFieldGenerator, fieldGenerator } from "./Field"

const { empty, hidden, bomb } = CellState

const cellWithBombFilter = (cell: Cell) => cell === bomb

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
    it("Smallest possible field with bomb", () => {
      expect(fieldGenerator(1, 1)).toStrictEqual([[bomb]])
    })
    it("2x2 field with 1 dencity", () => {
      expect(fieldGenerator(2, 1)).toStrictEqual([
        [bomb, bomb],
        [bomb, bomb],
      ])
    })
    it("2x2 field with 0 dencity", () => {
      expect(fieldGenerator(2, 0)).toStrictEqual([
        [empty, empty],
        [empty, empty],
      ])
    })
    it("2x2 field with 0.5 dencity", () => {
      const field = fieldGenerator(2, 0.5)
      const flatField = field.flat()
      console.log(flatField)

      const emptyCells = flatField.filter((cell) => cell === 2)
      const cellsWithBombs = flatField.filter(cellWithBombFilter)

      expect(emptyCells).toHaveLength(2)
      expect(cellsWithBombs).toHaveLength(2)
    })
    it("Real game field size = 10x10 with 1/4 mined cells (25 mines)", () => {
      const size = 10
      const mines = 25

      const probability = mines / (size * size)
      const field = fieldGenerator(size, probability)

      const flatField = field.flat()

      expect(flatField.filter(cellWithBombFilter)).toHaveLength(25)
    })
  })
})
