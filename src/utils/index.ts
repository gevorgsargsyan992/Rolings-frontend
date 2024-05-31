export const formattedDate = (date: string) => {
    const formattedDate = new Date(date);
    const monthAbbreviation = formattedDate.toLocaleString('default', { month: 'short' });
    const day = formattedDate.getDate();
    const year = formattedDate.getFullYear();

    return `${monthAbbreviation}. ${day}, ${year}`;
}
