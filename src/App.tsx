import React, { useState } from "react"
import { Card } from "./Card"
import { cardList } from "./cardList"
import Fuse from "fuse.js"
import "./index.css"

const fuse = new Fuse(cardList, {
	keys: ["name", "description", "type"],
	ignoreLocation: true,
})

function App() {
	const [nameFilter, setNameFilter] = useState("")

	const renderCard = (card: Card) => (
		<CardCard key={card.suit + card.name} {...card} />
	)

	const filteredList = fuse
		.search(nameFilter)
		.map((r) => r.item)
		.map(renderCard)

	return (
		<div className="App p-4">
			<input
				type="text"
				className="border rounded p-1"
				value={nameFilter}
				onChange={(v) => setNameFilter(v.target.value)}
			/>
			<div className="flex flex-wrap gap-2">
				{filteredList.length ? filteredList : cardList.map(renderCard)}
			</div>
		</div>
	)
}

// :)
function CardCard(props: Card) {
	const { name, description, amount, suit, assetPath, craftingPieces } = props
	return (
		<div className="w-52">
			{/* <div className="flex px-4 gap-4">
				<span>{suit}</span>
				<div className="flex-1" />
				<span>{craftingPieces?.map(([c]) => c).join(" ")}</span>
			</div> */}
			<div
				className="rounded text-white shadow w-full h-72 p-4 bg-cover"
				style={{ backgroundImage: `url('/${assetPath}.png')` }}
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
