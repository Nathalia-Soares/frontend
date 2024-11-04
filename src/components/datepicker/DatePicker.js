// DatePicker.js
import React, { useState, useEffect, useCallback } from 'react';
import './datepicker.css';

const DatePicker = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [calendarVisible, setCalendarVisible] = useState(false);
    const [daysInMonth, setDaysInMonth] = useState([]);
    const [currentMonth] = useState(new Date().getMonth());
    const [currentYear] = useState(new Date().getFullYear());

    const renderCalendar = useCallback(() => {
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
    }, [currentMonth, currentYear]);

    useEffect(() => {
        renderCalendar();
    }, [currentMonth, currentYear, renderCalendar]);

    const handleDateClick = (day) => {
        setSelectedDate(`${currentYear}-${currentMonth + 1}-${day}`);
        setCalendarVisible(false);
    };

    return (
        <div className="datepicker">
            <input
                type="text"
                value={selectedDate}
                onFocus={() => setCalendarVisible(true)}
                readOnly
            />
            {calendarVisible && (
                <table>
                    <tbody>
                        <tr>{daysInMonth}</tr>
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default DatePicker;