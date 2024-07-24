import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * The SqlOptimizer class provides methods to optimize SQL queries by 
 * reordering JOIN conditions and improving WHERE clauses.
 */
class SqlOptimizer {

    /**
     * Regular expression pattern to match JOIN conditions in the SQL query.
     */
    private static final Pattern JOIN_PATTERN = Pattern.compile("(\\w+)\\s+JOIN\\s+(\\w+)\\s+ON\\s+(\\w+)\\.(\\w+)\\s*=\\s*(\\w+)\\.(\\w+)");

    /**
     * Regular expression pattern to match WHERE clauses in the SQL query.
     */
    private static final Pattern WHERE_PATTERN = Pattern.compile("WHERE\\s+(\\w+)\\.(\\w+)\\s*=\\s*'?(\\w+)'?");

    /**
     * Optimizes the provided SQL query by reordering JOIN conditions for 
     * efficiency and adjusting WHERE clauses.
     * 
     * @param sql the original SQL query to be optimized
     * @return the optimized SQL query
     */
    public static String optimize(String sql) {
        StringBuffer optimizedSql = new StringBuffer(sql.length());

        // Optimize JOIN conditions
        Matcher joinMatcher = JOIN_PATTERN.matcher(sql);
        while (joinMatcher.find()) {
            String table1 = joinMatcher.group(1);
            String table2 = joinMatcher.group(2);
            String column1Table = joinMatcher.group(3);
            String column1 = joinMatcher.group(4);
            String column2Table = joinMatcher.group(5);
            String column2 = joinMatcher.group(6);

            // Swap table names if necessary for efficiency
            if (table1.compareTo(table2) > 0) {
                // Si el nombre de la primera tabla es lexicográficamente mayor que el de la segunda, se intercambian
                joinMatcher.appendReplacement(optimizedSql, table2 + " JOIN " + table1 + " ON " + column2Table + "." + column2 + " = " + column1Table + "." + column1);
            } else {
                // Si no, se deja la condición JOIN tal cual
                joinMatcher.appendReplacement(optimizedSql, joinMatcher.group());
            }
        }
        joinMatcher.appendTail(optimizedSql);

        // Optimize WHERE clauses
        Matcher whereMatcher = WHERE_PATTERN.matcher(optimizedSql.toString());
        StringBuffer finalSql = new StringBuffer(optimizedSql.length());
        while (whereMatcher.find()) {
            String columnTable = whereMatcher.group(1);
            String column = whereMatcher.group(2);
            String value = whereMatcher.group(3);

            // Check for column aliases
            String alias = columnTable; // Default to table name if no alias found
            Pattern aliasPattern = Pattern.compile(columnTable + "\\s+AS\\s+(\\w+)");
            Matcher aliasMatcher = aliasPattern.matcher(sql);
            if (aliasMatcher.find()) {
                alias = aliasMatcher.group(1); // Si se encuentra un alias, se usa en lugar del nombre de la tabla
            }

            // Se actualiza la cláusula WHERE con el alias correcto
            whereMatcher.appendReplacement(finalSql, "WHERE " + alias + "." + column + " = '" + value + "'");
        }
        whereMatcher.appendTail(finalSql);

        return finalSql.toString();
    }
}

/**
 * Main class to run and test the SqlOptimizer.
 */
public class Main {
    public static void main(String[] args) {
        // Original SQL queries
        String originalSql1 = "SELECT * FROM users JOIN orders ON users.id = orders.user_id WHERE users.name = 'John'";
        String originalSql2 = "SELECT products.name, categories.name AS cat_name FROM products JOIN categories ON products.category_id = categories.id WHERE products.price > 100";

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

