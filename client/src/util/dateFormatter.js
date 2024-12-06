const dateFormatter = (dateString) => {
    const date = new Date(dateString);
    // Get the month name
    const options = { month: 'short' }; // 'short' gives abbreviated month name
    const month = new Intl.DateTimeFormat('en-US', options).format(date);

    // Format the day and year
    const day = date.getDate();
    const year = date.getFullYear();

    // Combine into the desired format
    return `${month} - ${day} ${year}`;
}

export default dateFormatter