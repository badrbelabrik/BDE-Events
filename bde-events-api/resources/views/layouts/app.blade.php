<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BDE-Events | Campus Event Hub</title>
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- FontAwesome Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body class="bg-gray-100 font-sans antialiased text-gray-900 flex flex-col min-h-screen">

<!-- Header Navigation -->
@include('layouts.header')

<!-- Main Content Area -->
<main class="flex-grow max-w-6xl mx-auto px-4 py-6 w-full">
    @yield('content')
</main>

<!-- Footer -->
<footer class="bg-white border-t border-gray-200 py-6 text-center text-xs text-gray-500 mt-auto">
    <div class="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2">
        <p>&copy; {{ date('Y') }} BDE-Events Platform. All rights reserved.</p>
        <div class="space-x-4">
            <a href="#" class="hover:underline">Privacy Policy</a>
            <a href="#" class="hover:underline">Terms of Service</a>
            <a href="#" class="hover:underline">Campus Support</a>
        </div>
    </div>
</footer>

</body>
</html>
