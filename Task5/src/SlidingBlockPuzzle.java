import java.util.Scanner;

/**
 * Game of sliding block puzzle
 */
public class SlidingBlockPuzzle {
    private static final int SIZE = 3; // Adjust the board size as needed
    private int[][] board;
    private int emptyRow, emptyCol;

    public SlidingBlockPuzzle() {
        board = new int[SIZE][SIZE];
        initializeBoard();
    }

    /**
     * Initialize the board and with every block int it's place and empty block at the end
     * then call shuffleBoard to shuffle blocks
     */
    private void initializeBoard() {
        // Fill the board with numbers from 1 to SIZE*SIZE-1
        int num = 1;
        for (int i = 0; i < SIZE; i++) {
            for (int j = 0; j < SIZE; j++) {
                board[i][j] = num++;
            }
        }

        // Create an empty space
        board[SIZE - 1][SIZE - 1] = 0;
        emptyRow = SIZE - 1;
        emptyCol = SIZE - 1;

        // Shuffle the board
        shuffleBoard();
    }

    /**
     * Shuffle the board, create random move and move the block
     */
    private void shuffleBoard() {
        for (int i = 0; i < 100; i++) { // Adjust the number of shuffles
            int[] move = getRandomMove();
            moveBlock(move[0], move[1], false);
        }
    }

    /**
     * Generate random move, it randomly selects one move from possible 4 moves
     * @return random move
     */
    private int[] getRandomMove() {
        int[][] moves = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};
        int index = (int) (Math.random() * 4);
        return new int[]{emptyRow + moves[index][0], emptyCol + moves[index][1]};
    }

    /**
     * Check if move is valid, check if row and column are within range and emptyBlock is adjacent
     * @param row row of block to move
     * @param col column of block to move
     * @return true if it's a valid move
     */
    private boolean isValidMove(int row, int col) {
        return row >= 0 && row < SIZE && col >= 0 && col < SIZE && isEmptyBlockAdjacent(row, col);
    }

    /**
     * Check if empty block is adjacent to given row and column
     * @param row row of block to move
     * @param col column of block to move
     * @return true if empty block is adjacent (top, right, bottom or left)
     */
    private boolean isEmptyBlockAdjacent(int row, int col) {
        int[][] moves = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};
        for (int[] move : moves) {
            if (row + move[0] == emptyRow && col + move[1] == emptyCol) {
                return true;
            }
        }
        return false;
    }

    /**
     * Move block if it's valid move, block will be moved to empty block and given row and column will be empty
     * @param row row of block to move
     * @param col column of block to move
     * @param print if true error message will be printed if move cannot be made
     */
    private void moveBlock(int row, int col, boolean print) {
        if (!isValidMove(row, col)) {
            if (print) {
                System.out.println("Move is invalid");
            }
            return;
        }
        int temp = board[emptyRow][emptyCol];
        board[emptyRow][emptyCol] = board[row][col];
        board[row][col] = temp;
        emptyRow = row;
        emptyCol = col;
    }

    /**
     * Check if puzzle is solved, if every block in its place
     * @return true if puzzle is solved
     */
    private boolean isSolved() {
        int num = 1;
        for (int i = 0; i < SIZE; i++) {
            for (int j = 0; j < SIZE; j++) {
                if (board[i][j] != num && (i != SIZE - 1 || j != SIZE - 1)) {
                    return false;
                }
                num++;
            }
        }
        return true;
    }

    /**
     * Check if puzzle is solved, if not prompts user to enter row and column of block to move,
     * repeats until the puzzle is solved. When puzzle is solved prints message and quits the game
     */
    public void play() {
        while (!isSolved()) {
            printBoard();
            System.out.print("Enter the row and column of the block to move (e.g., 1 2): ");
            Scanner scanner = new Scanner(System.in);
            int row = scanner.nextInt() - 1;
            int col = scanner.nextInt() - 1;
            moveBlock(row, col, true);
        }
        System.out.println("Congratulations! You solved the puzzle.");
    }

    /**
     * prints the board so the user can see current positions of blocks
     */
    private void printBoard() {
        for (int i = 0; i < SIZE; i++) {
            for (int j = 0; j < SIZE; j++) {
                System.out.printf("\t%d", board[i][j]);
            }
            System.out.println();
        }
    }

    public static void main(String[] args) {
        SlidingBlockPuzzle puzzle = new SlidingBlockPuzzle();
        puzzle.play();
    }
}