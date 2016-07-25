
_publishPath='/Users/e13542/github/bradyhouse.github.io';
_sourcePath='/Users/e13542/github/house/fiddles';

function cprf() {
    cp -rf $1 ${_publishPath};
}

cd ${_publishPath};


rm -rf angular2;
rm -rf three;
rm -rf extjs5;
rm -rf d3;
rm -rf dojo;
rm -rf jquery;
rm -rf aurelia;
rm -rf tween;
rm -rf svg;
rm -rf resources;
rm -rf rxjs;
rm -rf index.html;
rm -rf .gitignore;

cd ${_sourcePath};

cprf angular2;
cprf three;
cprf extjs5;
cprf d3;
cprf dojo;
cprf jquery;
cprf aurelia;
cprf tween;
cprf svg;
cprf rxjs;
cprf resources;
cprf index.html;
cd ..
cprf .gitignore;
