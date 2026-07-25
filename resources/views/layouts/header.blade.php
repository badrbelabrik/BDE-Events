<nav class="bg-white border-b border-gray-200 sticky top-0 z-50">
    <div class="max-w-6xl mx-auto px-4 flex justify-between items-center h-14">
        <!-- Brand / Logo -->
        <div class="flex items-center space-x-2 flex-1">
            <a href="{{ url('/') }}" class="text-indigo-600 font-black text-2xl tracking-wider">
                BDE<span class="bg-indigo-600 text-white px-1.5 py-0.5 rounded ml-0.5 text-xl font-bold">Events</span>
            </a>
        </div>

        <!-- Navigation Links -->
        <div class="flex items-center space-x-6 text-gray-500 text-xs">

            @auth
                @if(auth()->user()->role === 'admin')
                    <a href="{{ route('show.dashboard') }}" class="flex flex-col items-center text-amber-600 hover:text-amber-700 px-1 py-1 transition font-bold">
                        <i class="fa-solid fa-chart-line text-xl mb-0.5"></i>
                        <span class="hidden sm:block">Admin</span>
                    </a>
                @else
                    <a href="{{route('student.space')}}" class="flex flex-col items-center hover:text-indigo-600 px-1 py-1 transition">
                        <i class="fa-solid fa-ticket text-xl mb-0.5"></i>
                        <span class="hidden sm:block">My Tickets</span>
                    </a>
                @endif

                <div class="border-l border-gray-200 h-8 mx-2 hidden sm:block"></div>

                <!-- User Dropdown (Pure CSS focus-within/group) -->
                <div class="relative group">
                    <button type="button" class="flex flex-col items-center hover:text-gray-900 px-1 py-1 transition focus:outline-none cursor-pointer">
                        <div class="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 font-bold text-xs flex items-center justify-center mb-0.5 border border-indigo-200">
                            {{ strtoupper(substr(auth()->user()->name, 0, 1)) }}
                        </div>
                        <span class="hidden sm:block">Me <i class="fa-solid fa-caret-down text-[10px] group-hover:rotate-180 transition-transform"></i></span>
                    </button>

                    <!-- Dropdown Menu -->
                    <div class="absolute right-0 mt-0 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-50 text-sm font-normal text-gray-700 hidden group-hover:block group-focus-within:block">
                        <div class="px-4 py-2 border-b border-gray-100">
                            <p class="font-semibold text-gray-900 text-sm leading-tight">{{ auth()->user()->name }}</p>
                            <p class="text-xs text-gray-500 capitalize">{{ auth()->user()->role }} Account</p>
                        </div>

                        <div class="border-t border-gray-100 my-1"></div>

                        <form action="{{route('logout')}}" method="POST">
                            @csrf
                            <button type="submit" class="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition cursor-pointer font-medium">
                                <i class="fa-solid fa-arrow-right-from-bracket mr-2 text-xs"></i> Sign Out
                            </button>
                        </form>
                    </div>
                </div>
            @else
                <div class="border-l border-gray-200 h-8 mx-2 hidden sm:block"></div>

                <a href="{{ route('show.login') }}" class="text-indigo-600 font-semibold px-3 py-1.5 rounded hover:bg-indigo-50 transition">
                    Sign In
                </a>
                <a href="{{ route('show.register') }}" class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-1.5 rounded transition shadow-sm">
                    Register
                </a>
            @endauth
        </div>
    </div>
</nav>
