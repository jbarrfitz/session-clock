/** Pretty print the time (in seconds) */
export const displayTime = (time: number) => {
  let date = new Date(0);

  const padNumber = (num: number) => {
    return num.toString().length < 2 ? `0${num}` : num.toString();
  }

  date.setHours(0)
  date.setMinutes(0)
  date.setSeconds(time);

  return [
    padNumber(date.getHours()),
    padNumber(date.getMinutes()),
    padNumber(date.getSeconds())
  ].join(':')
};
