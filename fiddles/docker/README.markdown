Docker
======

[Digging around in the angular-cli github repo recently I found an interesting 
markdown (*.md) file entitled [docker-deploy](http://three-bradyhouse.rhcloud.com/?p=807).  The file begins 
`"Add convenience for users to containerize and deploy their Angular application via Docker. …”`.  And then, a 
2x4 materialized and bounced off my head: _Huh, maybe I can't simply dismiss this Docker thing as something 
beyond the pale of JavaScript/frontend and my so-called expertise._ 

This collection (aka directory, aka _barrel_) is aimed at gaining some experience with [docker](http://docker.com). 
_Yah-dah, yah-dah, yah-dah ..._   

Finally, if you are really following along, start with [bash fiddle #81](../bash/fiddle-0081-docker). It automates
the setup of the docker client and dependencies via home brew. For the _non-Mac challenged_, See the 
aforementioned text.


### Kindle Injection

As a starting point, I purchased Karl Mathias and Sean P. Kane’s book [Docker: Up and Running](https://amzn.com/B00ZGRS4XM).


### Using fiddle.sh ...

#### To Create

[Docker](../docker) fiddles are created using the [Sean Kane's Docker Hello Node Repo](https://github.com/spkane/docker-node-hello). The create logic baked into 
the [fiddle.sh](../../scripts/fiddle.sh) script is based on [bash fiddle #81](../bash/fiddle-0081-Docker).  To create a new Docker 
fiddle, run the following command from the [scripts](../../scripts) directory like so:

    ./fiddle.sh "create" "docker" "fiddle-####-<Name>"

where:

    <Name> is the name of the new fiddle.

If everything is working correctly, you should see a stream of output that looks like this [sample create output](create.markdown).

#### To Remove

_TBW_

#### To Refactor

_TBW_

#### To Fork

_TBW_

#### To Index

_TBW_

#### To Start

_TBW_




### Online Resources

*   [docker](http://docker.com)
*   [docker docs](https://docs.docker.com)
*   [docker machine repo](https://github.com/docker/machine)
*   [virtual box](https://www.virtualbox.org)
*   [docker hub](https://hub.docker.com/)
*   [docker node repo](https://hub.docker.com/_/node/)

