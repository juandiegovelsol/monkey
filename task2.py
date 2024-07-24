import tkinter as tk
from tkinter import filedialog, scrolledtext, messagebox
from textblob import TextBlob
from language_tool_python import LanguageTool


class SpellCheckerModule:
    """Perform spell checking and grammar checking.

    Attributes:
        spell_check (TextBlob): A TextBlob instance for spell checking.
        grammar_check (LanguageTool): A LanguageTool instance for grammar checking.
    """

    def __init__(self):
        """Initialize SpellCheckerModule."""
        self.spell_check = TextBlob("")
        self.grammar_check = LanguageTool('en-US')

    def correct_spell(self, text):
        """Perform spell checking on the input text.

        Args:
            text (str): The text to perform spell checking on.

        Returns:
            str: The corrected text with spelling errors corrected.
        """
        words = text.split()
        corrected_words = []
        for word in words:
            corrected_word = str(TextBlob(word).correct())
            corrected_words.append(corrected_word)
        return " ".join(corrected_words)

    def correct_grammar(self, text):
        """Perform grammar checking on the input text.

        Args:
            text (str): The text to perform grammar checking on.

        Returns:
            tuple: A tuple containing a list of grammar mistakes found and the total number of mistakes.
        """
        matches = self.grammar_check.check(text)
        found_mistakes = [mistake.message for mistake in matches]
        found_mistakes_count = len(found_mistakes)
        return found_mistakes, found_mistakes_count


class SpellCheckerApp:
    """GUI application for spell and grammar checking using SpellCheckerModule.

    Attributes:
        root (tk.Tk): The main Tkinter window.
        spell_checker (SpellCheckerModule): An instance of SpellCheckerModule for spell and grammar checking.
    """

    def __init__(self, root):
        """Initialize SpellCheckerApp.

        Args:
            root (tk.Tk): The main Tkinter window.
        """
        self.root = root
        self.root.title("Spell and Grammar Checker")

        self.spell_checker = SpellCheckerModule()

        self.create_widgets()

    def create_widgets(self):
        """Create and configure the GUI widgets for the application."""
        # Text area for displaying results
        self.result_text = scrolledtext.ScrolledText(self.root, width=60, height=10, wrap=tk.WORD)
        self.result_text.pack(pady=10)

        # Button to open file
        self.open_file_button = tk.Button(self.root, text="Open File", command=self.open_file)
        self.open_file_button.pack()

        # Check button to start checking
        self.check_button = tk.Button(self.root, text="Check Text", command=self.check_text, state=tk.DISABLED)
        self.check_button.pack()

    def open_file(self):
        """Open a file dialog to select and open a text file."""
        file_path = filedialog.askopenfilename(filetypes=[("Text files", "*.txt")])
        if file_path:
            try:
                with open(file_path, 'r') as file:
                    content = file.read()
                self.result_text.delete("1.0", tk.END)
                self.result_text.insert(tk.END, content)
                self.check_button.config(state=tk.NORMAL)
            except Exception as e:
                messagebox.showerror("Error", f"Failed to open file: {str(e)}")

    def check_text(self):
        """Perform spell and grammar checking."""
        input_text = self.result_text.get("1.0", tk.END)

        # Spell check
        corrected_text = self.spell_checker.correct_spell(input_text)

        # Grammar check
        grammar_mistakes, num_mistakes = self.spell_checker.correct_grammar(input_text)

        # Display results
        self.result_text.delete("1.0", tk.END)
        self.result_text.insert(tk.END, f"Corrected Spellings:\n{corrected_text}\n\n")
        self.result_text.insert(tk.END, f"Grammar Mistakes Found ({num_mistakes}):\n")
        for mistake in grammar_mistakes:
            self.result_text.insert(tk.END, f"- {mistake}\n")


if __name__ == "__main__":
    root = tk.Tk()
    app = SpellCheckerApp(root)
    root.mainloop()