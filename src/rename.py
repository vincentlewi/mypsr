import os

path = 'C:\SMU\Y2T1\WAD2\mypsr\src\house'
for filename in os.listdir(path):
    oldname = path + '\\' + filename
    newname = path + '\\' + filename[:-8] + '.png'
    os.rename(oldname, newname)