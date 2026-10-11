export function getStatusClassName(status: string): string {
  switch (status) {
    case 'completed':
      return 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400';
    case 'confirmed':
    case 'accepted':
      return 'bg-blue-500/10 text-blue-700 dark:text-blue-400';
    case 'in_progress':
      return 'bg-primary/10 text-primary';
    case 'cancelled':
    case 'no_show':
      return 'bg-destructive/10 text-destructive';
    case 'awaiting_approval':
    case 'pending':
    case 'waiting_parts':
    default:
      return 'bg-muted text-muted-foreground';
  }
}
