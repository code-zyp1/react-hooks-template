@echo off
echo Please input the folder path:
set /p folderPath=
tree %folderPath% /F /A > folder_structure.txt
echo Folder structure has been saved to folder_structure.txt.
