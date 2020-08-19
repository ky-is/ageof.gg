<template>
	<UIStack direction="col" justification="center" class="h-content items-center bg-black relative">
		<template v-if="!gameMode">
			<h2 class="text-2xl">Civ Icon Match</h2>
			<p class="text-secondary text-xl font-light">Guess the civilization for each of {{ civNames.length }} AoE II civ icons!</p>
			<hr class="w-64 my-8 border-secondary">
			<h3 class="mb-2 text-xl">Choose your mode:</h3>
			<table class="text-center" style="">
				<tbody>
					<tr>
						<td><button class="ui-button ui-purple w-48" @click="gameMode = 'easy'">Easy</button></td>
						<td><button class="ui-button ui-pink w-48" @click="gameMode = 'hard'">Hard</button></td>
					</tr>
					<tr class="text-secondary">
						<td class="pt-1"><p class="w-64">Large icon with 3 multiple-choice answers to guide you.</p></td>
						<td class="pt-1"><p class="w-64">Small icon and type-to-answer mode.</p></td>
					</tr>
				</tbody>
			</table>
		</template>
		<template v-else-if="currentCiv">
			<div class="absolute top-0 right-0 mt-1 mx-2">
				<span class="text-green-700">✓</span><span class="text-secondary">{{ sessionCorrectAnswers.length }}</span>&nbsp;
				<span class="text-red-600">✕</span><span class="text-secondary">{{ sessionIncorrectAnswers.length }}</span>
			</div>
			<CivIcon :civ="currentCiv" class="mb-4" :class="gameMode === 'hard' ? 'wh-6' : 'wh-32'" />
			<template v-if="gameMode === 'hard'">
				<UIStack direction="col" class="relative mb-4">
					<input
						v-model="typedAnswer"
						class="w-64 h-12 text-2xl font-light bg-gray-900 text-gray-100 text-center" placeholder="Type a civ name"
						@keydown="onTypedKey"
					>
					<UIStack v-if="typedSuggestions?.length" direction="col" class="absolute top-full w-full">
						<button
							v-for="(suggestion, index) in typedSuggestions" :key="suggestion"
							class="h-8" :class="typedSuggestionIndex === index ? 'bg-gray-800 font-bold' : 'bg-gray-950'"
							@hover="typedSuggestionIndex = index" @click="onAnswer(suggestion)"
						>
							{{ suggestion }}
						</button>
					</UIStack>
				</UIStack>
			</template>
			<template v-else>
				<button
					v-for="answer in availableAnswers" :key="answer"
					:disabled="questionIncorrectAnswers.has(answer.toLowerCase())"
					class="ui-answer"
					@click="onAnswer(answer)"
				>
					{{ answer }}
				</button>
			</template>
			<button
				class="ui-button ui-700  w-64" :class="{ invisible: typedSuggestions?.length }"
				@click="onShowAnswer"
			>
				Not sure
			</button>
		</template>
		<template v-else>
			<h2 class="text-5xl text-secondary font-thin smallcaps">game over!</h2>
			<table class="border-cells max-w-lg">
				<thead>
					<tr class="text-3xl">
						<th><span class="text-green-700">✓</span> <span>{{ sessionCorrectAnswers.length }}</span></th>
						<th><span class="text-red-600">✕</span> <span>{{ sessionIncorrectAnswers.length }}</span></th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{{ sessionCorrectAnswers.join(', ') }}</td>
						<td>{{ sessionIncorrectAnswers.map(([correctCivName, answer]) => correctCivName).join(', ') }}</td>
					</tr>
				</tbody>
			</table>
		</template>
	</UIStack>
</template>

<script setup lang="ts">
import { computed, ref, reactive } from 'vue'

import civEntries from '/@/assets/generated/civs'

import { shuffle, getRandomItemFrom } from '/@/helpers/random'

import CivIcon from '/@/views/components/CivIcon.vue'
import UIStack from '/@/views/ui/Stack.vue'
export default { components: { CivIcon, UIStack } }

export const gameMode = ref<undefined | 'easy' | 'hard'>(undefined)

const availableCivs = shuffle(civEntries.slice(1))

function getNextCiv () {
	return availableCivs.pop()
}

export const civNames = availableCivs.map(civ => civ.name)
export const currentCiv = ref(getNextCiv())

export const typedAnswer = ref('')
export const typedSuggestions = computed(() => {
	const normalizedTypedAnswer = typedAnswer.value.trim().toLowerCase()
	const suggestions = []
	if (normalizedTypedAnswer) {
		for (const civName of civNames) {
			const normalizedCivName = civName.toLowerCase()
			if (normalizedCivName === normalizedTypedAnswer) {
				return null
			}
			if (normalizedCivName.startsWith(normalizedTypedAnswer)) {
				suggestions.push(civName)
			}
		}
	}
	return suggestions
})
export const typedSuggestionIndex = ref(0)

export function onTypedKey (event: KeyboardEvent) {
	switch (event.keyCode) {
	case 13: {
		const answer = typedSuggestions.value ? typedSuggestions.value[typedSuggestionIndex.value] : typedAnswer.value
		if (answer) {
			onAnswer(answer)
		}
		break
	}
	case 38:
		typedSuggestionIndex.value -= 1
		break
	case 40:
		typedSuggestionIndex.value += 1
		break
	}
}

export const sessionCorrectAnswers = reactive([] as string[])
const sessionIncorrectCivs = new Set<string>()
export const sessionIncorrectAnswers = reactive([] as [string, string][])

function getMultipleChoiceAnswers () {
	const civ = currentCiv.value
	if (!civ) {
		return []
	}
	const results = [civ.name, '', '']
	for (let index = 1; index < results.length; index += 1) {
		let answer = ''
		while (results.includes(answer)) {
			answer = getRandomItemFrom(civNames)
		}
		results[index] = answer
	}
	return shuffle(results)
}

export const availableAnswers = ref(getMultipleChoiceAnswers())
export const questionIncorrectAnswers = reactive(new Set<string>())

export function onAnswer (answer: string) {
	const correctCivName = currentCiv.value?.name
	typedAnswer.value = ''
	typedSuggestionIndex.value = 0
	if (!correctCivName) {
		return
	}
	const answerNormalized = answer.toLowerCase()
	if (answerNormalized === correctCivName.toLowerCase()) {
		currentCiv.value = getNextCiv()
		availableAnswers.value = getMultipleChoiceAnswers()
		if (!sessionIncorrectCivs.has(correctCivName)) {
			sessionCorrectAnswers.push(correctCivName)
		}
		questionIncorrectAnswers.clear()
	} else {
		if (!questionIncorrectAnswers.has(answerNormalized)) {
			sessionIncorrectAnswers.push([correctCivName, answer])
			sessionIncorrectCivs.add(correctCivName)
			questionIncorrectAnswers.add(answerNormalized)
		}
	}
}
</script>
