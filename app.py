from flask import Flask, g, request, render_template, jsonify
from datetime import datetime, timedelta
from month import Month
import json
from csv import DictReader
import random

app = Flask(__name__)

@app.route('/calendar', methods=['GET'])
def calendar():
    return render_template('calendar.html')

@app.route('/api/calendar-months', methods=['POST'])
def create_calendar_months():
    place_colors = []
    months = []
    date = start_date()
    month = Month(start_date().year, start_date().month)
    for time_slot in schedule():
        place = time_slot['place']
        color = f'#{random.randint(0, 0xFFFFFF):06x}'
        for _ in range(time_slot['duration']):
            if date not in month.dates:
                months.append({'name': month.name, 'weeks': month.weeks_list})
                new_year = month.year + (month.month + 1) // 13
                new_month = month.month % 12 + 1
                month = Month(new_year, new_month)

            month.dates[date]['place'] = place
            month.dates[date]['color'] = color
            place_color = { 'place': place, 'color': color }
            if place_color not in place_colors:
                place_colors.append(place_color)
            date += timedelta(1)
    months.append({'name': month.name, 'weeks': month.weeks_list})
    return jsonify({'placeColors': place_colors, 'months': months})

def start_date():
    if 'start_date' not in g:
        g.start_date = datetime \
            .strptime(request.form.get('startDate'), '%Y-%m-%d') \
            .date()

    return g.start_date

def schedule():
    schedule_file = request.files.get('schedule')
    content_type = schedule_file.content_type
    content = schedule_file.read().decode('UTF-8')
    if (content_type == 'application/json'):
        return json.loads(content)
    elif (content_type == 'text/csv'):
        rows = [row for row in DictReader(content.splitlines())]
        for row in rows:
            row['duration'] = int(row['duration'])
        return rows

def start_date_month():
    if 'start_date_month' not in g:
        g.start_date_month = start_date().strftime('%B')

    return g.start_date_month

def start_date_year():
    if 'start_date_year' not in g:
        g.start_date_year = start_date().strftime('%Y')
    return g.start_date_year

def first_of_start_date_month():
    return start_date().replace(day=1)

if __name__ == '__main__':
    app.run(host='0.0.0.0')
