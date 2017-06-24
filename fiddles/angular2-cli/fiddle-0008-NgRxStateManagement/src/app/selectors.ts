export const partyModel = () => {
  return state => state
    .map(([people, filter]) => {
      return {
        total: people.length,
        people: people.filter(filter),
        attending: people.filter(person => person.attending).length,
        guests: people.reduce((acc, curr) => acc + curr.guests, 0)
      }
    })
};

export const attendees = () => {
  return state => state
    .map(s => s.people)
    .distinctUntilChanged();
};

export const percentAttending = () => {
  return state => state
  //build on previous selectors
    .let(attendees())
    .map(p => {
      const totalAttending = p.filter(person => person.attending).length;
      const total = p.length;
      return total > 0 ? (totalAttending / total) * 100 : 0;
    });
};
