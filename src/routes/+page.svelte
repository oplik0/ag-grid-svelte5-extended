<script lang="ts">
	import 'ag-grid-community/styles/ag-grid.css';
	import 'ag-grid-community/styles/ag-theme-alpine.css';
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
		columnDefs: [{ field: 'make' }, { field: 'model' }, { field: 'price' }]
	});

	setInterval(() => {
		rowData = [
			{ make: 'Toyota', model: 'Celica', price: 35000 },
			{ make: 'Ford', model: 'Mondeo', price: 32000 },
			{ make: 'Porsche', model: 'Boxster', price: rowData[2].price + 1 }
		];
	}, 2000);

	//const modules: Module[] = [ClientSideRowModelModule];

	function onGridReady() {}
</script>

<div style:height="500px" style:width="500px" class="ag-theme-alpine">
	<AgGridComponent bind:gridOptions {rowData} />
</div>
