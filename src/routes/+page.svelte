<script lang="ts">
	import 'ag-grid-community/styles/ag-grid.css';
	import 'ag-grid-community/styles/ag-theme-quartz.css';
	import AgGridComponent from '$lib/AgGridComponent.svelte';
	import { type GridOptions, type Module, ClientSideRowModelModule } from 'ag-grid-community';

	interface Car {
		make: string;
		model: string;
		price: number;
	}

	let rowData: Car[] = $state([
		{ make: 'Toyota', model: 'Celica', price: 35000 },
		{ make: 'Ford', model: 'Mondeo', price: 32000 },
		{ make: 'Porsche', model: 'Boxster', price: 72000 }
	]);
	let gridOptions: GridOptions<Car> = $state({
		rowData: [
			{ make: 'Toyota', model: 'Celica', price: 35000 },
			{ make: 'Ford', model: 'Mondeo', price: 32000 },
			{ make: 'Porsche', model: 'Boxster', price: 72000 }
		],
		columnDefs: [{ field: 'make' }, { field: 'model' }, { field: 'price' }],
		getRowId: (params) => params.data.make,
		domLayout: 'autoHeight'
	});

	setInterval(() => {
		rowData = [
			{ make: 'Toyota', model: 'Celica', price: 35000 },
			{ make: 'Ford', model: 'Mondeo', price: 32000 },
			{ make: 'Porsche', model: 'Boxster', price: rowData[2].price + 1 }
		];
	}, 200);

	const modules: Module[] = [ClientSideRowModelModule];
</script>

<div>
	<AgGridComponent bind:gridOptions {rowData} {modules} gridClass="ag-theme-quartz" />
</div>
