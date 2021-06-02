<template>
	<UIStack direction="col" class="h-full text-primary">
		<header>
			<UIStack tag="nav" direction="row" alignment="center" class="h-header flex-shrink-0 px-4 bg-gray-900">
				<h1 class="-mt-1 text-2xl font-extralight"><RouterLink to="/" class="text-white">ageof.gg</RouterLink></h1>
				<UIStack tag="ul" direction="row" class="ml-3 text-lg font-light">
					<li>
						<RouterLink to="/" class="px-2 sm:px-3 :py-4">Team Comp</RouterLink>
					</li>
					<li class="group relative">
						<RouterLink to="/games" class="px-2 sm:px-3 py-4">Games</RouterLink>
						<ul class="absolute z-50 w-40 px-3 mt-1 bg-gray-950 hidden group-hover:block child:h-32 divide-y divide-gray-700">
							<li><RouterLink to="/games/civ-icons" class="block py-3">Civ Icon Match</RouterLink></li>
							<!-- <li><RouterLink to="/games/civ-sounds" class="block py-3">Civ Sounds</RouterLink></li> -->
							<!-- <li><RouterLink to="/games/taunts" class="block py-3">Taunts</RouterLink></li> -->
						</ul>
					</li>
				</UIStack>
			</UIStack>
		</header>
		<UIStack tag="main" direction="col" class="text-primary">
			<RouterView class="flex-grow" />
		</UIStack>
	</UIStack>
</template>
