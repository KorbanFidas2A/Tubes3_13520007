function string_to_date(date) {
  const regex1 = /([A-Za-z]+)\s+(\d{1,2})\s+(\d{4})/;
  const regex2 = /(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})/;
  const regex3 = /(\d{1,2})\/(\d{1,2})\/(\d{4})/;
  const regex4 = /(\d{4})\/(\d{1,2})\/(\d{1,2})/;

  if (regex1.test(date)) {
    const res = date.match(regex1);
    const month = month_to_index(res[1]);
    const day = res[2].padStart(2, 0);
    const year = res[3];
    return `${year}-${month}-${day}`;
  } else if (regex2.test(date)) {
    const res = date.match(regex2);
    const day = res[1].padStart(2, 0);
    const month = month_to_index(res[2]);
    const year = res[3];
    return `${year}-${month}-${day}`;
  } else if (regex3.test(date)) {
    const res = date.match(regex3);
    const month = res[2].padStart(2, 0);
    const day = res[1].padStart(2, 0);
    const year = res[3];
    return `${year}-${month}-${day}`;
  } else if (regex4.test(date)) {
    const res = date.match(regex4);
    const month = res[2].padStart(2, 0);
    const day = res[3].padStart(2, 0);
    const year = res[1];
    return `${year}-${month}-${day}`;
  } else {
    return null;
  }
}

function month_to_index(month) {
  if(month == "Januari"){
    return 01;
  }else if(month == "Februari"){
    return 02;
  }else if(month == "Maret"){
    return 03;
  }else if(month == "April"){
    return 04;
  }else if(month == "Mei"){
    return 05;
  }else if(month == "Juni"){
    return 06;
  }else if(month == "Juli"){
    return 07;
  }else if(month == "Agustus"){
    return 08;
  }else if(month == "September"){
    return 09;
  }else if(month == "Oktober"){
    return 10;
  }else if(month == "November"){
    return 11;
  }else if(month == "Desember"){
    return 12;
  }
}

function month_to_string(index) {
  if(index == 1){
    return "Januari";
  }else if(index == 2){
    return "Februari";
  }else if(index == 3){
    return "Maret";
  }else if(index == 4){
    return "April";
  }else if(index == 5){
    return "Mei"
  }else if(index == 6){
    return "Juni";
  }else if(index == 7){
    return "Juli";
  }else if(index == 8){
    return "Agustus";
  }else if(index == 9){
    return "September";
  }else if(index == 10){
    return "Oktober";
  }else if(index == 11){
    return "November";
  }else if(index == 12){
    return "Desember";
  }
}

function date_to_string(date) {
  return `${date.getDate()} ${month_to_string(
    date.getMonth()
  )} ${date.getFullYear()}`;
}

module.exports = { month_to_index, string_to_date, date_to_string };
