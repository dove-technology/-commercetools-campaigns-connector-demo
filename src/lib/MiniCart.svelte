<script lang="ts">
	import { setCart, getCartState } from '$lib/Cart.svelte';
	import { onMount } from 'svelte';

	const cartState = getCartState();

	let count = $derived(
		cartState.cart?.lineItems.reduce((acc, item) => acc + item.quantity, 0) ?? 0
	);

	onMount(async () => {
		if (!cartState.cartSet) {
			const response = await fetch('/api/cart');

			if (response.ok) {
				setCart((await response.json()).cart);
			}
		}
	});
</script>

<div class="ml-4 flow-root lg:ml-6">
	<a href="/cart" class="group -m-2 flex items-center p-2">
		<svg
			class="size-6 shrink-0 text-gray-400 group-hover:text-gray-500"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			aria-hidden="true"
			data-slot="icon"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
			/>
		</svg>
		<span class="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800"
			>{cartState.cartSet ? count : '-'}</span
		>
		<span class="sr-only">items in cart, view bag</span>
	</a>
</div>
