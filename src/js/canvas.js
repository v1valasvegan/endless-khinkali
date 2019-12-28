export const canvas = document.createElement('canvas');
export const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
export const root = document.getElementById('root');
root.appendChild(canvas);
