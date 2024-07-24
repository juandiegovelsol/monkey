"""
This script generates a dynamic map.

for navigation and sets a reminder to return to a destination.

It uses the folium library for map
visualization and integrates a reminder system
based on the current time.

Sources:
- Folium documentation: https://github.com/python-visualization/folium
- Python datetime module
documentation:https://docs.python.org/3/
library/datetime.html
"""

import folium
import webbrowser
from datetime import datetime, timedelta
import time


def generate_map(latitude, longitude, destination):
    """Generate a folium map centered around the destination coordinates."""
    map_obj = folium.Map(location=[latitude, longitude], zoom_start=15)

    folium.Marker(
        [latitude, longitude],
        popup=destination,
        icon=folium.Icon(color='red')
    ).add_to(map_obj)

    return map_obj


def set_reminder(arrival_time):
    """Set a reminder to return to the destination after 1 hour."""
    return_time = arrival_time + timedelta(hours=1)

    while True:
        current_time = datetime.now()
        if current_time >= return_time:
            print("Reminder: It's time to return to your destination!")
            break
        time.sleep(60)


def main():
    """Generate the map and set the reminder."""
    destination_latitude = 37.7749
    destination_longitude = -122.4194
    destination_name = "San Francisco, CA"

    map_obj = generate_map(
      destination_latitude, destination_longitude, destination_name)

    map_filename = "destination_map.html"
    map_obj.save(map_filename)
    webbrowser.open('file://' + map_filename)

    arrival_time = datetime.now()
    print(f"You arrived at {arrival_time.strftime('%H:%M:%S')}.")

    set_reminder(arrival_time)


if __name__ == "__main__":
    main()