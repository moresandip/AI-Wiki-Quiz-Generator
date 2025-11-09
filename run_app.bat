@echo off
echo Starting backend server...
start "Backend" cmd /k "cd backend && python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload"

echo Starting frontend server...
start "Frontend" cmd /k "cd frontend && npm start"

@REM .\run_app.bat
