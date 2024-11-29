# AG-Grid for Svelte 5

This is a fork of [JohnMaher1/ag-grid-svelte5](https://github.com/JohnMaher1/ag-grid-svelte5) with some improvements to the exported svelte component. 

To use to use ag-grid with a framework you need to create an adaptor that follows this interface: [IFrameworkOverrides](https://github.com/ag-grid/ag-grid/blob/424be7dcadf9b964056ee8c451af9b041ce8877a/packages/ag-grid-community/src/interfaces/iFrameworkOverrides.ts#L7). Ag-grid give no documentation on building a framework integration. This is the adaptor code for svelte 5: [src/lib/SvelteFrameworkOverrides.svelte.ts](src/lib/SvelteFrameworkOverrides.svelte.ts)


## Features

- Fully svelte 5
- **Put any svelte component in a grid cell** (svelte component as a [cell renderer](https://www.ag-grid.com/javascript-data-grid/component-cell-renderer/))
- Reactive data updates (based on $state, just update the data prop supplied to the table)
- Cell editing (nothing extra to do, will just work like updating the data).
- Reactive grid options. Allows, for eg, [programmatic theme updates](https://www.ag-grid.com/javascript-data-grid/theming-api/) (altough maybe better to do this with the css vars ag-grid exposes)

## Installation

```bash
npm install ag-grid-s5
```