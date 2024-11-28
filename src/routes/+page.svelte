<div>
    <AgGrid {initialOptions} {rowData} {modules} />
    <!-- <button
        onclick={() =>
            (selectedTheme = selectedTheme === myTheme ? myTheme2 : myTheme)}
        >Change Theme</button
    > -->
</div>

<script lang="ts">
    import AgGrid from "$lib/AgGrid.svelte";
    import { onMount } from "svelte";
    import {
        type GridOptions,
        type ColDef,
        type Module,
    } from "@ag-grid-community/core";
    import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
    import { themeQuartz } from "@ag-grid-community/theming";
    interface Car {
        make: string;
        model: string;
        price: number;
        id: number;
    }

    let rowData: Car[] = $state([
        { id: 1, make: "Toyota", model: "Celica", price: 35000 },
        { id: 2, make: "Ford", model: "Mondeo", price: 32000 },
        { id: 3, make: "Porsche", model: "Boxster", price: 72000 },
    ]);

    let columnDefs: ColDef<Car>[] = $state([
        { field: "id" },
        { field: "make" },
        { field: "model" },
        { field: "price" },
    ]);

    let initialOptions: GridOptions<Car> = $state({
        columnDefs,
        // Important for reducing dom updates and improving performance
        getRowId: (params) => params.data.id.toString(),
        domLayout: "autoHeight",
        theme: themeQuartz,
        loadThemeGoogleFonts: false,
    });

    onMount(() => {
        const interval = setInterval(() => {
            rowData = [
                { id: 1, make: "Toyota", model: "Celica", price: 35000 },
                { id: 2, make: "Ford", model: "Mondeo", price: 32000 },
                {
                    id: 3,
                    make: "Porsche",
                    model: "Boxster",
                    price: rowData[2].price + 1,
                },
            ];
        }, 200);
        return () => clearInterval(interval);
    });

    const modules: Module[] = [ClientSideRowModelModule];

    // to use myTheme in an application, pass it to the theme grid option
    const myTheme = themeQuartz.withParams({
        accentColor: "#EE28ED",
        backgroundColor: "#1f2836",
        browserColorScheme: "dark",
        chromeBackgroundColor: {
            ref: "foregroundColor",
            mix: 0.07,
            onto: "backgroundColor",
        },
        foregroundColor: "#FFF",
        headerFontSize: 14,
    });

    const myTheme2 = themeQuartz.withParams({
        accentColor: "#33E34B",
        backgroundColor: "#EC111C",
        browserColorScheme: "dark",
        chromeBackgroundColor: {
            ref: "foregroundColor",
            mix: 0.07,
            onto: "backgroundColor",
        },
        foregroundColor: "#FFF",
        headerFontSize: 14,
    });

    // let selectedTheme = $state(myTheme);

    // $inspect(selectedTheme);
</script>
