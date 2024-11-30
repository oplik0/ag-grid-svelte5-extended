<div>
    <div class="my-4 flex w-full items-center justify-center">
        <h1 class="text-2xl font-bold">AG-Grid for Svelte 5 Demo</h1>
        <a
            class="ml-8"
            href="https://github.com/bn-l/ag-grid-svelte5-extended"
            target="_blank"
        >
            <GithubLogo />
        </a>
    </div>
    <div class="flex w-full justify-center">
        <input
            class="form-input"
            bind:value={quickFilterText}
            placeholder="Search..."
        />
    </div>
    <div class="flex w-full justify-center">
        <div class="m-10 w-3/4 max-w-[65rem]">
            <AgGrid {initialOptions} {rowData} {modules} {quickFilterText} />
        </div>
    </div>
    <!-- <button
        onclick={() =>
            (selectedTheme = selectedTheme === myTheme ? myTheme2 : myTheme)}
        >Change Theme</button
    > -->
</div>

<script lang="ts">
    import { AgGrid, makeSvelteCellRenderer } from "$lib";
    import { onMount } from "svelte";
    import {
        type GridOptions,
        type ColDef,
        type Module,
    } from "@ag-grid-community/core";
    import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
    import { themeQuartz } from "@ag-grid-community/theming";
    import { faker } from "@faker-js/faker";
    import BoldCell from "./BoldCell.svelte";
    import GithubLogo from "./GithubLogo.svelte";

    let quickFilterText = $state(undefined);

    interface PaymentRow {
        id: string;
        fromName: string;
        toName: string;
        amount: number;
        method: "stripe" | "paypal" | "wise";
        sentAt: Date;
        confirmedSent: boolean;
    }
    const paymentMethods = ["stripe", "paypal", "wise"] as const;
    function generatePaymentRow(): PaymentRow {
        return {
            id: faker.string.uuid(),
            fromName: faker.person.fullName(),
            toName: faker.person.fullName(),
            amount: faker.number.float({
                min: 10,
                max: 200,
                fractionDigits: 2,
            }),
            method: faker.helpers.arrayElement(paymentMethods),
            sentAt: faker.date.recent({ days: 10 }),
            confirmedSent: faker.datatype.boolean(),
        };
    }
    let rowData: PaymentRow[] = $state(
        Array.from({ length: 100 }, generatePaymentRow),
    );

    // prettier-ignore
    let initialOptions: GridOptions<PaymentRow> = $state< GridOptions<PaymentRow>>({
        defaultColDef: {
            enableCellChangeFlash: true,
            suppressMovable: true,
            // autoHeight: true,
        },
        columnDefs: [
            { field: "id", hide: true },
            {
                field: "fromName",
                cellRenderer: makeSvelteCellRenderer(BoldCell),
            },
            {
                field: "toName",
                headerName: "To (double click to edit)",
                filter: true,
                floatingFilter: true,
                filterParams: {
                    debounceMs: 200,
                },
                editable: true,
            },
            {
                field: "amount",
                valueFormatter: (params) => `$${params.value.toFixed(2)}`,
            },
            {
                field: "method",
                editable: true,
                cellEditor: "agSelectCellEditor",
                cellEditorParams: {
                    values: paymentMethods,
                },
            },
            { field: "sentAt" },
            { field: "confirmedSent" },
        ],
        // Important for reducing dom updates and improving performance
        getRowId: (params) => params.data.id.toString(),

        domLayout: "autoHeight",
        theme: themeQuartz,
        autoSizeStrategy: { 
            type: "fitCellContents"
        },
        // animateRows: false,
        loadThemeGoogleFonts: false, 
        // cellFlashDuration: 100,
        // cellFadeDuration: 300,
        pagination: true,
        paginationPageSize: 10,
        // paginationAutoPageSize: true,
    });

    onMount(() => {
        const interval = setInterval(() => {
            // rowData.push(generatePaymentRow());

            const indicesToUpdate = Array.from({ length: 50 }, () =>
                Math.floor(Math.random() * rowData.length),
            );
            indicesToUpdate.forEach((index) => {
                const field = faker.helpers.arrayElement([
                    "amount",
                    "fromName",
                    "sentAt",
                ]);
                const updatedRow = { ...rowData[index] };
                switch (field) {
                    case "amount":
                        updatedRow.amount = faker.number.float({
                            min: 10,
                            max: 200,
                            fractionDigits: 2,
                        });
                        break;
                    case "fromName":
                        updatedRow.fromName = faker.person.fullName();
                        break;
                    case "sentAt":
                        updatedRow.sentAt = faker.date.recent({ days: 10 });
                        break;
                }
                rowData[index] = updatedRow;
            });
        }, 1600);

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
