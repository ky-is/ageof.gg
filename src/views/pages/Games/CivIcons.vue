<template>
	<UIStack direction="col" justification="center" class="h-content items-center bg-black relative">
		<template v-if="!gameMode">
			<h2 class="text-3xl">Civ Icon Match</h2>
			<p class="text-secondary text-xl font-light px-4 text-center">Guess the civilization for each of {{ civNames.length }} AoE II civ icons!</p>
			<hr class="w-64 my-8 border-secondary">
			<h3 class="mb-2 text-xl">Choose your mode:</h3>
			<UIStack direction="col" switchAt="md" class="space-x-4 md:space-x-0 md:space-y-0 space-y-4">
				<UIStack direction="col" alignment="center" class="space-y-1">
					<button class="ui-button ui-purple  w-48" @click="onGameMode('easy')">Easy</button>
					<p class="w-64 text-center text-secondary">Large icon with 3 multiple-choice answers to guide you.</p>
				</UIStack>
				<UIStack direction="col" alignment="center" class="space-y-1">
					<button class="ui-button ui-pink  w-48" @click="onGameMode('hard')">Hard</button>
					<p class="w-64 text-center text-secondary">Small icon and type-to-answer mode.</p>
				</UIStack>
			</UIStack>
		</template>
		<template v-else-if="currentCiv">
			<div class="absolute top-0 right-0 mt-1 mx-2">
				<span class="text-green-700">✓</span><span class="text-secondary font-semibold">{{ sessionCorrectAnswers.size }}</span>&nbsp;
				<span class="text-red-600 mr-px">✕</span><span class="text-secondary font-semibold">{{ sessionIncorrectCivs.size }}</span>&nbsp;
				<span class="text-secondary">Best: <span class="font-semibold">{{ highScores[gameMode] }}</span></span>
			</div>
			<CivIcon :civ="currentCiv" class="mb-4" :class="gameMode === 'hard' ? 'wh-8' : 'wh-32'" />
			<template v-if="gameMode === 'hard'">
				<UIStack direction="col" class="relative mb-4">
					<input
						ref="answerInput" v-model="typedAnswer"
						class="block w-96 max-w-full w-md h-12 text-2xl font-light bg-gray-900 text-gray-100 text-center"
						placeholder="Type a civ name" autofocus
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
			<UIStack v-else direction="col" @keydown="onAnswerButtonShortcuts">
				<button
					v-for="(answer, index) in availableAnswers" :key="answer"
					:disabled="questionIncorrectNormalizedAnswers.has(normalized(answer))"
					class="ui-answer  relative"
					@click="onAnswer(answer)"
				>
					<div class="absolute pl-4 text-secondary text-sm leading-loose">{{ index + 1 }}</div>
					{{ answer }}
				</button>
			</UIStack>
			<UIStack direction="col" :class="{ invisible: typedSuggestions?.length }">
				<button
					class="ui-button ui-700  w-64"
					@click="onShowAnswer"
				>
					Not sure
				</button>
				<button
					class="ui-button ui-700  w-64 mt-2" :class="{ invisible: typedSuggestions?.length }"
					@click="onEndEarly"
				>
					End now...
				</button>
			</UIStack>
		</template>
		<template v-else>
			<h2 class="mb-4 text-5xl text-secondary font-extralight smallcaps">game over!</h2>
			<table class="border-cells max-w-lg">
				<thead>
					<tr class="text-3xl whitespace-nowrap">
						<th><span class="text-green-700">✓</span> <span>{{ sessionCorrectAnswers.size }}</span></th>
						<th><span class="text-red-600">✕</span> <span>{{ sessionIncorrectCivs.size }}</span></th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{{ Array.from(sessionCorrectAnswers).join(', ') }}</td>
						<td>{{ Array.from(sessionIncorrectCivs).join(', ') }}</td>
					</tr>
				</tbody>
			</table>
			<button class="ui-button  w-64 mt-4" :class="gameMode === 'hard' ? 'ui-pink' : 'ui-purple'" @click="onReset">
				Play again
			</button>
		</template>
	</UIStack>
</template>

<script setup lang="ts">
import { computed, ref, reactive } from 'vue'

import civEntries from '@/assets/generated/civs'

import { shuffle, getRandomItemFrom } from '@/helpers/random'
import { useStore } from '@/models/store'

import type { CivData } from '@/assets/types'

import { useKeydown } from '@/helpers/keyboard'

import CivIcon from '@/views/components/CivIcon.vue'
import UIStack from '@/views/components/UIStack.vue'

const { state, commit } = useStore()

