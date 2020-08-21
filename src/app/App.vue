<template>
	<UIStack direction="col" class="h-full text-primary">
		<header>
			<UIStack tag="nav" direction="row" alignment="center" class="h-header flex-shrink-0 px-4 bg-gray-900">
				<h1 class="-mt-1 text-2xl font-thin"><RouterLink to="/" class="text-white">ageof.gg</RouterLink></h1>
				<UIStack tag="ul" direction="row" class="ml-3 text-lg font-light">
					<li class="px-3"><RouterLink to="/">Team Comp</RouterLink></li>
					<li class="px-3"><RouterLink to="/games">Games</RouterLink></li>
				</UIStack>
			</UIStack>
		</header>
		<UIStack tag="main" direction="col" class="text-primary">
			<RouterView class="flex-grow" />
		</UIStack>
	</UIStack>
</template>
