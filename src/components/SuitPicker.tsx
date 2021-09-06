import React from "react"
import clsx from "clsx"
import { Suit } from "../Card"
import { IconBird, IconFox, IconMouse, IconRabbit } from "./Icons"
import { buttonShape } from "../App"

function ToggleButton(props: {
	value: boolean
	onChange: (value: boolean) => void
	icon: React.ReactElement
}) {
	const { icon, value, onChange } = props

	return (
		<button
			className={clsx(value ? "bg-current" : "text-current", buttonShape)}
			onClick={() => onChange(!value)}
		>
			<span
				className={
					value ? "text-yellow-100 dark:text-warm-gray-800" : "text-current"
				}
			>
				{icon}
			</span>
		</button>
	)
}
export function SuitPicker(props: {
	suits: Record<Suit, boolean>
	onChange: (value: Record<Suit, boolean>) => void
}) {
	const { suits, onChange } = props
	const { Fox, Rabbit, Mouse, Bird } = suits

	return (
		<div className="flex gap-2">
			<span className="text-fox-light dark:text-fox-dark">
				<ToggleButton
					value={Fox}
					onChange={() => onChange({ ...suits, Fox: !Fox })}
					icon={<IconFox />}
				/>
			</span>
			<span className="text-rabbit-light dark:text-rabbit-dark">
				<ToggleButton
					value={Rabbit}
					onChange={() => onChange({ ...suits, Rabbit: !Rabbit })}
					icon={<IconRabbit />}
				/>
			</span>
			<span className="text-mouse-light dark:text-mouse-dark">
				<ToggleButton
					value={Mouse}
					onChange={() => onChange({ ...suits, Mouse: !Mouse })}
					icon={<IconMouse />}
				/>
			</span>
			<span className="text-bird-light dark:text-bird-dark">
				<ToggleButton
					value={Bird}
					onChange={() => onChange({ ...suits, Bird: !Bird })}
					icon={<IconBird />}
				/>
			</span>
		</div>
	)
}