const highScores = computed(() => state.games.civIcons.highScore)

const gameMode = ref<undefined | 'easy' | 'hard'>(undefined)

function getCivList () {
	return shuffle(civEntries.slice(1))
}

let availableCivs = getCivList()

function getNextCiv () {
	return availableCivs.pop()
}

const answerInput = ref<HTMLInputElement | undefined>(undefined)

function normalized (civName: string) {
	return civName.toLowerCase()
}

const civNames = availableCivs.map(civ => civ.name)
const currentCiv = ref(getNextCiv())

const typedAnswer = ref('')
const typedSuggestions = computed(() => {
	const normalizedTypedAnswer = normalized(typedAnswer.value.trim())
	const suggestions = []
	if (normalizedTypedAnswer) {
		for (const civName of civNames) {
			const normalizedCivName = normalized(civName)
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
const typedSuggestionIndex = ref(0)

function onGameMode (mode: 'easy' | 'hard') {
	gameMode.value = mode
}

function onAnswerButtonShortcuts (event: KeyboardEvent) {
	console.log(event.keyCode)
	switch (event.keyCode) {
	case 13:
		break
	}
}

function onTypedKey (event: KeyboardEvent) {
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

const sessionCorrectAnswers = reactive(new Set<string>())
const sessionIncorrectCivs = reactive(new Set<string>())
const sessionIncorrectAnswers = reactive(new Set<[string, string]>())

function getMultipleChoiceAnswers (correctCiv: CivData) {
	const results = [correctCiv.name, '', '']
	for (let index = 1; index < results.length; index += 1) {
		let answer = ''
		while (results.includes(answer)) {
			answer = getRandomItemFrom(civNames)
		}
		results[index] = answer
	}
	return shuffle(results)
}

const availableAnswers = ref(getMultipleChoiceAnswers(currentCiv.value!))
const questionIncorrectNormalizedAnswers = reactive(new Set<string>())

useKeydown([49, 50, 51], (keyCode) => {
	const index = keyCode - 49
	onAnswer(availableAnswers.value[index])
})

function answerIncorrectly (correctCivAnswer: string, submittedAnswer: string) {
	sessionIncorrectAnswers.add([correctCivAnswer, submittedAnswer])
	sessionIncorrectCivs.add(correctCivAnswer)
	questionIncorrectNormalizedAnswers.add(normalized(submittedAnswer))
	// if (!sessionIncorrectCivs.has(correctCivAnswer)) {
	// }
	answerInput.value?.focus()
}

function advanceToNextQuestion () {
	const nextCiv = getNextCiv()
	currentCiv.value = nextCiv
	if (nextCiv) {
		availableAnswers.value = getMultipleChoiceAnswers(nextCiv)
	}
	questionIncorrectNormalizedAnswers.clear()
}

function onAnswer (answer: string) {
	const correctCivName = currentCiv.value?.name
	const currentGameMode = gameMode.value
	typedAnswer.value = ''
	typedSuggestionIndex.value = 0
	if (!correctCivName || !currentGameMode) {
		return
	}
	const answerNormalized = normalized(answer)
	if (answerNormalized === normalized(correctCivName)) {
		if (!sessionIncorrectCivs.has(correctCivName)) {
			sessionCorrectAnswers.add(correctCivName)
			if (sessionCorrectAnswers.size > highScores.value[currentGameMode]) {
				commit.setHighScore('civIcons', currentGameMode, sessionCorrectAnswers.size)
			}
		}
		advanceToNextQuestion()
	} else {
		answerIncorrectly(correctCivName, answer)
	}
}

function onShowAnswer () {
	const correctCivName = currentCiv.value?.name
	if (!correctCivName) {
		return
	}
	if (gameMode.value === 'hard') {
		typedAnswer.value = correctCivName
	} else {
		for (const answer of availableAnswers.value) {
			if (answer !== correctCivName) {
				questionIncorrectNormalizedAnswers.add(normalized(answer))
			}
		}
	}
	answerIncorrectly(correctCivName, '?')
}

function onEndEarly () {
	if (!sessionCorrectAnswers.size && !sessionIncorrectCivs.size) {
		return onReset()
	}
	const confirmed = window.confirm('End the game now?')
	if (confirmed) {
		currentCiv.value = undefined
	}
}

function onReset () {
	gameMode.value = undefined
	currentCiv.value = undefined
	availableCivs = getCivList()
	sessionCorrectAnswers.clear()
	sessionIncorrectCivs.clear()
	sessionIncorrectAnswers.clear()
	advanceToNextQuestion()
}
</script>
