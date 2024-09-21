<script lang="ts" generics="TData">
	import {
		type GridApi,
		type GridOptions,
		type GridParams,
		type Module,
		createGrid
	} from 'ag-grid-community';
	import { onMount } from 'svelte';
	import { SvelteFrameworkOverrides } from './SvelteFrameworkComponentWrapper.svelte.js';

	interface AgGridComponentProps {
		gridOptions: GridOptions;
		rowData?: TData[];
		modules?: Module[];
		gridClass?: string;
		sizeColumnsToFit?: boolean;
	}

	let {
		gridOptions = $bindable(),
		rowData,
		modules,
		gridClass,
		sizeColumnsToFit = true
	}: AgGridComponentProps = $props();
	let api: GridApi<TData> | undefined = $state(undefined);
	let eGui: HTMLDivElement | undefined = $state();

	const gridParams: GridParams = {
		modules: modules ?? [],
		frameworkOverrides: new SvelteFrameworkOverrides()
	};

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
