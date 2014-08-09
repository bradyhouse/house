#!/bin/bash

location=$(pwd;)
home=$(cd ~; pwd)
cd bin
cat snippets/indexheader > ../../fiddles/index.html
cd ../../fiddles
ls -1 | grep 'fiddle' > index.tmp
mv index.tmp ../scripts/bin
cd ../scripts/bin
while read line; do
   echo "<a href=\"$line/index.html\" target="_self">$line</a></br>" >> ../../fiddles/index.html
done < index.tmp
cat snippets/indexfooter >> ../../fiddles/index.html




