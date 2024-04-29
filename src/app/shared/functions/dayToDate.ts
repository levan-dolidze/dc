


export function getCalendarEndDate(days: number, start:Date):Date {

    console.log(days)
    console.log(start)
    const toDate = new Date(start) 
    const futureDate = new Date(toDate.getTime());
    futureDate.setDate(futureDate.getDate() + days);
    const formattedDate = futureDate.toLocaleDateString('en-US', { timeZone: 'UTC' });
    return  new Date(formattedDate) ;
}

// const startDate = new Date(start)
// console.log(startDate)
// startDate.setDate(startDate.getDate() + days);
// const formattedDate = startDate.toLocaleDateString('en-US', { timeZone: 'UTC' });
// return  new Date(formattedDate) ;