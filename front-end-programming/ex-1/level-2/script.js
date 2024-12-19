// script.js
import { loadStudentData } from './data-loader.js';
import { renderTableRows } from './table-renderer.js';

// Load student data and render the table when the page loads
window.addEventListener('DOMContentLoaded', () => {
  loadStudentData()
    .then(data => {
      renderTableRows(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
});

const changeFontBtn = document.getElementById('change-font-btn');
const fonts = [
  'Roboto', 
  'Lato', 
  'Open Sans', 
  'Montserrat', 
  'Poppins', 
  'Raleway', 
  'Nunito', 
  'Merriweather', 
  'Oswald', 
  'Playfair Display'
];

changeFontBtn.addEventListener('click', () => {
  const randomIndex = Math.floor(Math.random() * fonts.length);
  const fontFamily = fonts[randomIndex];
  
  const link = document.createElement('link');
  link.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(' ', '+')}&display=swap`;
  link.rel = 'stylesheet';
  document.head.appendChild(link);

  document.querySelector('table').style.fontFamily = `'${fontFamily}', sans-serif`;
});


const browserInfoDiv = document.getElementById('browser-info');

const updateBrowserInfo = () => {
    const browserInfo = `
    <strong>Browser Name:</strong> ${navigator.appName}<br>
    <strong>Browser Version:</strong> ${navigator.appVersion}<br>
    <strong>Window Dimensions:</strong> ${window.innerWidth} x ${window.innerHeight}<br>
    <strong>User Agent:</strong> ${navigator.userAgent}
    `;
    browserInfoDiv.innerHTML = browserInfo;
};

updateBrowserInfo();

// Update window dimensions on resize
window.addEventListener('resize', updateBrowserInfo);