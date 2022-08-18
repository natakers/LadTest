let str = `Старший братец ПОНЕДЕЛЬНИК –
работяга, не бездельник.
Он неделю открывает
всех трудиться зазывает.

ВТОРНИК следует за братом
у него идей богато.

А потом СРЕДА-сестрица,
не пристало ей лениться.

Брат ЧЕТВЕРГ и так, и сяк,
он мечтательный чудак.

ПЯТНИЦА-сестра сумела
побыстрей закончить дело.

Предпоследний брат СУББОТА
не выходит на работу.

В гости ходит ВОСКРЕСЕНЬЕ,
очень любит угощенье
`;

const WEEK = {
  'ПОНЕДЕЛЬНИК': 'MONDAY',
  'ВТОРНИК': 'TUESDAY',
  'СРЕДА': 'WEDNESDAY',
  'ЧЕТВЕРГ': 'THURSDAY',
  'ПЯТНИЦА': 'FRIDAY',
  'СУББОТА': 'SATURDAY',
  'ВОСКРЕСЕНЬЕ': 'SUNDAY'
}
function daysTranslate(str) {
  for (let key in WEEK) {
    let re = new RegExp (key, 'gi')
    str = str.replace(re, WEEK[key])
  }
return str
}
console.log(daysTranslate(str))