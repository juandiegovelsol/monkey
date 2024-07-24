import sys
from PyQt6.QtCore import Qt, QRegularExpression
from PyQt6.QtGui import QFont, QColor, QSyntaxHighlighter, QTextCharFormat, QTextCursor
from PyQt6.QtWidgets import (QApplication, QMainWindow, QTextEdit, QFileDialog,
                             QVBoxLayout, QHBoxLayout, QWidget, QPushButton,
                             QLabel, QLineEdit)


class PythonHighlighter(QSyntaxHighlighter):
    """Syntax highlighter for the Python language."""

    def __init__(self, parent=None):
        """Initialize the syntax highlighter."""
        super().__init__(parent)
        self.highlighting_rules = []

        keyword_format = QTextCharFormat()
        keyword_format.setForeground(QColor("blue"))
        keyword_format.setFontWeight(QFont.Weight.Bold)
        keywords = ["import", "for", "while", "in", "if", "else"]
        for word in keywords:
            pattern = QRegularExpression(r'\b' + word + r'\b')
            self.highlighting_rules.append((pattern, keyword_format))

        string_format = QTextCharFormat()
        string_format.setForeground(QColor("green"))
        self.highlighting_rules.append(
            (QRegularExpression("\".*\""), string_format))
        self.highlighting_rules.append(
            (QRegularExpression("\'.*\'"), string_format))

        comment_format = QTextCharFormat()
        comment_format.setForeground(QColor("red"))
        self.highlighting_rules.append(
            (QRegularExpression("#.*"), comment_format))

    def highlightBlock(self, text):
        """Apply syntax highlighting to the given block of text."""
        for pattern, format in self.highlighting_rules:
            matches = pattern.globalMatch(text)
            while matches.hasNext():
                match = matches.next()
                self.setFormat(match.capturedStart(),
                               match.capturedLength(), format)


class TextEditor(QMainWindow):
    """Main window class for the text editor application."""

    def __init__(self):
        """Initialize the text editor window."""
        super().__init__()
        self.initUI()

    def initUI(self):
        """Set up the user interface."""
        self.setWindowTitle("Python Text Editor")
        self.setGeometry(100, 100, 800, 600)

        self.text_edit = QTextEdit()
        self.text_edit.setFont(QFont("Courier", 11))
        self.highlighter = PythonHighlighter(self.text_edit.document())

        # File operations
        file_toolbar = self.addToolBar("File")
        file_toolbar.addAction("Open", self.open_file)
        file_toolbar.addAction("Save", self.save_file)

        # Find and Replace
        find_replace_widget = QWidget()
        find_replace_layout = QHBoxLayout()

        self.find_input = QLineEdit()
        self.replace_input = QLineEdit()
        find_button = QPushButton("Find")
        replace_button = QPushButton("Replace")

        find_replace_layout.addWidget(QLabel("Find:"))
        find_replace_layout.addWidget(self.find_input)
        find_replace_layout.addWidget(QLabel("Replace:"))
        find_replace_layout.addWidget(self.replace_input)
        find_replace_layout.addWidget(find_button)
        find_replace_layout.addWidget(replace_button)

        find_replace_widget.setLayout(find_replace_layout)

        main_layout = QVBoxLayout()
        main_layout.addWidget(self.text_edit)
        main_layout.addWidget(find_replace_widget)

        central_widget = QWidget()
        central_widget.setLayout(main_layout)
        self.setCentralWidget(central_widget)

        find_button.clicked.connect(self.find_text)
        replace_button.clicked.connect(self.replace_text)

    def open_file(self):
        """Open a file and load its content into the editor."""
        filename, _ = QFileDialog.getOpenFileName(
            self, "Open File", "", "Python Files (*.py);;All Files (*)")
        if filename:
            with open(filename, 'r') as file:
                self.text_edit.setText(file.read())

    def save_file(self):
        """Save the current content of the editor to a file."""
        filename, _ = QFileDialog.getSaveFileName(
            self, "Save File", "", "Python Files (*.py);;All Files (*)")
        if filename:
            with open(filename, 'w') as file:
                file.write(self.text_edit.toPlainText())

    def find_text(self):
        """Find the next occurrence of the search text in the editor."""
        text = self.find_input.text()
        if text:
            cursor = self.text_edit.document().find(text)
            if not cursor.isNull():
                self.text_edit.setTextCursor(cursor)
            else:
                self.text_edit.moveCursor(QTextCursor.MoveOperation.Start)

    def replace_text(self):
        """Replace the current occurrence of the search text with the replacement text."""
        find_text = self.find_input.text()
        replace_text = self.replace_input.text()
        if find_text:
            cursor = self.text_edit.textCursor()
            if cursor.hasSelection() and cursor.selectedText() == find_text:
                cursor.insertText(replace_text)
                self.find_text()  # Find next occurrence
            else:
                self.find_text()


if __name__ == '__main__':
    app = QApplication(sys.argv)
    editor = TextEditor()
    editor.show()
    sys.exit(app.exec())