@echo off
start /min "" cmd /k "/apache24/bin/httpd.exe"
start /min cmd /k "cd C:\Users\thier\Desktop\Sonatel Academy\memory\memoryback && exit"
start /min cmd /k "cd C:\Users\thier\Desktop\Sonatel Academy\memory\memoryfront && ng serve --open"
start /min "" cmd /k "cd C:\Users\thier\Desktop\Sonatel Academy\memory\memoryback && php artisan serve"
start /min "" cmd /k "cd C:\Users\thier\Desktop\Sonatel Academy\memory\memoryfront && code ."
start /min "" cmd /k "cd C:\Users\thier\Desktop\Sonatel Academy\memory\memoryback && phpstorm && exit"
start /min "" cmd /k "cd C:\Users\thier\Desktop && start postman && exit"
start cmd /k "cd C:\Users\thier\Desktop\Sonatel Academy\memory\memoryfront"
