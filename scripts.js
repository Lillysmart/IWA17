const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
];

const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

const createArray = (length) => {
    const result = [];
    for (let i =1; i <= length; i++) {
        result.push(i);
    }
    return result;
}

const createData = () => {
    const current = new Date();
    const startDay = current.getDay();
    console.log (startDay)
    const daysInMonth = getDaysInMonth(current);
    console.log (daysInMonth)
    const weeks = createArray();
    const days = createArray();
    const result = [];

    let currentWeek = 0;

    for (let dayIndex = 0; dayIndex < daysInMonth; dayIndex++) {
        const day = ( dayIndex -startDay) -1;
        const isValid = day > 0 && day <= daysInMonth;

        if (!result[currentWeek]) {
            result[currentWeek] = {
                weeks: currentWeek + 1,
                days: [],
            };
        }

        result[currentWeek].days.push({
            dayOfWeek: (dayIndex + startDay) % 7, // Adjust day of the week index
            value: isValid ? day : '',
        });

        if ((dayIndex + startDay) %7 === 6) {
            currentWeek++;
        }
    }

    return result;
}

const addCell = (classString, value) => {
    return /* html */ `
        <td class="${classString}">
            &nbsp;${value}&nbsp;
        </td>
    `;
}

const createHtml = (data) => {
    let result = '';

    for (const { weeks, days } of data) {
        let inner = "";
        inner += addCell('table__cell table__cell_sidebar', `Week ${weeks}`);

        for (const { dayOfWeek, value } of days) {
            const isToday = new Date().getDate() === value;
            const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
            const isAlternate = weeks % 2 === 0;

            let classString = 'table__cell';

            if (isToday) {
                classString += ' table__cell_today';
            }

            if (dayOfWeek === 0 || dayOfWeek === 6) {
                classString += ' table__cell_weekend';
            }

            if (isAlternate) {
                classString += ' table__cell_alternate';
            }

            inner += addCell(classString, value);
        }

        result += `<tr>${inner}</tr>`;
    }

    return result;
}

const current = new Date();
document.querySelector('[data-title]').innerText = `${MONTHS[current.getMonth()]} ${current.getFullYear()}`;

const data = createData();
document.querySelector('[data-content]').innerHTML = createHtml(data);
