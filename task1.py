import numpy as np
import heapq
import pygame
import sys


class Node:
    """Class to represent each state of the puzzle."""

    def __init__(self, board, parent=None, move=None, depth=0):
        self.board = board
        self.parent = parent
        self.move = move
        self.depth = depth
        self.cost = depth + self.manhattan_distance()

    def manhattan_distance(self):
        """ Calculation the Manhattan distance heuristic."""
        distance = 0
        for i in range(3):
            for j in range(3):
                if self.board[i][j] != 0:
                    x, y = divmod(self.board[i][j] - 1, 3)
                    distance += abs(x - i) + abs(y - j)
        return distance

    def get_neighbors(self):
        """Generate neighboring nodes."""
        neighbors = []
        x, y = np.argwhere(self.board == 0)[0]
        moves = [(-1, 0), (1, 0), (0, -1), (0, 1)]
        for dx, dy in moves:
            new_x, new_y = x + dx, y + dy
            if 0 <= new_x < 3 and 0 <= new_y < 3:
                new_board = np.copy(self.board)
                new_board[x, y], new_board[new_x, new_y] = (new_board[new_x,
                                                                      new_y],
                                                            new_board[x, y])
                neighbors.append(
                    Node(new_board, self, (dx, dy), self.depth + 1))
        return neighbors

    def __lt__(self, other):
        return self.cost < other.cost

    def __eq__(self, other):
        return np.array_equal(self.board, other.board)

    def __hash__(self):
        return hash(self.board.tobytes())


def a_star_search(start, goal):
    """Perform A* search."""
    open_list = []
    closed_set = set()
    open_set = set()
    heapq.heappush(open_list, start)
    open_set.add(start)
    while open_list:
        current_node = heapq.heappop(open_list)
        open_set.remove(current_node)
        if np.array_equal(current_node.board, goal):
            return reconstruct_path(current_node)
        closed_set.add(hash(current_node))
        for neighbor in current_node.get_neighbors():
            if hash(neighbor) in closed_set:
                continue
            if neighbor not in open_set:
                heapq.heappush(open_list, neighbor)
                open_set.add(neighbor)
            elif neighbor.cost < open_list[open_list.index(neighbor)].cost:
                # Update the node in open_list
                open_list[open_list.index(neighbor)] = neighbor
                heapq.heapify(open_list)
    return None


def reconstruct_path(node):
    """Reconstruct the path from goal node to start node."""
    path = []
    while node:
        path.append(node)
        node = node.parent
    return path[::-1]


def draw_board(screen, board, font, tile_size):
    """Draw the puzzle board."""
    screen.fill((255, 255, 255))
    for i in range(3):
        for j in range(3):
            tile = board[i][j]
            if tile != 0:
                text = font.render(str(tile), True, (0, 0, 0))
                rect = text.get_rect(center=(j * tile_size + tile_size // 2,
                                             i * tile_size + tile_size // 2))
                pygame.draw.rect(
                    screen, (0, 0, 0),
                    (j * tile_size, i * tile_size, tile_size, tile_size), 2)
                screen.blit(text, rect)
    pygame.display.flip()


def main():
    """Main function to run the program."""
    pygame.init()

    # Constants
    WIDTH, HEIGHT = 300, 300
    TILE_SIZE = WIDTH // 3
    FONT = pygame.font.Font(None, 50)

    # Create screen
    screen = pygame.display.set_mode((WIDTH, HEIGHT))

    # Init and goal board configurations
    start_board = np.array([[5, 1, 0], [2, 8, 7], [3, 6, 4]])
    goal_board = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 0]])

    start_node = Node(start_board)
    solution_path = a_star_search(start_node, goal_board)

    if not solution_path:
        print("No solution found!")
        return

    for node in solution_path:
        draw_board(screen, node.board, FONT, TILE_SIZE)
        pygame.time.wait(500)  # Wait for 500 milliseconds
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()

    # Wait until user closes the window
    while True:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()


if __name__ == "__main__":
    main()