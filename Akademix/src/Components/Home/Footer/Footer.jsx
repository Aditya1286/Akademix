import React from 'react'

function Footer() {
  return (
    <footer class="w-full h-full bg-gray-100 dark:bg-gray-800 py-12">
        <div class="container mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <div class="flex items-center mb-4">
                        <div class="mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-orange-400">
                                <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                                <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                            </svg>
                        </div>
                        <div class="flex items-center">
                            <span class="text-lg font-bold text-gray-900 dark:text-white">Akad</span>
                            <span class="text-lg font-bold text-primary text-orange-400">emix</span>
                        </div>
                    </div>
                    <p class="text-gray-600 dark:text-gray-400 text-sm">
                        Your personal educational journey tracker. We help students navigate their learning path and achieve success.
                    </p>
                </div>
                
                <div>
                    <h4 class="font-bold text-gray-900 dark:text-white mb-4">Features</h4>
                    <ul class="space-y-2 text-gray-600 dark:text-gray-400">
                        <li><a href="#" class="hover:text-primary">Assignment Tracker</a></li>
                        <li><a href="#" class="hover:text-primary">Profile Tracker</a></li>
                        <li><a href="#" class="hover:text-primary">Event Tracker</a></li>
                        <li><a href="#" class="hover:text-primary">Analytics Dashboard</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-bold text-gray-900 dark:text-white mb-4">Resources</h4>
                    <ul class="space-y-2 text-gray-600 dark:text-gray-400">
                        <li><a href="#" class="hover:text-primary">Blog</a></li>
                        <li><a href="#" class="hover:text-primary">Tutorials</a></li>
                        <li><a href="#" class="hover:text-primary">Support</a></li>
                        <li><a href="#" class="hover:text-primary">Documentation</a></li>
                    </ul>
                </div>
                
                <div>
                    <h4 class="font-bold text-gray-900 dark:text-white mb-4">Connect</h4>
                    <ul class="space-y-2 text-gray-600 dark:text-gray-400">
                        <li><a href="#" class="hover:text-primary">Contact Us</a></li>
                        <li><a href="#" class="hover:text-primary">Twitter</a></li>
                        <li><a href="#" class="hover:text-primary">LinkedIn</a></li>
                        <li><a href="#" class="hover:text-primary">GitHub</a></li>
                    </ul>
                </div>
            </div>
            
            <div class="border-t border-gray-200 dark:border-gray-700 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
                <p class="text-sm text-gray-600 dark:text-gray-400">
                    &copy; 2025 Akademix. All rights reserved.
                </p>
                <div class="flex space-x-4 mt-4 md:mt-0">
                    <a href="#" class="text-gray-600 dark:text-gray-400 hover:text-primary">
                        <i class="fa-brands fa-twitter"></i>
                    </a>
                    <a href="#" class="text-gray-600 dark:text-gray-400 hover:text-primary">
                        <i class="fa-brands fa-linkedin"></i>
                    </a>
                    <a href="#" class="text-gray-600 dark:text-gray-400 hover:text-primary">
                        <i class="fa-brands fa-github"></i>
                    </a>
                    <a href="#" class="text-gray-600 dark:text-gray-400 hover:text-primary">
                        <i class="fa-brands fa-instagram"></i>
                    </a>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer