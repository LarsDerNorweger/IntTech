function clearOrCreateFolder
{
    if [[ -d "$1" ]]
    then
        echo "Folder $1 cleared"
        rm -r $1
        mkdir $1
    else
        echo "Folder $1 created"
        mkdir $1
    fi
}

function createFolder
{
    if [ -d "$1" ]
    then
      return
    else
        mkdir $1
        echo "Folder $1 created"
    fi
}

pushd "${0%/*}"

sudo apt install -y nginx ||( echo "failed to install nginx" && exit 1)


createFolder /data/
sudo chmod 777 /data
createFolder /data/www/
clearOrCreateFolder /data/www/jump/

pushd "../App"
node ./build.js
cp -r ./.out/ /data/www/jump/.out/
cp ./index.htm /data/www/jump/index.htm
popd


echo "replace nginx conf"
conf=/etc/nginx/nginx.conf

if [ -f $conf ]
then
    sudo mv $conf /etc/nginx/_nginx.conf 
fi

sudo touch $conf
sudo chmod 777 $conf
echo "user $USER;" >> $conf
cat ./nginx.conf >> $conf
sudo nginx -s reload 
popd