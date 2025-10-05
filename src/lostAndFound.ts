export type LocationTuple = [string, number]; // [location, frequency]

export interface Item {
    name: string;
    category: string;
    locations: LocationTuple[];
}

export class LostAndFound {
    private items: Item[];

    constructor(items: Item[] = []) {
        this.items = items;
    }

    addItem(item: Item) {
        this.items.push(item);
    }

    findSuggestions(name: string): string[] {
        const lower = name.toLowerCase();
        const byName = this.items.find(i => i.name.toLowerCase() === lower);

        let candidates: LocationTuple[] = [];
        if (byName) {
            candidates = byName.locations;
        } else {
            // fallback: find by category if any item includes the name token
            const match = this.items.find(i => i.name.toLowerCase().includes(lower));
            const category = match?.category;
            if (category) {
                candidates = this.items
                    .filter(i => i.category.toLowerCase() === category.toLowerCase())
                    .flatMap(i => i.locations);
            }
        }

        if (candidates.length === 0) {
            // return some generic defaults
            return ["backpack", "desk", "jacket pocket", "pant pocket"];
        }

        // sort by frequency desc and return location names (unique)
        const map = new Map<string, number>();
        for (const [loc, freq] of candidates) {
            map.set(loc, (map.get(loc) ?? 0) + freq);
        }
        return Array.from(map.entries())
            .sort((a, b) => b[1] - a[1])
            .map(e => e[0]);
    }

    markFound(name: string, location: string) {
        const lower = name.toLowerCase();
        const item = this.items.find(i => i.name.toLowerCase() === lower);
        if (!item) {
            // create new item if unknown
            this.items.push({ name, category: "unknown", locations: [[location, 1]] });
            return;
        }
        const loc = item.locations.find(l => l[0].toLowerCase() === location.toLowerCase());
        if (loc) loc[1] += 1;
        else item.locations.push([location, 1]);
    }

    getItems(): Item[] {
        return this.items;
    }
}