import React from "react"
import { IconSearch } from "./Icons"

export function TextInput(props: {
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
