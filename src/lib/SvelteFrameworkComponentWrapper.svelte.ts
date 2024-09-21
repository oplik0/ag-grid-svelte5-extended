import { VanillaFrameworkOverrides } from 'ag-grid-community';
import type { SvelteComponent } from 'svelte';

export class SvelteFrameworkOverrides extends VanillaFrameworkOverrides {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	override isFrameworkComponent(comp: any): boolean {
		// HACK: In dev, the component is wrapped in a Svelte Proxy, obscuring the prototype chain.
		// Instead, components are identified by their class name (internally set to Proxy<ComponentName>).
		// In prod, it should be safe to directly check if they extend SvelteComponent.
		return (
			comp?.prototype?.constructor?.name?.startsWith('Proxy<') ||
			Object.prototype.isPrototypeOf.call(SvelteComponent, comp)
		);
	}
}
