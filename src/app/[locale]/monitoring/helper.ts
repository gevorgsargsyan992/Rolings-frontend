export const formattedDateWithWeek = (date: string, showWeek: boolean = true) => {
  const formattedDate = new Date(date);

  const monthAbbreviation = formattedDate.toLocaleString('default', { month: 'short' });
  const year = formattedDate.getFullYear();

  const startOfMonth = new Date(formattedDate.getFullYear(), formattedDate.getMonth(), 1);
  const weekNumber = Math.ceil((formattedDate.getDate() + startOfMonth.getDay()) / 7);

  return `${year}. ${monthAbbreviation}. ${showWeek ? `Week ${weekNumber}` : ''}`;
}
