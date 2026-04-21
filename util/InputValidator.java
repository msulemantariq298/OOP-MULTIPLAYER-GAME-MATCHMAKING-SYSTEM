/*
 -> InputValidator.java
 -> Author: Muhammad Suleman Tariq (543505)
 
 -> This utility class provides comprehensive input validation
    for the matchmaking system. It validates usernames, passwords,
    regions, languages, and numeric inputs to ensure data integrity
    and prevent security issues.
 */

package util;

import java.util.Scanner;
import java.util.regex.Pattern;

/**
 * Utility class for validating and sanitizing user input.
 */
public class InputValidator {
    
    private static final Pattern USERNAME_PATTERN = Pattern.compile("^[a-zA-Z0-9_]{3,20}$");
    private static final Pattern REGION_PATTERN = Pattern.compile("^[a-zA-Z\\s]{2,30}$");
    private static final Pattern LANGUAGE_PATTERN = Pattern.compile("^[a-zA-Z\\s]{2,20}$");
    
    /**
     * Validates a username according to system requirements.
     * 
     * @param username The username to validate
     * @return true if valid, false otherwise
     */
    public static boolean isValidUsername(String username) {
        if (username == null || username.trim().isEmpty()) {
            return false;
        }
        return USERNAME_PATTERN.matcher(username.trim()).matches();
    }
    
    /**
     * Validates a password according to security requirements.
     * 
     * @param password The password to validate
     * @return true if valid, false otherwise
     */
    public static boolean isValidPassword(String password) {
        return PasswordHasher.isPasswordStrong(password);
    }
    
    /**
     * Validates a region name.
     * 
     * @param region The region to validate
     * @return true if valid, false otherwise
     */
    public static boolean isValidRegion(String region) {
        if (region == null || region.trim().isEmpty()) {
            return false;
        }
        return REGION_PATTERN.matcher(region.trim()).matches();
    }
    
    /**
     * Validates a language name.
     * 
     * @param language The language to validate
     * @return true if valid, false otherwise
     */
    public static boolean isValidLanguage(String language) {
        if (language == null || language.trim().isEmpty()) {
            return false;
        }
        return LANGUAGE_PATTERN.matcher(language.trim()).matches();
    }
    
    /**
     * Validates that a number is within a specified range.
     * 
     * @param value The value to check
     * @param min Minimum allowed value (inclusive)
     * @param max Maximum allowed value (inclusive)
     * @return true if within range, false otherwise
     */
    public static boolean isInRange(int value, int min, int max) {
        return value >= min && value <= max;
    }
    
    /**
     * Gets a validated string input from the user.
     * 
     * @param scanner The Scanner object to use
     * @param prompt The prompt message to display
     * @param validator The validation function to apply
     * @param errorMessage The error message to display on invalid input
     * @return Validated string input
     */
    public static String getValidatedString(Scanner scanner, String prompt, 
                                           java.util.function.Predicate<String> validator, 
                                           String errorMessage) {
        while (true) {
            System.out.print(prompt);
            String input = scanner.nextLine().trim();
            
            if (validator.test(input)) {
                return input;
            }
            
            System.out.println("ERROR: " + errorMessage);
        }
    }
    
    /**
     * Gets a validated integer input from the user.
     * 
     * @param scanner The Scanner object to use
     * @param prompt The prompt message to display
     * @param min Minimum allowed value
     * @param max Maximum allowed value
     * @return Validated integer input
     */
    public static int getValidatedInt(Scanner scanner, String prompt, int min, int max) {
        while (true) {
            System.out.print(prompt);
            String input = scanner.nextLine().trim();
            
            try {
                int value = Integer.parseInt(input);
                if (isInRange(value, min, max)) {
                    return value;
                }
                System.out.println("ERROR: Please enter a number between " + min + " and " + max);
            } catch (NumberFormatException e) {
                System.out.println("ERROR: Please enter a valid number");
            }
        }
    }
    
    /**
     * Sanitizes string input by removing potentially harmful characters.
     * 
     * @param input The input to sanitize
     * @return Sanitized string
     */
    public static String sanitize(String input) {
        if (input == null) {
            return "";
        }
        
        // Remove potentially harmful characters
        return input.replaceAll("[<>\"'&]", "")
                   .trim()
                   .replaceAll("\\s+", " ");
    }
    
    /**
     * Gets a validated username from the user.
     * 
     * @param scanner The Scanner object to use
     * @return Validated username
     */
    public static String getValidUsername(Scanner scanner) {
        return getValidatedString(scanner, "Enter username (3-20 chars, alphanumeric + underscore): ",
                                 InputValidator::isValidUsername,
                                 "Username must be 3-20 characters and contain only letters, numbers, and underscores");
    }
    
    /**
     * Gets a validated password from the user.
     * 
     * @param scanner The Scanner object to use
     * @return Validated password
     */
    public static String getValidPassword(Scanner scanner) {
        return getValidatedString(scanner, "Enter password (8+ chars with uppercase, lowercase, and digit): ",
                                 InputValidator::isValidPassword,
                                 "Password must be at least 8 characters with uppercase, lowercase, and digit");
    }
    
    /**
     * Gets a validated region from the user.
     * 
     * @param scanner The Scanner object to use
     * @return Validated region
     */
    public static String getValidRegion(Scanner scanner) {
        return getValidatedString(scanner, "Enter region (2-30 chars, letters only): ",
                                 InputValidator::isValidRegion,
                                 "Region must be 2-30 characters and contain only letters");
    }
    
    /**
     * Gets a validated language from the user.
     * 
     * @param scanner The Scanner object to use
     * @return Validated language
     */
    public static String getValidLanguage(Scanner scanner) {
        return getValidatedString(scanner, "Enter language (2-20 chars, letters only): ",
                                 InputValidator::isValidLanguage,
                                 "Language must be 2-20 characters and contain only letters");
    }
}
