<script lang="ts" generics="TData">
	import {
		type GridApi,
		type GridOptions,
		type GridParams,
		type Module,
		createGrid,
		type GridTheme
	} from 'ag-grid-community';

	import { onMount } from 'svelte';
	import { SvelteFrameworkOverrides } from './SvelteFrameworkComponentWrapper.svelte.js';

	interface AgGridComponentProps {
		gridOptions: GridOptions<TData>;
		rowData?: TData[];
		modules?: Module[];
		gridClass?: string;
		sizeColumnsToFit?: boolean;
		theme: GridTheme | undefined;
	}

	let {
		gridOptions,
		rowData,
		modules,
		gridClass,
		theme,
		sizeColumnsToFit = true
	}: AgGridComponentProps = $props();
	let api: GridApi<TData> | undefined = $state(undefined);
	let eGui: HTMLDivElement | undefined = $state();

	const gridParams: GridParams = {
		modules: modules ?? [],
		frameworkOverrides: new SvelteFrameworkOverrides()
	};

	$effect(() => {
		api?.setGridOption('theme', theme);
	});

	$effect(() => {
		if (gridOptions && eGui) {
			api?.setGridOption('rowData', rowData);
			if (sizeColumnsToFit) api?.sizeColumnsToFit();
		}
	});

	onMount(() => {
		api = createGrid(eGui!, gridOptions, gridParams);

		return () => {
			api?.destroy();
		};
	});
</script>

<div style="height: 100%;" bind:this={eGui} class={gridClass ?? 'ag-theme-quartz'}></div>
