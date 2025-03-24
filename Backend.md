# Akademix

A comprehensive PHP-based school management solution with secure authentication, student dashboards, and comprehensive academic tracking.

## 🌟 Features

- **Secure Authentication System** - Complete login/registration with password hashing and session management
- **Student Dashboard** - Personalized view showing only the student's own information
- **Academic Tracking** - Monitor attendance, assignments, and examination results
- **Fee Management** - Track payments, dues, and payment history
- **Responsive Design** - Clean interface optimized for all devices

## 🔐 Authentication System

The core authentication system (`auth/auth.php`) provides comprehensive user management:

- **User Registration** with automatic record initialization
- **Secure Login** with password verification
- **Session Management** to maintain authenticated state
- **Access Control** to protect private pages

```php
// Example of secure authentication implementation
$auth = new Auth($conn);
$result = $auth->login($email, $password);
```

## 💾 Database Integration

The system uses PDO (PHP Data Objects) to connect securely to the database:

- **Parameterized Queries** prevent SQL injection attacks
- **Transaction Support** ensures data integrity
- **Error Handling** with graceful failure modes

During registration, the system:
1. Verifies email uniqueness
2. Securely hashes passwords
3. Creates the user record
4. Initializes related records across multiple tables

## 🖥️ User Interface Components

Three main interface components provide a complete user experience:

- **Login Page (`login.php`)**: Clean authentication form
- **Registration Page (`register.php`)**: New account creation with validation
- **Student Dashboard (`student_dashboard.php`)**: Personalized data presentation

The dashboard displays:
- Personal information
- Attendance percentages with visual indicators
- Fee status and payment history
- Assignment scores
- Examination results

## 📊 Data Structure

The system operates on a relational database with the following tables:

| Table | Purpose |
|-------|---------|
| `users` | Core user information (name, email, password, section) |
| `attendance` | Subject-specific attendance tracking |
| `fee_system` | Payment records and outstanding balances |
| `assignments` | Assignment scores and statistics |
| `results` | Semester examination results |

All tables use the user ID as a foreign key to maintain relational integrity.

## 🛡️ Security Features

Security is implemented at multiple levels:

- **Password Hashing** using PHP's native `password_hash()` function
- **Session-based Authentication** with proper lifecycle management
- **Input Validation** on all form submissions
- **Prepared Statements** to prevent SQL injection
- **Access Control** through session verification

```php
// Example of session security implementation
session_start();
if (!isset($_SESSION['user_id'])) {
    header('Location: ../login.php');
    exit;
}
```

## 🔄 Integration Points

The authentication system seamlessly integrates with existing components:

- Session variables provide user context across the application
- Dashboard components dynamically load based on user permissions
- Database connections are managed consistently across modules

## 🚀 Getting Started

1. Clone the repository
   ```
   git clone https://github.com/yourusername/school-management-system.git
   ```

2. Import the database schema
   ```
   mysql -u username -p database_name < schema.sql
   ```

3. Configure your database connection
   ```
   Edit db/db.php with your credentials
   ```

4. Access the application through your web server

## 💻 Requirements

- PHP 7.4+
- MySQL/MariaDB
- Web server (Apache/Nginx)
- PDO PHP Extension

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

⭐ Star this repository if you find it helpful! ⭐
