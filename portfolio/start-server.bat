@echo off
cd /d "%~dp0"
echo.
echo  Server running at:
echo.
echo  http://localhost:8000
echo.
echo  Press CTRL+C to stop.
echo.
php -S localhost:8000 2>nul