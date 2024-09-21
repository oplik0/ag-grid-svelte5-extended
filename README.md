# ag-grid-svelte-5

A Svelte component for integrating AG Grid with Svelte 5

## Installation

```bash
npm install ag-grid-svelte5
```

## Example Usage

```svelte

// Imports

// Styles (Required to be passed, default is quartz but you still need to import them first in the parent)
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

// Default Import
import AgGridSvlete5Component from 'ag-grid-svelte5';

interface Car {
	make: string;
	model: string;
	price: number;
	id: number;
}

let rowData: Car[] = $state([
	{ id: 1, make: 'Toyota', model: 'Celica', price: 35000 },
	{ id: 2, make: 'Ford', model: 'Mondeo', price: 32000 },
	{ id: 3, make: 'Porsche', model: 'Boxster', price: 72000 }
]);

let gridOptions: GridOptions<Car> = $state({
	columnDefs: [{ field: 'id' }, { field: 'make' }, { field: 'model' }, { field: 'price' }],
	// Important for reducing dom updates and improving performance
	getRowId: (params) => params.data.id.toString(),
	domLayout: 'autoHeight'
});

setInterval(() => {
	rowData = [
		{ id: 1, make: 'Ford', model: 'Mondeo', price: 32000 },
		{ id: 2, make: 'Toyota', model: 'Celica', price: 35000 },
		{ id: 3, make: 'Porsche', model: 'Boxster', price: rowData[2].price + 1 }
	];
}, 200);

	const modules: Module[] = [ClientSideRowModelModule];
</script>

<div>
	<AgGridSvlete5Component bind:gridOptions {rowData} {modules} gridClass="ag-theme-quartz" />
</div>
```
