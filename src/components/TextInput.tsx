import React from "react"
import { IconSearch } from "./Icons"

export function TextInput(props: {
	value: string
	onChange: (value: string) => void
	placeholder?: string
}) {
	const { value, onChange, placeholder } = props
	return (
		<div className="flex flex-1 transition-colors -mb-2.5 h-9 overflow-hidden place-items-center border-b-2 border-current min-w-min dark:focus-within:bg-yellow-100/20 focus-within:bg-yellow-900/20 rounded-sm">
			<div className="px-1.5">
				<IconSearch />
			</div>
			<input
				type="text"
				className="transition-colors flex-1 h-full leading-none outline-none bg-transparent placeholder-shown:italic placeholder-black/40 dark:placeholder-yellow-100/50"
				value={value}
				placeholder={placeholder}
				onChange={(v) => onChange(v.target.value)}
			/>
		</div>
	)
}
