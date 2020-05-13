import { Injectable } from '@angular/core';
// import { FarmModule } from './farm.module';

@Injectable({
  providedIn: 'root',
})
export class CalcAgeService {
  now: Date = new Date(); // ?
  days: number = null;
  months: number = null;
  years: number = null;
  constructor() { }
  calcAge(dob) {
    // dateString 'MM/dd/YYYY'
    if(dob === null || dob === undefined) {return null}

    const dateOfBirth = new Date(dob);
    const now = new Date();

    this.years = this.now.getFullYear() - dateOfBirth.getFullYear();
    this.months = now.getMonth() - dateOfBirth.getMonth();

    if (this.years < 0) {
      this.years = 0;
    } else {
      this.years = this.now.getFullYear() - dateOfBirth.getFullYear();
    }

    if (this.months < 0) {
      this.months = now.getMonth() + 12 - dateOfBirth.getMonth();
      this.years = this.years - 1;
    } else {
      this.months = now.getMonth() - dateOfBirth.getMonth();
    }

    this.days = now.getDate() - dateOfBirth.getDate();
    if (this.days < 0) {
      let monthsNumber = dateOfBirth.getMonth();
      let daysNumber = this.getFullDate(monthsNumber);

      this.days = now.getDate() + daysNumber - dateOfBirth.getDate();
      this.months = this.months - 1;
    }

    // console.warn(now.getMonth());
    // console.warn(dateOfBirth.getMonth());
    // console.warn(this.years);
    // console.warn(this.months);
    // console.warn(this.days);
    return  {
      d: this.days,
      m: this.months,
      y: this.years
    }
  }

  getFullDate(numberOfMonth) {
    switch (numberOfMonth) {
      case 0:
        return 31;
        break;
      case 1:
        return 28;
        break;
      case 2:
        return 31;
        break;
      case 3:
        return 30;
        break;
      case 4:
        return 31;
        break;
      case 5:
        return 30;
        break;
      case 6:
        return 31;
        break;
      case 7:
        return 31;
        break;
      case 8:
        return 30;
        break;
      case 9:
        return 31;
        break;
      case 10:
        return 30;
        break;
      case 11:
        return 31;
    }
  }

}
