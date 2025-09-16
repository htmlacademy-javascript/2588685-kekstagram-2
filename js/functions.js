const isMeetingWithinWorkday = (workStart, workEnd, meetingStart, duration) => {
  // Функция для перевода "часы:минуты" в минуты
  const toMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const workStartMinutes = toMinutes(workStart);
  const workEndMinutes = toMinutes(workEnd);
  const meetingStartMinutes = toMinutes(meetingStart);
  const meetingEndMinutes = meetingStartMinutes + duration;

  // Встреча должна начинаться и заканчиваться в пределах рабочего дня
  return meetingStartMinutes >= workStartMinutes && meetingEndMinutes <= workEndMinutes;
};

window.console.log(isMeetingWithinWorkday('08:00', '17:30', '14:00', 90));
window.console.log(isMeetingWithinWorkday('8:0', '10:0', '8:0', 120));
window.console.log(isMeetingWithinWorkday('08:00', '14:30', '14:00', 90));
window.console.log(isMeetingWithinWorkday('14:00', '17:30', '08:0', 90));
window.console.log(isMeetingWithinWorkday('8:00', '17:30', '08:00', 900));
