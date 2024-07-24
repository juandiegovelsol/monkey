public class App {
    public static void main(String[] args) throws Exception {
        String originalSql1 = "SELECT * FROM users JOIN orders ON users.id = orders.user_id WHERE users.name = 'John'";
        String originalSql2 = "SELECT products.name, categories.id AS cat_id FROM products JOIN categories ON products.category_id = categories.id WHERE products.price > 100";

        // Optimize the SQL queries
        String optimizedSql1 = SqlOptimizer.optimize(originalSql1);
        String optimizedSql2 = SqlOptimizer.optimize(originalSql2);

        // Print the original and optimized SQL queries for comparison
        System.out.println("Original SQL 1:\n" + originalSql1);
        System.out.println("Optimized SQL 1:\n" + optimizedSql1);

        System.out.println("\nOriginal SQL 2:\n" + originalSql2);
        System.out.println("Optimized SQL 2:\n" + optimizedSql2);
    }
}
