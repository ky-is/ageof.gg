import { useEventListener } from '@vueuse/core'

export function useKeydown<T extends number>(keyCodes: T[], handler: (keyCode: T) => void) {
	useEventListener('keydown', (event) => {
		if (event.repeat) {
			return
		}
		const keyCode = event.keyCode as T
		if (!keyCodes.length || keyCodes.includes(keyCode)) {
			handler(keyCode)
		}
	})
}
