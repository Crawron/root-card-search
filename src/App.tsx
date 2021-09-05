import React, { useEffect, useState } from "react"
import Fuse from "fuse.js"
import clsx from "clsx"
import { Card } from "./Card"
import { cardList } from "./cardList"
import "./index.css"
import { Logo } from "./Logo"
import { IconMoon, IconSun } from "./Icons"

const fuse = new Fuse(cardList, {
	keys: ["name", "description", "type"],
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

	return (
		<div className="App p-4 py-16 w-full max-w-3xl mx-auto">
			<div>
				<div className="flex flex-wrap gap-2 items-end">
					<Logo />
					<span className="-mb-1 font-bold mr-8">Card Search</span>
					<input
						type="text"
						className="border flex-1 rounded p-1"
						value={nameFilter}
						onChange={(v) => setNameFilter(v.target.value)}
					/>
				</div>
				<div className="flex gap-2">
					<button
						className={buttonStyle}
						onClick={() => setDarkTheme(!darkTheme)}
					>
						{darkTheme ? <IconSun /> : <IconMoon />}
					</button>
				</div>
			</div>
			<div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(11rem,1fr))]">
				{filteredList.length ? filteredList : cardList.map(renderCard)}
			</div>
		</div>
	)
}

// :)
function CardCard(props: Card) {
	const { name, description, amount, suit, assetPath, craftingPieces } = props
	return (
		<div className="transition-all cursor-pointer transform hover:-translate-y-1 active:translate-y-0 active:brightness-75">
			{/* <div className="flex px-4 gap-4">
				<span>{suit}</span>
				<div className="flex-1" />
				<span>{craftingPieces?.map(([c]) => c).join(" ")}</span>
			</div> */}
			<img
				className="transition-shadow rounded shadow hover:shadow-md w-full overflow-hidden"
				src={`/${assetPath}.png`}
			/>
			{/* <div className="flex gap-2">
				<span className="font-semibold flex-1">{name}</span>
				<span>x{amount}</span>
			</div>
			<p>{description}</p> */}
		</div>
	)
}

export default App
