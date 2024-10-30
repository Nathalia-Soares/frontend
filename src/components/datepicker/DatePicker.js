// DatePicker.js
import React, { useState, useEffect } from 'react';
import './datepicker.css';


const DatePicker = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [calendarVisible, setCalendarVisible] = useState(false);
    const [daysInMonth, setDaysInMonth] = useState([]);
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    useEffect(() => {
        renderCalendar();
    }, [currentMonth, currentYear]);

    const renderCalendar = () => {
        const days = [];
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();

        for (let i = 0; i < firstDay; i++) {
            days.push(<td key={`empty-${i}`}></td>);
        }

        for (let day = 1; day <= totalDays; day++) {
            days.push(
                <td key={day} onClick={() => handleDateClick(day)}>
                    {day}
                </td>
            );
        }

        setDaysInMonth(days);
    };

    const handleDateClick = (day) => {
        setSelectedDate(`${day}/${currentMonth + 1}/${currentYear}`);
        setCalendarVisible(false);
    };

    const toggleCalendar = () => {
        setCalendarVisible(!calendarVisible);
    };

    return (
        <div className="datepicker-container">
            <input
                type="text"
                value={selectedDate}
                placeholder="Selecione a data"
                onClick={toggleCalendar}
                readOnly
            />
            {calendarVisible && (
                <div className="calendar">
                    <table>
                        <thead>
                            <tr>
                                <th>Dom</th>
                                <th>Seg</th>
                                <th>Ter</th>
                                <th>Qua</th>
                                <th>Qui</th>
                                <th>Sex</th>
                                <th>Sáb</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>{daysInMonth}</tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default DatePicker;

