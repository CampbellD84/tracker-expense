import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import { deleteExpense, getAllExpensesQueryOptions } from "@/lib/api";

export default function ExpenseDeleteButton({ id }: { id: number }) {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: deleteExpense,
		onError() {
			toast("Error", {
				description: `Failed to delete expense: ${id}`,
			});
		},
		onSuccess() {
			toast("Expense Deleted", {
				description: `Successfully deleted expense: ${id}`,
			});

			queryClient.setQueryData(
				getAllExpensesQueryOptions.queryKey,
				(existingExpenses) => ({
					...existingExpenses,
					expenses: existingExpenses!.expenses.filter((e) => e.id !== id),
				}),
			);
		},
	});
	return (
		<Button
			disabled={mutation.isPending}
			onClick={() => mutation.mutate({ id })}
			variant="outline"
			size="icon"
		>
			{mutation.isPending ? "..." : <Trash className="h-4 w-4" />}
		</Button>
	);
}
