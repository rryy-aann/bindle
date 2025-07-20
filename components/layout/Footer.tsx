import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 mt-10">
      <div className="max-w-6xl mx-auto px-4 py-4 text-sm text-center">
        © {new Date().getFullYear()} Bindle. All rights reserved.
      </div>
    </footer>
  );
}
