import tkinter as tk
from tkinter import ttk

# Conversion factors
KG_TO_LB = 2.20462
KG_TO_OZ = 35.274
KG_TO_MG = 1000000

class GroceryListApp:
    def __init__(self, master):
        self.master = master
        master.title("Grocery Shopping List Converter")

        # Sample shopping list data (item, quantity, unit)
        self.shopping_list = [
            ("Apples", 2, "kg"),
            ("Apples", 3, "kg"),
            ("Flour", 1.5, "lb"),
            ("Sugar", 500, "g"),
            ("Chocolate", 200, "mg")
        ]

        self.create_widgets()

    def create_widgets(self):
        # Original list (left side)
        ttk.Label(self.master, text="Original List").grid(row=0, column=0, padx=5, pady=5)
        self.original_list = tk.Listbox(self.master, width=30)
        for item, qty, unit in self.shopping_list:
            self.original_list.insert(tk.END, f"{item} - {qty} {unit}")
        self.original_list.grid(row=1, column=0, padx=5, pady=5)

        # Converted list (right side)
        ttk.Label(self.master, text="Converted List").grid(row=0, column=1, padx=5, pady=5)
        self.converted_list = tk.Listbox(self.master, width=40)
        self.converted_list.grid(row=1, column=1, padx=5, pady=5)

        # Conversion options (dropdowns)
        self.conversion_options = []
        for i, (item, qty, unit) in enumerate(self.shopping_list):
            ttk.Label(self.master, text=item).grid(row=i+2, column=0, padx=5, pady=5)
            option = tk.StringVar(value=unit)
            ttk.Combobox(self.master, textvariable=option, values=["kg", "lb", "oz", "mg"]).grid(row=i+2, column=1, padx=5, pady=5)
            option.trace_add("write", lambda *args, index=i: self.convert_item(index))
            self.conversion_options.append(option)

    def convert_item(self, index):
        item, qty, original_unit = self.shopping_list[index]
        selected_unit = self.conversion_options[index].get()

        if original_unit == selected_unit:
            converted_qty = qty
        elif original_unit == "kg":
            if selected_unit == "lb":
                converted_qty = qty * KG_TO_LB
            elif selected_unit == "oz":
                converted_qty = qty * KG_TO_OZ
            elif selected_unit == "mg":
                converted_qty = qty * KG_TO_MG
        # Add more conversion logic for other original units (lb, oz, mg)

        self.converted_list.delete(index)
        self.converted_list.insert(index, f"{item} - {converted_qty:.2f} {selected_unit}")

root = tk.Tk()
app = GroceryListApp(root)
root.mainloop()