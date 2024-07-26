import tkinter as tk
from tkinter import ttk

# Conversion factors
SI_TO_US = {
    "meter": 3.28084,
    "kilometer": 0.621371,
    "centimeter": 0.393701,
    "millimeter": 0.0393701,
    "micrometer": 3.937e-5,
    "nanometer": 3.937e-8,
    "decimeter": 3.93701,
    "hectometer": 328.084,
    "dekameter": 32.8084,
    "picometer": 3.937e-11,
}

US_TO_SI = {
    "foot": 0.3048,
    "mile": 1.60934,
    "inch": 0.0254,
    "yard": 0.9144,
    "mil": 2.54e-5,
    "furlong": 201.168,
    "rod": 5.0292,
    "chain": 20.1168,
    "league": 4.82803,
    "fathom": 1.8288,
}

# --- Functions ---
def convert():
    try:
        value = float(input_entry.get().replace(",", "."))
    except ValueError:
        result_label.config(text="Invalid input")
        return

    if conversion_direction.get() == "SI to US":
        from_unit = from_unit_var.get()
        to_unit = to_unit_var.get()
        factor = SI_TO_US[from_unit]
        result = value * factor
    else:
        from_unit = from_unit_var.get()
        to_unit = to_unit_var.get()
        factor = US_TO_SI[from_unit]
        result = value * factor

    result_label.config(text=f"{result:.6f} {to_unit}")

def update_units(*args):
    if conversion_direction.get() == "SI to US":
        from_unit_var.set("meter")
        to_unit_var.set("foot")
        from_unit_label.config(text="SI Unit:")
        to_unit_label.config(text="US Unit:")
    else:
        from_unit_var.set("foot")
        to_unit_var.set("meter")
        from_unit_label.config(text="US Unit:")
        to_unit_label.config(text="SI Unit:")

# --- GUI setup ---
window = tk.Tk()
window.title("Length Unit Converter")

# Conversion direction
conversion_direction = tk.StringVar(value="SI to US")
conversion_switch = ttk.Button(
    window, text="Switch Conversion", command=lambda: conversion_direction.set("US to SI" if conversion_direction.get() == "SI to US" else "SI to US")
)
conversion_switch.grid(row=0, column=0, columnspan=4, pady=10)

# Unit labels
from_unit_label = tk.Label(window, text="SI Unit:")
from_unit_label.grid(row=1, column=0, sticky="w")
to_unit_label = tk.Label(window, text="US Unit:")
to_unit_label.grid(row=1, column=3, sticky="w")

# Unit selection
from_unit_var = tk.StringVar(value="meter")
from_unit_dropdown = ttk.Combobox(window, values=list(SI_TO_US.keys()), variable=from_unit_var)
from_unit_dropdown.grid(row=2, column=0, padx=10)

to_unit_var = tk.StringVar(value="foot")
to_unit_dropdown = ttk.Combobox(window, values=list(US_TO_SI.keys()), variable=to_unit_var)
to_unit_dropdown.grid(row=2, column=3, padx=10)

# Input field
input_label = tk.Label(window, text="Enter value:")
input_label.grid(row=3, column=0, sticky="w")
input_entry = tk.Entry(window)
input_entry.grid(row=3, column=1, columnspan=2, padx=10)

# Convert button
convert_button = ttk.Button(window, text="Convert", command=convert)
convert_button.grid(row=4, column=1, pady=10)

# Result field
result_label = tk.Label(window, text="")
result_label.grid(row=5, column=1, columnspan=2)

# Update units when conversion direction changes
conversion_direction.trace("w", update_units)

window.mainloop()