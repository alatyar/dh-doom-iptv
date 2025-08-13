@echo off
echo Building and Starting Doom VIP IPTV Website in Production Mode...
echo.

REM Set Node.js path
set PATH=C:\Program Files\nodejs;%PATH%

REM Clear cache
echo Clearing cache...
if exist .next rmdir /s /q .next
if exist node_modules\.cache rmdir /s /q node_modules\.cache

echo.
echo Building for production...
npm run build

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Build failed! Please check the errors above.
    pause
    exit /b 1
)

echo.
echo Build successful! Starting production server...
echo Server will be available at: http://localhost:3000
echo.

npm start

pause
