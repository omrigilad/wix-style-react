import styles from './Calendar.scss';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import DayPicker, {DateUtils} from 'react-day-picker/DayPicker';
import addMonths from 'date-fns/add_months';
import parse from 'date-fns/parse';
import startOfMonth from 'date-fns/start_of_month';

import WixComponent from '../BaseComponents/WixComponent';
import localeUtilsFactory from '../LocaleUtils';
import DatePickerHead from './DatePickerHead';

export default class Calendar extends WixComponent {
  static displayName = 'Calendar';

  static defaultProps = {
    locale: 'en',
    filterDate: () => true,
    shouldCloseOnSelect: true,
    rtl: false
  };

  state = {
    value: this.props.value,
    range: {
      from: this.props.value,
      to: this.props.endValue
    }
  }

  // TODO: Change to getDerivedStateFromProps with React ^16.0.0
  componentWillReceiveProps(nextProps) {
    this.setState({value: nextProps.value});
  }

  _setValue = value => this.setState({value});

  _handleDayClick = (clickedValue, modifiers = {}) => {
    if (this.props.range) {
      const {from, to} = this.state.range;
      const isRangeSelected = from && to;
      const range = {
        from: isRangeSelected ? null : from,
        to: isRangeSelected ? null : to
      };
      const nextRange = DateUtils.addDayToRange(clickedValue, range);
      this.setState({
        range: DateUtils.addDayToRange(clickedValue, range)
      }, () => {
        if (this.props.onChange && nextRange.from && nextRange.to) {
          this.props.onChange(nextRange.from, nextRange.to, modifiers);
        }
      });
    } else {
      this.props.onChange(clickedValue, modifiers);
    }
    this.props.shouldCloseOnSelect && this.props.onClose();
  };

  _handleDayMouseEnter = hoveredValue => {
    const {from} = this.state.range;
    if (from) {
      this.setState({
        range: DateUtils.addDayToRange(hoveredValue, this.state.range)
      });
    }
  };

  _createDayPickerProps = () => {
    const {
      range,
      locale,
      showMonthDropdown,
      showYearDropdown,
      filterDate,
      excludePastDates,
      value: propsValue,
      rtl,
      twoMonths
    } = this.props;

    const value = this.state.value || propsValue;
    const localeUtils = localeUtilsFactory(locale);

    const captionElement = (
      <DatePickerHead
        {...{
          date: value,
          showYearDropdown,
          showMonthDropdown,
          localeUtils,
          rtl,
          onChange: this._setValue,
          onLeftArrowClick: () => this._setValue(startOfMonth(addMonths(value, -1))),
          onRightArrowClick: () => this._setValue(startOfMonth(addMonths(value, 1)))
        }}
        />
    );

    const disabledDays = excludePastDates ? {before: new Date()} : date => !filterDate(date);

    return {
      disabledDays: range ? {before: this.state.range.from} : disabledDays,
      initialMonth: value,
      initialYear: value,
      month: value,
      year: value,
      firstDayOfWeek: 1,
      locale: typeof locale === 'string' ? locale : '',
      fixedWeeks: true,
      onKeyDown: this._handleKeyDown,
      onDayClick: this._handleDayClick,
      localeUtils,
      navbarElement: () => null,
      captionElement,
      onDayMouseEnter: this._handleDayMouseEnter,
      onDayKeyDown: this._handleDayKeyDown,
      selectedDays: range ? [this.state.range.from, {from: this.state.range.from, to: this.state.range.to}] : parse(propsValue),
      modifiers: {
        start: this.state.range.from,
        end: this.state.range.to
      },
      numberOfMonths: twoMonths ? 2 : 1,
      className: twoMonths ? 'DayPicker--TwoMonths' : ''
    };
  };

  _handleKeyDown = event => {
    const keyHandler = this.keyHandlers[event.keyCode];

    keyHandler && keyHandler();
  };

  keyHandlers = {
    // escape
    27: this.props.onClose,

    // tab
    9: this.props.onClose
  };

  _focusSelectedDay = dayPickerRef => {
    if (dayPickerRef) {
      this.dayPickerRef = dayPickerRef;
      const selectedDay = this.dayPickerRef.dayPicker.querySelector('.DayPicker-Day--selected');

      if (selectedDay) {
        selectedDay.classList.add('DayPicker-Day--unfocused');
        selectedDay.focus();
      }
    }
  };

  _handleDayKeyDown = () => {
    const unfocusedDay = this.dayPickerRef.dayPicker.querySelector('.DayPicker-Day--unfocused');

    if (unfocusedDay) {
      unfocusedDay.classList.remove('DayPicker-Day--unfocused');
    }
  };

  render() {
    return (
      <div className={classNames(styles.calendar, {[styles.range]: this.props.range})}>
        <DayPicker ref={this._focusSelectedDay} {...this._createDayPickerProps()}/>
      </div>
    );
  }
}

Calendar.propTypes = {
  /** Use 2 months layout */
  /* twoMonths: PropTypes.bool, */

  /** Enable ability to select date range */
  range: PropTypes.bool,

  /** Callback function called whenever the user selects a day in the calendar */
  onChange: PropTypes.func.isRequired,

  /** Callback function called whenever user press escape or click outside of the element */
  onClose: PropTypes.func,

  /** Past dates are unselectable */
  excludePastDates: PropTypes.bool,

  /** Only the truthy dates are selectable */
  filterDate: PropTypes.func,

  /** RTL mode */
  rtl: PropTypes.bool,

  /** The selected date for common calendar and start of range for calendar with range */
  value: PropTypes.object,

  /** Not used for common calendar and end of range for calendar with range */
  endValue: PropTypes.object,

  /** Display a selectable yearDropdown */
  showYearDropdown: PropTypes.bool,

  /** Display a selectable monthDropdown */
  showMonthDropdown: PropTypes.bool,

  /** should the calendar close on day selection */
  shouldCloseOnSelect: PropTypes.bool,

  /** DatePicker instance locale */
  locale: PropTypes.oneOfType([
    PropTypes.oneOf([
      'en',
      'es',
      'pt',
      'fr',
      'de',
      'pl',
      'it',
      'ru',
      'ja',
      'ko',
      'tr',
      'sv',
      'no',
      'nl',
      'da'
    ]),
    PropTypes.shape({
      distanceInWords: PropTypes.object,
      format: PropTypes.object
    })
  ])
};