import tkinter as tk
from tkinter import ttk

class GroceryListApp:
    def __init__(self, master):
        self.master = master
        master.title("Grocery Shopping List Converter")

        # Sample shopping list data (item, quantity, unit)
        self.shopping_list = [
            ("Apples", 500, "g"),
            ("Bananas", 3, "units"),
            ("Flour", 1000, "g"),
            ("Sugar", 250, "g"),
            ("Milk", 1, "L")
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
            if unit == "g":
                option = tk.StringVar(value=unit)
                ttk.Combobox(self.master, textvariable=option, values=["kg", "lb", "oz", "mg"]).grid(row=i+2, column=1, padx=5, pady=5)
                option.trace_add("write", lambda *args, index=i: self.convert_weight(index))
                self.conversion_options.append(option)
            else:
                option = tk.StringVar(value=unit)
                ttk.Combobox(self.master, textvariable=option, values=[unit]).grid(row=i+2, column=1, padx=5, pady=5)
                option.trace_add("write", lambda *args, index=i: self.convert_weight(index))
                self.conversion_options.append(option)

    def convert_weight(self, index):
        item, qty, unit = self.shopping_list[index]
        selected_unit = self.conversion_options[index].get()

        if selected_unit == "kg":
            qty = qty / 1000
        elif selected_unit == "lb":
            qty = qty * 0.00220462
        elif selected_unit == "oz":
            qty = qty * 0.035274
        elif selected_unit == "mg":
            qty = qty * 1000

        self.converted_list.delete(index)
        self.converted_list.insert(index, f"{item} - {qty:.2f} {selected_unit}")

root = tk.Tk()
app = GroceryListApp(root)
root.mainloop()