/*
 -> PasswordHasher.java
 -> Author: Muhammad Suleman Tariq (543505)
 
 -> This utility class provides secure password hashing and verification
    using SHA-256 with salt. It replaces plain text password storage
    with industry-standard security practices.
 */

package util;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;

/**
 * Utility class for secure password hashing and verification.
 * Uses SHA-256 with random salt for each password.
 */
public class PasswordHasher {
    
    private static final int SALT_LENGTH = 16;
    private static final int HASH_ITERATIONS = 10000;
    
    /**
     * Hashes a password with a random salt.
     * 
     * @param password The plain text password to hash
     * @return Base64 encoded salt+hash string
     * @throws IllegalArgumentException if password is null or empty
     */
    public static String hashPassword(String password) {
        if (password == null || password.trim().isEmpty()) {
            throw new IllegalArgumentException("Password cannot be null or empty");
        }
        
        try {
            // Generate random salt
            SecureRandom random = new SecureRandom();
            byte[] salt = new byte[SALT_LENGTH];
            random.nextBytes(salt);
            
            // Hash password with salt
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            digest.reset();
            digest.update(salt);
            
            byte[] passwordBytes = password.getBytes();
            byte[] hash = passwordBytes;
            
            // Multiple iterations for better security
            for (int i = 0; i < HASH_ITERATIONS; i++) {
                hash = digest.digest(hash);
            }
            
            // Combine salt and hash
            byte[] combined = new byte[salt.length + hash.length];
            System.arraycopy(salt, 0, combined, 0, salt.length);
            System.arraycopy(hash, 0, combined, salt.length, hash.length);
            
            // Return as Base64 string
            return Base64.getEncoder().encodeToString(combined);
            
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("SHA-256 algorithm not available", e);
        }
    }
    
    /**
     * Verifies a password against a stored hash.
     * 
     * @param password The plain text password to verify
     * @param storedHash The stored salt+hash string
     * @return true if password matches, false otherwise
     * @throws IllegalArgumentException if parameters are null or invalid
     */
    public static boolean verifyPassword(String password, String storedHash) {
        if (password == null || password.trim().isEmpty()) {
            return false;
        }
        
        if (storedHash == null || storedHash.trim().isEmpty()) {
            return false;
        }
        
        try {
            // Decode stored hash
            byte[] combined = Base64.getDecoder().decode(storedHash);
            
            if (combined.length < SALT_LENGTH) {
                return false;
            }
            
            // Extract salt and hash
            byte[] salt = new byte[SALT_LENGTH];
            byte[] storedHashBytes = new byte[combined.length - SALT_LENGTH];
            
            System.arraycopy(combined, 0, salt, 0, SALT_LENGTH);
            System.arraycopy(combined, SALT_LENGTH, storedHashBytes, 0, storedHashBytes.length);
            
            // Hash input password with same salt
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            digest.reset();
            digest.update(salt);
            
            byte[] passwordBytes = password.getBytes();
            byte[] computedHash = passwordBytes;
            
            // Same number of iterations
            for (int i = 0; i < HASH_ITERATIONS; i++) {
                computedHash = digest.digest(computedHash);
            }
            
            // Compare hashes
            return MessageDigest.isEqual(storedHashBytes, computedHash);
            
        } catch (Exception e) {
            return false;
        }
    }
    
    /**
     * Validates password strength.
     * 
     * @param password The password to validate
     * @return true if password meets minimum requirements
     */
    public static boolean isPasswordStrong(String password) {
        if (password == null || password.length() < 8) {
            return false;
        }
        
        boolean hasUpper = false;
        boolean hasLower = false;
        boolean hasDigit = false;
        
        for (char c : password.toCharArray()) {
            if (Character.isUpperCase(c)) hasUpper = true;
            else if (Character.isLowerCase(c)) hasLower = true;
            else if (Character.isDigit(c)) hasDigit = true;
        }
        
        return hasUpper && hasLower && hasDigit;
    }
}
