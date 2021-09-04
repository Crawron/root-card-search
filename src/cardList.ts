import { Card, Item, Suit } from "./Card"

export const itemStats: Record<
	Item,
	{
		vp: number
		craftingPieces: Suit[]
		cardSuits: Suit[]
		cardAssetPaths: string[]
		cardNames: string[]
	}
> = {
	Boot: {
		vp: 1,
		craftingPieces: ["Rabbit"],
		cardSuits: ["Fox", "Rabbit", "Mouse", "Bird"],
		cardAssetPaths: ["card-12", "card-22", "card-31", "card-03"],
		cardNames: [
			"Travel Gear",
			"A Visit to Friends",
			"Travel Gear",
			"Woodland Runners",
		],
	},
	Bag: {
		vp: 1,
		craftingPieces: ["Mouse"],
		cardSuits: ["Fox", "Rabbit", "Mouse", "Bird"],
		cardAssetPaths: ["card-10", "card-20", "card-29", "card-01"],
		cardNames: [
			"Gently Used Knapsack",
			"Smuggler's Trail",
			"Mouse-in-a-Sack",
			"Birdy Bindle",
		],
	},
	Crossbow: {
		vp: 1,
		craftingPieces: ["Fox"],
		cardSuits: ["Mouse", "Bird"],
		cardAssetPaths: ["card-34", "card-05"],
		cardNames: ["Crossbow", "Crossbow"],
	},
	Hammer: {
		vp: 2,
		craftingPieces: ["Fox"],
		cardSuits: ["Fox"],
		cardAssetPaths: ["card-15"],
		cardNames: ["Anvil"],
	},
	Sword: {
		vp: 2,
		craftingPieces: ["Fox", "Fox"],
		cardSuits: ["Fox", "Mouse", "Bird"],
		cardAssetPaths: ["card-14", "card-33", "card-04"],
		cardNames: ["Foxfolk Steel", "Sword", "Arms Trader"],
	},
	Kettle: {
		vp: 2,
		craftingPieces: ["Mouse"],
		cardSuits: ["Fox", "Rabbit", "Mouse"],
		cardAssetPaths: ["card-11", "card-21", "card-30"],
		cardNames: ["Root Tea", "Root Tea", "Root Tea"],
	},
	Coins: {
		vp: 3,
		craftingPieces: ["Rabbit", "Rabbit"],
		cardSuits: ["Fox", "Rabbit", "Mouse"],
		cardAssetPaths: ["card-13", "card-23", "card-32"],
		cardNames: ["Protection Racket", "Bake Sale", "Investments"],
	},
}

const itemCards = () => {
	const cards: Card[] = []

	for (const [item, stats] of Object.entries(itemStats)) {
		for (const [i, suit] of stats.cardSuits.entries()) {
			cards.push({
				amount: 1,
				name: stats.cardNames[i],
				assetPath: stats.cardAssetPaths[i],
				description: `Retrieve a ${item}, get +${stats.vp} VP, then discard.`,
				suit,
				type: "Item",
				craftingPieces: stats.craftingPieces,
				craftedItem: item as Item,
			})
		}
	}

	return cards
}

export const ambushCards = (): Card[] => {
	const suits: Suit[] = ["Fox", "Rabbit", "Mouse", "Bird"]
	const assets = ["card-09", "card-19", "card-28", "card-00"]

	return suits.map((suit, i) => {
		const clearing = suit === "Bird" ? "any" : `a ${suit.toLowerCase()}`

		return {
			amount: suit === "Bird" ? 2 : 1,
			assetPath: assets[i],
			description: `You may ${
				suit !== "Bird" ? "only" : ""
			} ambush in ${clearing} clearing. At start of battle, defender may play to deal two immediate hits, then discard. Cancel if attacker plays matching ambush.`,
			name: "Ambush!",
			suit,
			type: "Ambush",
		}
	})
}

export const favorCards = (): Card[] => {
	const suits: Suit[] = ["Fox", "Rabbit", "Mouse"]
	const assets = ["card-18", "card-27", "card-37"]
	const plurals: Record<Suit, string> = {
		Fox: "Foxes",
		Rabbit: "Rabbits",
		Mouse: "Mice",
		Bird: "Birds", // lol technically i need to have this
	}

	return suits.map((suit, i) => ({
		amount: 1,
		assetPath: assets[i],
		description: `Remove all enemy pieces in ${suit.toLowerCase()} clearings, then discard.`,
		name: `Favor of the ${plurals[suit]}`,
		suit,
		type: "Favor",
		craftingPieces: [suit, suit, suit],
	}))
}

export const cardList: Card[] = [
	...itemCards(),

	...ambushCards(),
	{
		suit: "Bird",
		type: "Improvement",
		name: "Armorers",
		description: "In battle, may discard this to ignore all rolled hits taken.",
		amount: 2,
		assetPath: "card-02",
		craftingPieces: ["Fox"],
	},
	{
		suit: "Bird",
		type: "Improvement",
		name: "Sappers",
		description:
			"In battle as defender, may discard this to deal an extra hit.",
		amount: 2,
		assetPath: "card-06",
		craftingPieces: ["Mouse"],
	},
	{
		suit: "Bird",
		type: "Improvement",
		name: "Brutal Tactics",
		description:
			"In battle as attacker, may deal an extra hit, but defender scores one point.",
		assetPath: "card-07",
		craftingPieces: ["Fox", "Fox"],
		amount: 2,
	},
	{
		suit: "Bird",
		type: "Improvement",
		name: "Royal Claim",
		amount: 1,
		assetPath: "card-08",
		description:
			"In Birdsong, may discard this to score one point per clearing you rule.",
		craftingPieces: ["Any", "Any", "Any", "Any"],
	},
	{
		suit: "Fox",
		type: "Improvement",
		name: "Stand and Deliver!",
		amount: 2,
		assetPath: "card-16",
		description:
			"In Birdsong, may take a random card from another player. That player scores one point.",
		craftingPieces: ["Mouse", "Mouse", "Mouse"],
	},
	{
		suit: "Fox",
		amount: 3,
		assetPath: "card-17",
		description:
			"Once in Daylight, may remove one of your warriors to draw a card.",
		name: "Tax Collector",
		type: "Improvement",
		craftingPieces: ["Rabbit", "Fox", "Mouse"],
	},
	{
		suit: "Rabbit",
		amount: 2,
		assetPath: "card-24",
		description: "At start of Daylight, may initiate a battle.",
		name: "Command Warren",
		type: "Improvement",
		craftingPieces: ["Rabbit", "Rabbit"],
	},
	{
		suit: "Rabbit",
		amount: 2,
		assetPath: "card-25",
		description: "At start of Birdsong, you and another player draw a card.",
		name: "Better Burrow Bank",
		type: "Improvement",
		craftingPieces: ["Rabbit", "Rabbit"],
	},
	{
		suit: "Rabbit",
		amount: 2,
		assetPath: "card-26",
		description: "At start of Evening, may take a move.",
		name: "Cobbler",
		type: "Improvement",
		craftingPieces: ["Rabbit", "Rabbit"],
	},
	{
		suit: "Mouse",
		amount: 2,
		assetPath: "card-35",
		description: "As attacker in battle, you are not affected by ambush cards.",
		name: "Scouting Party",
		type: "Improvement",
		craftingPieces: ["Mouse", "Mouse"],
	},
	{
		amount: 2,
		assetPath: "card-36",
		description: "Once in Daylight, may look at another player's hand.",
		name: "Codebreakers",
		suit: "Mouse",
		type: "Improvement",
		craftingPieces: ["Mouse"],
	},
	...favorCards(),
]
