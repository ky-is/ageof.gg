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
			<CivIcon :civ="currentCiv" class="wh-32 mb-4" />
			<button
				v-for="answer in availableAnswers" :key="answer"
				:disabled="questionIncorrectAnswers.includes(answer)"
				class="w-64 h-12 mb-3 border border-gray-850 rounded-full text-xl bg-gray-950  hover:bg-gray-850 hover-active:bg-gray-750 disabled:cursor-default disabled:bg-red-900 focus:outline-none"
				@click="onAnswer(answer)"
			>
				{{ answer }}
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
export const questionIncorrectAnswers = ref([] as string[])

export function onAnswer (answer: string) {
	const correctCivName = currentCiv.value?.name
	if (!correctCivName) {
		return
	}
	if (answer === correctCivName) {
		currentCiv.value = getNextCiv()
		availableAnswers.value = getMultipleChoiceAnswers()
		if (!sessionIncorrectCivs.has(correctCivName)) {
			sessionCorrectAnswers.push(correctCivName)
		}
		questionIncorrectAnswers.value = []
	} else {
		sessionIncorrectAnswers.push([correctCivName, answer])
		sessionIncorrectCivs.add(correctCivName)
		questionIncorrectAnswers.value.push(answer)
	}
}
</script>
