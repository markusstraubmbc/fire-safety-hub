@echo off
cd /d "%~dp0"

if not exist node_modules (
    echo node_modules not found. Installing dependencies...
    npm install
)

echo Starting Resqio Development Server...
npx vite
pause
