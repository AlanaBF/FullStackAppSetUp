import secrets
# This script generates a secret key for use in your application.
# The secret key is used for signing cookies, tokens, and other sensitive data.
# The generated key is URL-safe, meaning it can be used in URLs without further encoding.

# Usage:
# Run this script whenever you need to generate a new secret key.
# Simply run the script with Python, and it will print out a 32-byte URL-safe token.

# Example:
# 1. Open your terminal and navigate to the project directory.
# 2. Run the script using: `python help/generate_secret_key.py`
# 3. Copy the printed key and use it as your SECRET_KEY in your application configuration.

# Generate and print a secret key
print(secrets.token_urlsafe(32))