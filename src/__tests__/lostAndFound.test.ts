import { test, expect } from "vitest";
import { LostAndFound } from "../lostAndFound.js";

test("findSuggestions returns known locations for comb", () => {
  const store = new LostAndFound([
    { name: "comb", category: "makeup", locations: [["backpack", 3], ["desk", 1]] }
  ]);
  const suggestions = store.findSuggestions("comb");
  expect(suggestions).toContain("backpack");
  expect(suggestions).toContain("desk");
});

test("markFound increases frequency or adds new location", () => {
  const store = new LostAndFound([
    { name: "comb", category: "makeup", locations: [["backpack", 1]] }
  ]);
  store.markFound("comb", "backpack");
  const backpackLocation = store.getItems()[0]?.locations.find(l => l[0] === "backpack");
  expect(backpackLocation?.[1]).toBe(2);
  store.markFound("comb", "purse");
  expect(store.getItems()[0]?.locations.some(l => l[0] === "purse")).toBe(true);
});