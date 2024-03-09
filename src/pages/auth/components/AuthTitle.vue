<template>
	<div class="auth-title">
		<h1>{{ title }}</h1>
		<p>{{ text }}</p>
	</div>
</template>

<script setup>
defineProps({
	title: {
		type: String,
	},
	text: {
		type: String,
	},
})
</script>

<style
	lang="scss"
	scoped
	src="@/assets/scss/components/auth/authTitle.scss"
></style>
