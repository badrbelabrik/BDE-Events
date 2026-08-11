function Footer() {
    return (
        <footer className="bg-white border-t border-gray-200 py-6 text-center text-xs text-gray-500 mt-auto">
            <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2">

                <p>
                    © {new Date().getFullYear()} BDE-Events Platform.
                    All rights reserved.
                </p>

                <div className="space-x-4">
                    <a href="#" className="hover:underline">
                        Privacy Policy
                    </a>

                    <a href="#" className="hover:underline">
                        Terms of Service
                    </a>

                    <a href="#" className="hover:underline">
                        Campus Support
                    </a>
                </div>

            </div>
        </footer>
    );
}

export default Footer;