import { Injectable } from "@angular/core"
import { NativeDateAdapter } from "@angular/material/core";

export const minutesToMillis = 60 * 1000
export const dayInMillis = 24 * 60 * minutesToMillis

export const APP_DATE_FORMATS =
{
    parse: {
        dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
    },
    display: {
        dateInput: 'input',
        monthYearLabel: { year: 'numeric', month: 'numeric' },
        dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
        monthYearA11yLabel: { year: 'numeric', month: 'long' },
    }
}

const WEEKDAY_NAMES = [
    "vasárnap",
    "hétfő",
    "kedd",
    "szerda",
    "csütörtök",
    "péntek",
    "szombat"
]

const MONTH_NAMES = [
    "január",
    "február",
    "március",
    "április",
    "május",
    "június",
    "július",
    "augusztus",
    "szeptember",
    "október",
    "november",
    "december"
]

@Injectable()
export class MagyarDateAdapter extends NativeDateAdapter {

    override format(date: Date, displayFormat: Object): string {
        return formatHungarianFullDate(date)
    }

    // override parse(value: any): Date | null {
    //     const date = moment(value, APP_DATE_FORMAT);
    //     return date.isValid() ? date.toDate() : null;
    // }
}

export function formatHungarianFullDate(date: Date): string {
    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()
    const weekday = date.getDay()

    return `${year}. ${MONTH_NAMES[month]} ${day}. ${WEEKDAY_NAMES[weekday]}.`;
}

export function formatHungarianDate(date: Date): string {
    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()

    return `${year}. ${MONTH_NAMES[month]} ${day}.`;
}

export function formatHungarianWeekday(date: Date): string {
    return WEEKDAY_NAMES[date.getDay()]
}

export function formatHungarianTime(date: Date): string {
    const hours = date.getHours()
    const minutes = date.getMinutes()

    const amPm = hours < 12 ? 'délelőtt' : 'délután'
    const minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`

    const perc = minutes > 0 ? ` ${minutes} perc` : ''
    return `${amPm} ${hours} óra${perc}`
}

export function formatHungarianDateTime(date: Date): string {
    return `${formatHungarianFullDate(date)} ${formatHungarianTime(date)}`;
}
