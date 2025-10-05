// /**
//  * PRACTICE FILE
//  * Implement the same types and class methods below using the comments as hints.
//  * Replace the `throw` lines with your implementation.
//  */

// export type LocationTuple = [string, number]; // [location, frequency]

// export interface Item {
//   name: string;
//   category: string;
//   locations: LocationTuple[];
// }

// export class LostAndFoundPractice {
//   private items: Item[];

//   // Hint: accept an optional initial array and store it on this.items
//   constructor(items: Item[] = []) {
//     // TODO: initialize this.items
//     this.items = items;
//   }

//   // Hint: push the provided item onto this.items
//   addItem(item: Item) {
//     // TODO: implement addItem
//     this.items.push(item);
//   }

//   // Hint: try exact name match, else find category via includes(), gather matching locations,
//   // combine counts into a map, sort by count desc, return unique location names.
//   findSuggestions(name: string): string[] {
//     // TODO: implement findSuggestions
//     if (this.name === name) {
//         return this.locations;
//     } else if (this.category.includes(name)) {
//         return this.locations;
//     }

//     }
//     // Return e.g. ["backpack", "desk"] or fallback defaults when no candidates.
//     throw new Error("Not implemented - findSuggestions");
//   }

//   // Hint: if item missing create one with category "unknown" and the provided location [loc,1].
//   // If present, find existing location case-insensitively and increment its count or push new tuple.
//   markFound(name: string, location: string) {
//     // TODO: implement markFound
//     throw new Error("Not implemented - markFound");
//   }

//   // Hint: return the internal items array
//   getItems(): Item[] {
//     // TODO: implement getItems
//     throw new Error("Not implemented - getItems");
//   }
// }