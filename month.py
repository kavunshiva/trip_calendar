import calendar

class Month(calendar.Calendar):
    def __init__(self, year, month):
        self._firstweekday = calendar.SUNDAY
        self.year = year
        self.month = month
        self.dates = {}
        self.dates_list = []
        self.get_dates()
        self.weeks_list = self.get_weeks_list()

    def get_dates(self):
        for date in self.itermonthdates(self.year, self.month):
            if date.month == self.month:
                date_object = { 'date': date }
                self.dates[date] = date_object
                self.dates_list.append(date_object)

    def get_weeks_list(self):
        weeks = []
        first_weekday = (self.dates_list[0]['date'].weekday() + 1) % 7
        week = [[] for _ in range(first_weekday)]
        for date in self.dates_list:
            weekday = (date['date'].weekday() + 1) % 7
            if week and not weekday:
                weeks.append(week)
                week = [[] for _ in range(weekday)]
            week.append(date)
        weeks.append(week)
        return weeks
