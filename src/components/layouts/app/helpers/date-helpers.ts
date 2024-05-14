export const daysOfTheWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
export const monthsOfTheYear = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "October",
  "September",
  "November",
  "December",
];
export const daysOfTheWeekAbbr = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
export const monthsOfTheYearAbbr = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

export const fromNowNames = [
  "Tomorrow",
  "In 1 Business Day",
  "In 2 Business Days",
  "In 3 Business Days",
  "In a Week",
  "In a Month",
];

type ParsePropTypes = [string | undefined, "local" | "date-input" | undefined, boolean | undefined];
type ParseArgs = [
  string | undefined,
  "local" | "date-input" | boolean | undefined,
  boolean | undefined
];
type MonthConfigProps = {
  index: number;
  name: string;
  abbr: string;
};
type TimeConfigProps = {
  hours: number;
  minutes: number;
};
type DateConfig = {
  year: number;
  date: number;
  month: MonthConfigProps;
  time: TimeConfigProps;
};
type FromNowOption = {
  name: string;
  date: Date;
  config: DateConfig;
};

export default class DateHelper extends Date {
  type: string;
  date: Date;
  constructor(dateOrString: string | Date, { type = "" } = {}) {
    super(dateOrString);
    this.type = type;
    this.date =
      typeof dateOrString === "string"
        ? (DateHelper.parseDate(dateOrString, true) as Date)
        : dateOrString;
  }
  static parseDate(...args: Partial<ParseArgs>) {
    const [arg1, arg2, arg3] = args;
    const typeOptions = ["local", "date-input"];
    let [dateString, type, asDate] = [undefined, undefined, undefined] as ParsePropTypes;

    if (!args.length) return "";
    if (typeof arg1 === "string") dateString = arg1;
    if (arg2 && typeof arg2 === "boolean") asDate = arg2;
    else if (arg2 && typeof arg2 !== "boolean" && typeOptions.includes(arg2)) type = arg2;
    else type = undefined;

    if (!type && arg2 && typeof arg2 === "boolean") asDate = arg2;
    else if (type && arg3 && [true, false].includes(arg3)) asDate = arg3;

    if (!dateString) return "";

    try {
      const regEx = new RegExp(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
      const replacer = (_match: string, month: string, day: string, year: string) => {
        const newMonth = month?.length === 1 ? 0 + month : month;
        const newDay = day?.length === 1 ? 0 + day : day;
        return [year, newMonth, newDay].join("-");
      };
      if (!type && typeof dateString === "string") {
        const newDate = new Date(this.parse(dateString));
        return asDate ? newDate : newDate.toLocaleDateString();
      }
      if (type === "local") return dateString.replace(regEx, replacer);
      if (type === "date-input")
        return new Date(dateString.replace(/(\d{4})-(\d{2})-(\d{2})/, "$2/$3/$1"));
      return dateString;
    } catch (error: unknown) {
      if (error instanceof Error) {
        switch (error.name) {
          case "Error":
            // eslint-disable-next-line no-console
            console.error(
              `is generic error, maybe try passing (${dateString}, 'local | date-input')`
            );
            return new Date();
          case "TypeError":
            // eslint-disable-next-line no-console
            console.error(`TypeError Caught try passing (${dateString}, 'local')`);
            return new Date();
          default:
            // eslint-disable-next-line no-console
            console.error("oops");
            return "";
        }
      }
      return "";
    }
  }
  static getWeekDays(type?: "full" | "abbr" | "initial") {
    if (type === "abbr") return daysOfTheWeekAbbr;
    if (type === "initial") return daysOfTheWeek.map((day) => day[0]);
    return daysOfTheWeek;
  }
  static getMonthsOfYear(type?: "full" | "abbr") {
    if (type === "abbr") return monthsOfTheYearAbbr;
    return monthsOfTheYear;
  }
  static dateAttrs(this: Date) {
    // console.log('call');
    return [
      this.getFullYear(),
      this.getMonth(),
      this.getDate(),
      this.getHours(),
      this.getMinutes(),
      this.getDay(),
    ];
  }
  static makeOptionName(optionIndex: number, weekDayIndex: number) {
    const dayOfWeek = daysOfTheWeek[weekDayIndex];
    const nameDescription = fromNowNames[optionIndex];
    return `${nameDescription} (${dayOfWeek})`;
  }
  static makeOption(dateIntegers: number[], name: string, date: Date): FromNowOption {
    const [year, month, calendarDate, hours, minutes] = dateIntegers;
    const monthConfig = {
      index: month,
      name: monthsOfTheYear[month],
      abbr: monthsOfTheYearAbbr[month],
    };
    const timeConfig = {
      hours,
      minutes,
    };
    const config = {
      year,
      date: calendarDate,
      month: monthConfig,
      time: timeConfig,
    };

    return { name, date, config };
  }
  static getFromNowOptions(beginDate: Date) {
    const businessDays = [1, 2, 3, 4, 5];
    const datesArray: FromNowOption[] = [];

    const [beginYear, beginMM, beginDD, beginHrs, beginMins] = DateHelper.dateAttrs.call(beginDate);
    const tomorrow = new Date(beginYear, beginMM, beginDD + 1, beginHrs, beginMins);
    const tomorrowDay = tomorrow.getDay();
    let tomorrowDescription = "Tomorrow";

    if (tomorrowDay === 0) tomorrow.setDate(tomorrow.getDate() + 1);
    if (tomorrowDay === 6) tomorrow.setDate(tomorrow.getDate() + 2);
    if ([0, 6].includes(tomorrowDay)) tomorrowDescription = "Next Business Day";

    const tomorrowIntegers = DateHelper.dateAttrs.call(tomorrow);
    const [tmwYear, tmwMM, tmwDD, tmwHrs, tmwMins] = tomorrowIntegers;
    datesArray.push(DateHelper.makeOption(tomorrowIntegers, tomorrowDescription, tomorrow));

    let days = 1;
    for (let dateNum = tmwDD; datesArray.length < 4; dateNum++) {
      const currentDate = new Date(tmwYear, tmwMM, tmwDD + days, tmwHrs, tmwMins);

      const currentWeekDay = currentDate.getDay();
      if (businessDays.includes(currentWeekDay)) {
        const newOptionName = DateHelper.makeOptionName(datesArray.length, currentWeekDay);
        const currentDateIntegers = DateHelper.dateAttrs.call(currentDate);
        const option = DateHelper.makeOption(currentDateIntegers, newOptionName, currentDate);
        datesArray.push(option);
      }

      days += 1;
    }

    const inOneWeek = new Date(beginYear, beginMM, beginDD + 7, beginHrs, beginMins);
    if (inOneWeek.getDay() === 0) inOneWeek.setDate(inOneWeek.getDate() + 1);
    if (inOneWeek.getDay() === 6) inOneWeek.setDate(inOneWeek.getDate() + 2);

    const inOneWeekIntegers = DateHelper.dateAttrs.call(inOneWeek);
    const inOneWeekOptionName = DateHelper.makeOptionName(datesArray.length, inOneWeekIntegers[5]);
    const inOneWeekOption = DateHelper.makeOption(
      inOneWeekIntegers,
      inOneWeekOptionName,
      inOneWeek
    );
    datesArray.push(inOneWeekOption);

    const inOneMonth = new Date(beginYear, beginMM + 1, beginDD, beginHrs, beginMins);
    if (inOneMonth.getDay() === 0) inOneMonth.setDate(inOneMonth.getDate() + 1);
    if (inOneMonth.getDay() === 6) inOneMonth.setDate(inOneMonth.getDate() + 2);

    const inOneMonthIntegers = DateHelper.dateAttrs.call(inOneMonth);
    const inOneMonthOptionName = DateHelper.makeOptionName(datesArray.length, inOneWeekIntegers[5]);
    const inOneMonthOption = DateHelper.makeOption(
      inOneMonthIntegers,
      inOneMonthOptionName,
      inOneMonth
    );
    datesArray.push(inOneMonthOption);

    return datesArray;
  }
  static getDefaultMinutes(date: Date) {
    const [, , , , minutes] = DateHelper.dateAttrs.call(date);
    const isNextHour = Math.ceil(minutes / 15) * 15 === 60;
    return isNextHour || minutes === 0 ? 0 : Math.ceil(minutes / 15) * 15;
  }
  static getDefaultHours(date: Date) {
    const [, , , hours, minutes] = DateHelper.dateAttrs.call(date);

    const isNextHour = Math.ceil(minutes / 15) * 15 === 60;
    const hourHand = isNextHour ? hours + 1 : hours;
    return hourHand;
  }
  static defaultTime(date: Date) {
    const [, , , hours, minutes] = DateHelper.dateAttrs.call(date);

    const isNextHour = Math.ceil(minutes / 15) * 15 === 60;
    const hourHand = (isNextHour ? hours + 1 : hours) % 12;
    return `${hourHand === 0 ? "12" : hourHand}:${
      isNextHour || minutes === 0 ? "00" : Math.ceil(minutes / 15) * 15
    } ${hours > 12 ? "PM" : "AM"}`;
  }
  static getDefaultTimeSlot(minDate: Date | null) {
    return {
      am: true,
      hours: minDate ? DateHelper.getDefaultHours(minDate) : DateHelper.getDefaultHours(new Date()),
      minutes: minDate
        ? DateHelper.getDefaultMinutes(minDate)
        : DateHelper.getDefaultMinutes(new Date()),
      time: minDate ? DateHelper.defaultTime(minDate) : DateHelper.defaultTime(new Date()),
    };
  }
  static getTimeSlots() {
    const slots = [];
    const steps = 15;
    const date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    for (let hours = 0; hours < 24; hours++) {
      const newDate = new Date(date.setHours(hours));
      for (let minutes = 0; minutes < 60; minutes += steps) {
        const displayDate = new Date(newDate.setMinutes(minutes));
        let displayHours = displayDate.getHours() % 12;
        let displayMinutes: string | number = displayDate.getMinutes();
        displayHours = displayHours ? displayHours : 12;
        displayMinutes = displayMinutes < 9 ? "0" + displayMinutes : displayMinutes;

        const time = `${displayHours}:${displayMinutes} ${hours < 12 ? "AM" : "PM"}`;
        slots.push({ time, hours, minutes, am: hours < 12 });
      }
    }
    return slots;
  }
  static outOfRange(
    hours: number,
    minutes: number,
    selectedDate: Date | null,
    minDate: Date | null
  ) {
    if (selectedDate && minDate) {
      const selected = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        hours,
        minutes
      ).getTime();

      const min = new Date(minDate).getTime();
      return min > selected;
    }
    if (!selectedDate && minDate) {
      const hoursLess = minDate.getHours() > hours;
      const minutesAndOurs = minDate.getHours() >= hours && minDate.getMinutes() >= minutes;
      return hoursLess || minutesAndOurs;
    }
    return false;
  }
  getTwelveHourTime() {
    const TwentyFourHours = this.getHours();
    const helperMinutes = this.getMinutes() >= 10 ? this.getMinutes() : "0" + this.getMinutes();
    const helperAmOrPm = TwentyFourHours >= 12 ? "PM" : "AM";
    const helperHours = TwentyFourHours >= 13 ? TwentyFourHours - 12 : TwentyFourHours;
    const helperTime = helperHours + ":" + helperMinutes + " " + helperAmOrPm;
    return helperTime;
  }
  getMonthOfYear(abbr = false) {
    return abbr ? monthsOfTheYearAbbr[this.getMonth()] : monthsOfTheYear[this.getMonth()];
  }
  getDayOfTheWeek(abbr = false) {
    return abbr ? daysOfTheWeekAbbr[this.getDay()] : daysOfTheWeek[this.getDay()];
  }
  getDisplayDate() {
    const helperTime = this.getTwelveHourTime();
    const helperDayOfWeek = this.getDayOfTheWeek(true);
    const helperMonthOfYear = this.getMonthOfYear(true);
    return helperDayOfWeek + " " + helperMonthOfYear + " " + helperTime;
  }
}
