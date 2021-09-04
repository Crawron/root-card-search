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
