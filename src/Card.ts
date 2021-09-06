export type Suit = "Fox" | "Rabbit" | "Mouse" | "Bird"

type CardType = "Improvement" | "Favor" | "Item" | "Ambush" | "Dominance"

export type Item =
	| "Bag"
	| "Boot"
	| "Crossbow"
	| "Hammer"
	| "Sword"
	| "Kettle"
	| "Coins"

export type Card = {
	assetPath: string
	suit: Suit
	type: CardType
	name: string
	description: string
	amount: number
	craftingPieces?: (Suit | "Any")[]
	craftedItem?: Item
}

const suitOrder: Suit[] = ["Fox", "Rabbit", "Mouse", "Bird"]
export function compareBySuit(cardA: Card, cardB: Card): number {
	return suitOrder.indexOf(cardA.suit) - suitOrder.indexOf(cardB.suit)
}

export function compareByName(cardA: Card, cardB: Card): number {
	return cardA.name.charCodeAt(0) - cardB.name.charCodeAt(0)
}
