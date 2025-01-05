import { renderComponent } from '$lib/components/ui/data-table';
import type { ColumnDef } from '@tanstack/table-core';
import DataTableActions from './data-table-actions.svelte'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Deployment = {
	id: number;
	name: string;
	source: string;
	destination: string;
	type: "compose";
};

export const columns: ColumnDef<Deployment>[] = [
	{
		accessorKey: "name",
		header: "Deployment",
	},
	{
		accessorKey: "source",
		header: "Source",
	},
	{
		accessorKey: "destination",
		header: "Destination",
	},
	{
		id: "actions",
		cell: ({ row }) => {
			return renderComponent(DataTableActions, { id: row.original.id })
		}
	}
];
