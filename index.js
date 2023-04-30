// Your code here
function createEmployeeRecord(employeeInfo){
    return {
        firstName: employeeInfo[0],
        familyName: employeeInfo[1],
        title: employeeInfo[2],
        payPerHour: employeeInfo[3],
        timeInEvents: [],
        timeOutEvents: []
    };
};

function createEmployeeRecords(employeeRecord){
    return employeeRecord.map(employeeInfo => {return createEmployeeRecord(employeeInfo)});
};

function createTimeInEvent(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ');
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    });
    return employee;
};

function createTimeOutEvent(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ');
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    });
    return employee;
};

function hoursWorkedOnDate(employee, targetDate){
    let clockIn = employee.timeInEvents.find(e => e.date === targetDate);
    let clockOut = employee.timeOutEvents.find(e => e.date === targetDate);
    return (clockOut.hour - clockIn.hour) / 100;
};

function wagesEarnedOnDate(employee, targetDate){
    let wage = hoursWorkedOnDate(employee, targetDate) * employee.payPerHour
    return wage;
}

function allWagesFor(employee){
    let daysWorked = employee.timeInEvents.map(e => e.date);
    let daysPaid = daysWorked.reduce((accum, element) => accum + wagesEarnedOnDate(employee, element), 0)
    return daysPaid;
};

function calculatePayroll(employeeRecord){
    return employeeRecord.reduce((accum, element) => accum + allWagesFor(element), 0);
};