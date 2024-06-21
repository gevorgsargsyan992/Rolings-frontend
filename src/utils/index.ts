export const formattedDate = (date: string) => {
    const formattedDate = new Date(date);
    const monthAbbreviation = formattedDate.toLocaleString('default', { month: 'short' });
    const day = formattedDate.getDate();
    const year = formattedDate.getFullYear();
    const time = formattedDate.toLocaleTimeString('default', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false, // 24-hour format
    });

    return `${monthAbbreviation}. ${day}, ${year}, ${time}`;
}
