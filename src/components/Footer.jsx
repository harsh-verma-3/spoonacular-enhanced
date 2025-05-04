import React from "react";

const Footer = () => {
    return (
        <footer className="bg-[#00843c] text-white p-4">
            <div className="max-w-5xl mx-auto grid grid-cols-12 gap-4">
                {/* Column 1: About Section */}
                <div className="col-span-2">
                    <a href="/about" className="block hover:underline">About</a>
                    <a href="/press" className="block hover:underline">Press</a>
                    <a href="/terms" className="block hover:underline">Terms & Privacy</a>
                    <a href="/dmca" className="block hover:underline">DMCA</a>
                    <a href="/contact" className="block hover:underline">Contact & Imprint</a>
                </div>

                {/* Column 2: App Store Links */}
                <div className="col-span-4 flex flex-col items-start space-y-4">
                    <a
                        href="https://itunes.apple.com/us/app/spoonacular-food-companion/id1406527413"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block border border-white rounded-lg overflow-hidden"
                    >
                        <img
                            src="/application/frontend/images/iosAppStore.svg"
                            alt="Download on the App Store"
                            className="w-36 h-auto"
                        />
                    </a>
                    <a
                        href="https://play.google.com/store/apps/details?id=app.com.spoonacular"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block border border-white rounded-lg overflow-hidden"
                    >
                        <img
                            src="/application/frontend/images/androidPlay.svg"
                            alt="Get it on Google Play"
                            className="w-36 h-auto"
                        />
                    </a>
                </div>

                {/* Column 3: Social Media Links */}
                <div className="col-span-4 text-left">
                    <div className="flex justify-start space-x-6 mb-4">
                        <a
                            href="https://www.facebook.com/spoonacular"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                src="/application/frontend/images/facebook.svg"
                                alt="Facebook"
                                className="w-8 h-8"
                            />
                        </a>
                        <a
                            href="https://twitter.com/spoonacular"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                src="/application/frontend/images/twitter.svg"
                                alt="Twitter"
                                className="w-8 h-8"
                            />
                        </a>
                        <a
                            href="http://pinterest.com/spoonacular/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                src="/application/frontend/images/pinterest.svg"
                                alt="Pinterest"
                                className="w-8 h-8"
                            />
                        </a>
                    </div>
                    <a
                        href="https://donorbox.org/support-spoonacular?recurring=true"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-white text-center py-3 px-6 border border-dashed border-white text-lg"
                    >
                        Donate
                    </a>
                </div>

                {/* Column 4: Additional Links */}
                <div className="col-span-2">
                    <a href="/faq" className="block hover:underline">FAQ</a>
                    <a href="/food-api" className="block hover:underline">Food API</a>
                    <a href="/newsletter" className="block hover:underline">Newsletter</a>
                    <a href="/chatbot" className="block hover:underline">Food Chatbot</a>
                    <a
                        href="https://chrome.google.com/webstore/detail/spoonacular-extension/gjfkonhifbgbcbdjjggkiibcmljfdfpb"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block hover:underline"
                    >
                        Chrome Extension
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;