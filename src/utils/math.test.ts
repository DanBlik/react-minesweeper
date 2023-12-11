import { add } from "./math"

describe("math fn checkers", () => {
  it("check add module", () => {
    expect(add(2, 3)).toBe(5)
    expect(add(3, 3)).toBe(6)
    expect(add(10, 3)).toBe(13)
  })
})
