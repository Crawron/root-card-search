import React from "react"
import { Card } from "../Card"

// :)
export function CardCard(props: Card) {
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
