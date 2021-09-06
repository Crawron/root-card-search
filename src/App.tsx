import React, { useEffect, useState } from "react"
import Fuse from "fuse.js"
import clsx from "clsx"

import { Card, compareByName, compareBySuit } from "./Card"
import { cardList } from "./cardList"
import { Logo } from "./components/Logo"
import { IconMoon, IconSun } from "./components/Icons"

import "./index.css"
import { TextInput } from "./components/TextInput"
import { CardCard } from "./components/CardCard"
import { randomItem } from "./helpers"

const fuse = new Fuse(cardList, {
	keys: ["name", "description", "type", "craftedItem"],
	ignoreLocation: true,
})

const buttonStyle = clsx`grid place-items-center font-bold h-9 px-2 rounded transition-colors border border-black/10 hover:bg-black/20 active:bg-black/50 dark:border-white/10 dark:hover:bg-white/20 dark:active:bg-black`

function App() {
	const [darkTheme, setDarkTheme] = useState(false)
	const [nameFilter, setNameFilter] = useState("")

	useEffect(() => {
		if (darkTheme) document.documentElement.classList.add("dark")
		else document.documentElement.classList.remove("dark")
	}, [darkTheme])

	const renderCard = (card: Card) => (
		<CardCard key={card.suit + card.name} {...card} />
	)

	const filteredList = fuse
		.search(nameFilter)
		.map((r) => r.item)
		.map(renderCard)

	const randomCardName = randomItem(cardList).name

	return (
		<div className="App p-4 py-16 w-full max-w-6xl mx-auto flex flex-col gap-6">
			<div className="flex justify-end">
				<button
					className={buttonStyle}
					onClick={() => setDarkTheme(!darkTheme)}
				>
					{darkTheme ? <IconSun /> : <IconMoon />}
				</button>
			</div>
			<div className="flex flex-wrap gap-2 items-end">
				<Logo />
				<span className="-mb-1 font-bold mr-8">Card Search</span>
				<TextInput
					value={nameFilter}
					onChange={setNameFilter}
					placeholder={randomCardName}
				/>
			</div>
			<div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(11rem,1fr))]">
				{filteredList.length
					? filteredList
					: cardList.sort(compareByName).sort(compareBySuit).map(renderCard)}
			</div>
		</div>
	)
}

export default App
