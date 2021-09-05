import React, { useEffect, useState } from "react"
import Fuse from "fuse.js"
import clsx from "clsx"

import { Card } from "./Card"
import { cardList } from "./cardList"
import { Logo } from "./Logo"
import { IconMoon, IconSearch, IconSun } from "./Icons"

import "./index.css"

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

	function randomItem<T>(arr: T[]): T {
		const index = Math.floor(Math.random() * arr.length)
		return arr[index]
	}

	function randomCardName() {
		return randomItem(cardList).name
	}

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
					placeholder={!nameFilter ? randomCardName() : ""}
				/>
			</div>
			<div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(11rem,1fr))]">
				{filteredList.length ? filteredList : cardList.map(renderCard)}
			</div>
		</div>
	)
}

function TextInput(props: {
	value: string
	onChange: (value: string) => void
	placeholder?: string
}) {
	const { value, onChange, placeholder } = props
	return (
		<div className="flex flex-1 -mb-2.5 h-9 overflow-hidden place-items-center border-b-2 border-current min-w-min">
			<div className="px-1.5">
				<IconSearch />
			</div>
			<input
				type="text"
				className="transition-colors flex-1 h-full outline-none bg-yellow-100 dark:bg-warm-gray-700 placeholder-shown:italic placeholder-black/40 dark:placeholder-yellow-100/50"
				value={value}
				placeholder={placeholder}
				onChange={(v) => onChange(v.target.value)}
			/>
		</div>
	)
}

// :)
function CardCard(props: Card) {
	const { name, description, amount, suit, assetPath, craftingPieces } = props
	return (
		<div className="transition-all cursor-pointer select-none transform hover:-translate-y-1 active:translate-y-0 active:brightness-75">
			{/* <div className="flex px-4 gap-4">
				<span>{suit}</span>
				<div className="flex-1" />
				<span>{craftingPieces?.map(([c]) => c).join(" ")}</span>
			</div> */}
			<img
				loading="lazy"
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
