import os

path = 'C:/wamp64/www/IS216/mypsr/src/house'
for filename in os.listdir(path):
    oldname = path + '/' + filename
    newname = path + '/' + filename[:-8] + '.png'
    os.rename(oldname, newname)