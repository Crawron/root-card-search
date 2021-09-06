export function randomItem<T>(arr: T[]): T {
	const index = Math.floor(Math.random() * arr.length)
	return arr[index]
}

export function checkSubset<T>(arrA: T[], [...arrB]: T[]): boolean {
	for (const elem of arrA) {
		const i = arrB.findIndex((e) => elem === e)
		if (i >= 0) arrB.splice(i, 1)
		else return false
	}
	return true
}
