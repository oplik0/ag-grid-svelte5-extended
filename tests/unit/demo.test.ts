import { describe, expect, it } from "vitest";

// See svelte 5 testing example:
//  https://github.com/PaoloTorregroza/weather-testing

describe("sum test", () => {
    it("adds 1 + 2 to equal 3", () => {
        expect(1 + 2).toBe(3);
    });
});
