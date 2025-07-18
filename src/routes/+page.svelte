<div>
    <div class="flex w-full flex-col items-center justify-center">
        <div class="my-4 flex w-full flex-wrap items-center justify-center">
            <h1 class="text-2xl font-bold">AG-Grid for Svelte 5 Demo</h1>
            <a
                class="ml-8"
                href="https://github.com/bn-l/ag-grid-svelte5-extended"
                target="_blank"
            >
                <GithubLogo />
            </a>
            <div class="flex w-screen items-center justify-center md:w-auto">
                <button
                    class="mt-5 rounded-md border-2 border-lime-200 bg-lime-300 px-2 py-1 font-bold text-lime-900 uppercase shadow-lg shadow-lime-100 md:mt-0 md:ml-14"
                    onclick={() => {
                        gridOptions.animateRows = false;
                        gridOptions.cellFlashDuration = 20;
                        gridOptions.cellFadeDuration = 50;
                        period = 50;
                    }}
                >
                    Faster
                </button>
            </div>
        </div>

        <!-- search + sparkline -->
        <div
            class="md:md-2 mb-0 flex w-full flex-col items-center justify-center md:mt-6 md:w-[90vw] md:flex-row md:flex-wrap"
        >
            <div class="mb-4 flex md:mt-2 md:mr-12">
                <input
                    class="form-input"
                    bind:value={quickFilterText}
                    placeholder="Search..."
                />
            </div>

            <div class="mb-6 w-[80vw] md:mb-0 md:h-[20vh] md:w-auto">
                <!-- <h2 class="text-center text-lg font-bold"> -->

                <div class="mb-3 md:w-60">
                    Also check out
                    <a
                        href="https://github.com/bn-l/sparkline-svelte"
                        class="text-lg font-bold whitespace-nowrap text-blue-500"
                    >
                        sparkline-svelte
                    </a>
                    to add a small chart to cells
                </div>

                <!-- </h2> -->
                <div class="h-[8vh] w-[80vw] md:w-60">
                    <Sparkline
                        data={sparklineData}
                        options={{ interactive: true }}
                    />
                </div>
            </div>
        </div>

        <div class="w-screen md:m-2 md:w-[90vw] md:max-w-260">
            <AgGrid {gridOptions} {rowData} {modules} {quickFilterText} />
        </div>
    </div>
</div>

<script lang="ts">
    import { AgGrid, makeSvelteCellRenderer } from "$lib";
    import { onMount } from "svelte";
    import {
        type GridOptions,
        type ColDef,
        type Module,
        ClientSideRowModelModule,
        themeQuartz,
    } from "ag-grid-community";
    import { faker } from "@faker-js/faker";
    import BoldCell from "./BoldCell.svelte";
    import GithubLogo from "./GithubLogo.svelte";
    import { Sparkline } from "sparkline-svelte";

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
    let gridOptions: GridOptions<PaymentRow> = $state<GridOptions<PaymentRow>>({
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
                sort: "desc"
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
            { 
                field: "confirmedSent", 
                maxWidth: 100, 
                cellClass: "flex justify-center items-center"
            },
        ],
        // Important for reducing dom updates and improving performance
        getRowId: (params) => params.data.id.toString(),

        domLayout: "autoHeight",
        theme: themeQuartz.withParams({
            accentColor: "#EE28ED",
        }),
        autoSizeStrategy: { 
            type: "fitCellContents"
        },
        // animateRows: false,
        loadThemeGoogleFonts: false, 
        // cellFlashDuration: 100,
        // cellFadeDuration: 300,
        pagination: true,
        paginationPageSizeSelector: [10, 25, 50, 100],
        paginationPageSize: 10,
        // paginationAutoPageSize: true,
    });

    let period = $state(1600);

    $effect(() => {
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

            gridOptions.theme = themeQuartz.withParams({
                accentColor: `#${Math.floor(Math.random() * 16777215)
                    .toString(16)
                    .padStart(6, "0")}`,
            });
        }, period);
        return () => clearInterval(interval);
    });

    const modules: Module[] = [ClientSideRowModelModule];

    let sparklineData = Array.from({ length: 20 }, () =>
        faker.number.float({ min: 10, max: 200, fractionDigits: 2 }),
    );
</script>
