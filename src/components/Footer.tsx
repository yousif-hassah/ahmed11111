
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-charcoal text-white py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo */}
          <div className="mb-6 md:mb-0">
            <div className="text-2xl font-playfair font-bold">
              <span className="text-pistachio">ِِAhmed Hassan</span>
            </div>
            <p className="mt-2 text-gray-400">ahmed66bresh@gmail.com</p>
          </div>
          
          {/* Social Links */}
          <div className="flex space-x-4">
            {/* <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white bg-opacity-10 flex items-center justify-center hover:bg-pistachio transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a> */}
            {/* <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white bg-opacity-10 flex items-center justify-center hover:bg-pistachio transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </a> */}
            <a href="https://www.instagram.com/hamoki._?igsh=cnQ5MG1ydjQzdmNu" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white bg-opacity-10 flex items-center justify-center hover:bg-pistachio transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            {/* <a href="yousifhassan4247@gmail.com" className="w-10 h-10 rounded-full bg-white bg-opacity-10 flex items-center justify-center hover:bg-pistachio transition-colors"> */}
<a
  href="https://mail.google.com/mail/?view=cm&fs=1&to=ahmed66bresh@gmail.com"
  target="_blank"
  rel="noopener noreferrer"
  className="w-10 h-10 rounded-full bg-white bg-opacity-10 flex items-center justify-center hover:bg-pistachio transition-colors"
>
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
</a>

          </div>
        </div>
        
        <hr className="border-gray-700 my-8" />
        
        {/* <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0">
            {/* &copy; {currentYear}  </p> */}
         
          
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-pistachio transition-colors"></a>
            <a href="#" className="text-gray-400 hover:text-pistachio transition-colors"></a>
          </div>
        {/* </div> */}
      </div>
    </footer>
  );
};

export default Footer;
