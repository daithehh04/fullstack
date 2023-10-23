export function datePicker(date) {
  flatpickr(date, {
      enableTime: true, 
      minDate: "today",
      dateFormat: "d-m-Y H:i"
  });
}