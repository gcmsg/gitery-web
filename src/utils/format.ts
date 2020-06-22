import { unix, Moment } from 'moment';

export function formatUnixTimestamp(timestamp: number): string {
  const moment: Moment = unix(timestamp);
  const date: string = moment.format('MMMM Do, YYYY');
  const time: string = moment.format('h:mm:ss a');
  return `${date}, ${time}`;
}

export const formatNumber = (value: number, fixedLength: number) => {
  if (!value && value !== 0) return '';
  let num = value;
  if (typeof num !== 'number') {
    num = parseFloat(num);
    if (!num || Number.isNaN(num)) {
      return '';
    }
  }

  const addComma = (integerStr: string) => integerStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const numStr = fixedLength >= 0 && fixedLength <= 8 ? num.toFixed(fixedLength) : `${num}`;
  if (numStr.includes('.')) {
    const numArr = numStr.split('.');
    const decimalStr = numArr[1].replace(/0+$/, '');
    return `${addComma(numArr[0])}${decimalStr ? '.' : ''}${decimalStr}`;
  }
  return addComma(numStr);
};
