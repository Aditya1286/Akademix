<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register & Login</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gradient-to-r from-gray-200 to-blue-100 min-h-screen flex items-center justify-center p-4 font-sans">
    <div class="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden" id="signup" style="display:none;">
        <div class="bg-blue-600 py-4">
            <h1 class="text-2xl font-bold text-center text-white">Create Account</h1>
        </div>
        <div class="p-6">
            <form method="post" action="register.php" class="space-y-6">
                <div class="relative">
                    <i class="fas fa-user absolute text-blue-600 left-0 top-3"></i>
                    <input type="text" name="fName" id="fName" placeholder="First Name" required
                        class="w-full bg-transparent border-b-2 border-gray-300 pb-2 pl-6 focus:outline-none focus:border-blue-600 transition duration-300">
                </div>
                <div class="relative">
                    <i class="fas fa-user absolute text-blue-600 left-0 top-3"></i>
                    <input type="text" name="lName" id="lName" placeholder="Last Name" required
                        class="w-full bg-transparent border-b-2 border-gray-300 pb-2 pl-6 focus:outline-none focus:border-blue-600 transition duration-300">
                </div>
                <div class="relative">
                    <i class="fas fa-envelope absolute text-blue-600 left-0 top-3"></i>
                    <input type="email" name="email" id="signupEmail" placeholder="Email" required
                        class="w-full bg-transparent border-b-2 border-gray-300 pb-2 pl-6 focus:outline-none focus:border-blue-600 transition duration-300">
                </div>
                <div class="relative">
                    <i class="fas fa-lock absolute text-blue-600 left-0 top-3"></i>
                    <input type="password" name="password" id="signupPassword" placeholder="Password" required
                        class="w-full bg-transparent border-b-2 border-gray-300 pb-2 pl-6 focus:outline-none focus:border-blue-600 transition duration-300">
                </div>
                <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-3 rounded-lg font-medium transition duration-300 shadow-md hover:shadow-lg" name="signUp">Sign Up</button>
            </form>
            
            <div class="relative flex items-center justify-center my-6">
                <div class="flex-grow border-t border-gray-300"></div>
                <span class="flex-shrink mx-4 text-gray-600">or continue with</span>
                <div class="flex-grow border-t border-gray-300"></div>
            </div>
            
            <div class="flex justify-center space-x-4 mb-6">
                <button class="flex items-center justify-center w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-50 transition duration-300 shadow-sm">
                    <i class="fab fa-google text-red-500 mr-2"></i>
                    <span>Google</span>
                </button>
                <button class="flex items-center justify-center w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-50 transition duration-300 shadow-sm">
                    <i class="fab fa-facebook text-blue-600 mr-2"></i>
                    <span>Facebook</span>
                </button>
            </div>
            
            <div class="text-center mt-6">
                <p class="text-gray-600">Already have an account? 
                    <button id="signInButton" class="text-blue-600 hover:text-blue-800 font-semibold hover:underline ml-1 transition duration-300">Sign In</button>
                </p>
            </div>
        </div>
    </div>

    <div class="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden" id="signIn">
        <div class="bg-blue-600 py-4">
            <h1 class="text-2xl font-bold text-center text-white">Akademix</h1>
        </div>
        <div class="p-6">
            <form method="post" action="register.php" class="space-y-6">
                <div class="relative">
                    <i class="fas fa-envelope absolute text-blue-600 left-0 top-3"></i>
                    <input type="email" name="email" id="signinEmail" placeholder="Email" required
                        class="w-full bg-transparent border-b-2 border-gray-300 pb-2 pl-6 focus:outline-none focus:border-blue-600 transition duration-300">
                </div>
                <div class="relative">
                    <i class="fas fa-lock absolute text-blue-600 left-0 top-3"></i>
                    <input type="password" name="password" id="signinPassword" placeholder="Password" required
                        class="w-full bg-transparent border-b-2 border-gray-300 pb-2 pl-6 focus:outline-none focus:border-blue-600 transition duration-300">
                </div>
                
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                        <label for="remember-me" class="ml-2 block text-sm text-gray-700">Remember me</label>
                    </div>
                    <div class="text-sm">
                        <a href="#" class="text-blue-600 hover:text-blue-800 font-semibold hover:underline transition duration-300">Forgot password?</a>
                    </div>
                </div>
                
                <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-3 rounded-lg font-medium transition duration-300 shadow-md hover:shadow-lg" name="signIn">Sign In</button>
            </form>
            
            <div class="relative flex items-center justify-center my-6">
                <div class="flex-grow border-t border-gray-300"></div>
                <span class="flex-shrink mx-4 text-gray-600">or continue with</span>
                <div class="flex-grow border-t border-gray-300"></div>
            </div>
            
            <div class="flex justify-center space-x-4 mb-6">
                <button class="flex items-center justify-center w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-50 transition duration-300 shadow-sm">
                    <i class="fab fa-google text-red-500 mr-2"></i>
                    <span>Google</span>
                </button>
                <button class="flex items-center justify-center w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-50 transition duration-300 shadow-sm">
                    <i class="fab fa-facebook text-blue-600 mr-2"></i>
                    <span>Facebook</span>
                </button>
            </div>
            
            <div class="text-center mt-6">
                <p class="text-gray-600">Don't have an account? 
                    <button id="signUpButton" class="text-blue-600 hover:text-blue-800 font-semibold hover:underline ml-1 transition duration-300">Sign Up</button>
                </p>
            </div>
        </div>
    </div>

    <script>
        document.getElementById('signUpButton').addEventListener('click', function() {
            document.getElementById('signIn').style.display = 'none';
            document.getElementById('signup').style.display = 'block';
        });

        document.getElementById('signInButton').addEventListener('click', function() {
            document.getElementById('signup').style.display = 'none';
            document.getElementById('signIn').style.display = 'block';
        });
    </script>
</body>
</html>