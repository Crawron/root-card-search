import React, { useEffect, useState } from "react"
import Fuse from "fuse.js"
import clsx from "clsx"

import { randomItem } from "./helpers"
import { cardList } from "./cardList"
import { Card, compareByName, compareBySuit, countCards, Suit } from "./Card"

import "./index.css"
import { Logo } from "./components/Logo"
import { IconGithub, IconMoon, IconSun } from "./components/Icons"
import { TextInput } from "./components/TextInput"
import { CardCard } from "./components/CardCard"
import { SuitPicker } from "./components/SuitPicker"

export const buttonShape = clsx`grid place-items-center font-bold h-9 px-2 rounded transition-colors border border-black/10 dark:border-white/10`

const buttonStyle = clsx(
	buttonShape,
	clsx`hover:bg-black/20 active:bg-black/50 dark:hover:bg-white/20 dark:active:bg-black`
)

function App() {
	const [darkTheme, setDarkTheme] = useState(
		localStorage.getItem("darkTheme") === "true"
	)
	const [searchFilter, setSearchFilter] = useState("")
	const [suits, setSuits] = useState<Record<Suit, boolean>>({
		Fox: true,
		Rabbit: true,
		Mouse: true,
		Bird: true,
	})

	useEffect(() => {
		if (darkTheme) {
			localStorage.setItem("darkTheme", "true")
			document.documentElement.classList.add("dark")
		} else {
			localStorage.removeItem("darkTheme")
			document.documentElement.classList.remove("dark")
		}
	}, [darkTheme])

	const renderCard = (card: Card) => (
		<CardCard key={card.suit + card.name} {...card} />
	)

	const craftingPieces: Exclude<Suit, "Bird">[] = ["Rabbit", "Rabbit", "Rabbit"]
	const cards = [...cardList]
		.filter((card) => suits[card.suit])
		//.filter((card) => checkCrafting(card, craftingPieces))
		.sort(compareByName)
		.sort(compareBySuit)

	const fuse = new Fuse(cards, {
		keys: ["name", "description", "type"],
		ignoreLocation: true,
	})

	const searchCards = fuse.search(searchFilter).map((r) => r.item)
	const randomCardName = randomItem(cardList).name
	const displayedCards = searchCards.length ? searchCards : cards

	return (
		<div className="App p-4 py-16 w-full max-w-6xl mx-auto flex flex-col gap-6">
			<div className="flex gap-2 justify-end">
				<a
					className={buttonStyle}
					href="https://github.com/Crawron/root-card-search"
					title="Source Code"
					target="_blank"
				>
					<IconGithub />
				</a>
				<button
					className={buttonStyle}
					title="Switch Theme"
					onClick={() => setDarkTheme(!darkTheme)}
				>
					{darkTheme ? <IconSun /> : <IconMoon />}
				</button>
			</div>
			<div className="flex flex-wrap gap-2 items-end">
				<Logo />
				<span className="-mb-1 font-bold mr-8">Card Search</span>
				<TextInput
					value={searchFilter}
					onChange={setSearchFilter}
					placeholder={randomCardName}
				/>
			</div>
			<div className="flex gap-2 place-items-center">
				<div className="flex gap-2 place-items-center">
					Show Suits
					<SuitPicker suits={suits} onChange={setSuits} />
				</div>
				<div className="flex-1" />
				<span className="opacity-70 italic">
					{countCards(displayedCards)} cards, {displayedCards.length} unique
				</span>
			</div>

			<div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(11rem,1fr))]">
				{displayedCards.map(renderCard)}
			</div>
		</div>
	)
}

export default App
