import { validateUrl } from "../src/functions/utils";

test("validate url", () => {
    expect(validateUrl("da;lfkjdaf")).toBe(false);
})