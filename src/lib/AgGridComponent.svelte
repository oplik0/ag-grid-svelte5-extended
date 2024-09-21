<script lang="ts" generics="TData">
	import {
		type GridApi,
		type GridOptions,
		type GridParams,
		type Module,
		createGrid
	} from 'ag-grid-community';
	import 'ag-grid-community/styles/ag-theme-quartz.css';
	import { onMount } from 'svelte';
	import { SvelteFrameworkOverrides } from './SvelteFrameworkComponentWrapper.svelte.js';

	interface AgGridComponentProps {
		gridOptions: GridOptions;
		rowData?: TData[];
		modules?: Module[];
	}

	let { gridOptions = $bindable(), rowData, modules }: AgGridComponentProps = $props();
	let api: GridApi<TData> | undefined = $state(undefined);
	let eGui: HTMLDivElement | undefined = $state();

	const gridParams: GridParams = {
		modules: modules ?? [],
		frameworkOverrides: new SvelteFrameworkOverrides()
	};

	$effect(() => {
		if (gridOptions && eGui) {
			api?.setGridOption('rowData', rowData);
		}
	});

	onMount(() => {
		api = createGrid(eGui!, gridOptions, gridParams);

		return () => {
			api?.destroy();
		};
	});
</script>

<div style="width: 500px; height: 500px;" bind:this={eGui} class="ag-theme-alpine"></div>
