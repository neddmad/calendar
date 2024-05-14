import React, { Component } from 'react';
import styles from './Calendar.module.css'
import { format, addMonths, subMonths, startOfMonth,  eachDayOfInterval, lastDayOfMonth, startOfWeek, lastDayOfWeek, isSameMonth } from 'date-fns'


class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
          date: new Date()
        }
      }
      addMonth = () => {
        this.setState({
          date: addMonths(this.state.date, 1)
        })
      }
      subMonth = () => {
        this.setState({
          date: subMonths(this.state.date, 1)
        })
      }
    render() {
        const {date} = this.state;
        const formattedYear = format(date, 'yyyy'); 
        const formattedMonth = format(date, 'MMMM');
        const startMonth = startOfMonth(date);
        const finishMonth = lastDayOfMonth(date);
        const week = eachDayOfInterval({start: startOfWeek(startMonth), end:lastDayOfWeek(finishMonth)})
        const daysOfWeek = eachDayOfInterval({start:startOfWeek(date), end: lastDayOfWeek(date)})
        const mappedDaysOfWeek = daysOfWeek.map((week,index) => (<span key={index} className={index === 0 ? styles.firstDayOfWeek : styles.otherDaysOfWeek}>{format(week, 'EEEEE')}</span>))
        const indexesToSelect = [0, 7, 14, 21, 28, 35];
        const daysInMonth = week.map((week,index) => (<span key={index} style={{color: !isSameMonth(date,week)? "white" : ''}} className={indexesToSelect.includes(index)?styles.redLine: ''}>{format(week, 'd')}</span>))
        return (
            <div className={styles.calendar}>
              <div className={styles.yearAndMonth}>
                <h1>{formattedMonth}</h1>
                <h1 className={styles.year}>{formattedYear}</h1>
                </div>
                <div className={styles.dayOfWeek}>
                {mappedDaysOfWeek}
                </div>
                <h3></h3>
                <div className={styles.interval}>
                {daysInMonth}
                </div>
                <h3></h3>
                <button onClick={this.subMonth}>{"<"}</button>
                <button onClick={this.addMonth}>{">"}</button>
            </div>
        );
    }
}

export default Calendar;


