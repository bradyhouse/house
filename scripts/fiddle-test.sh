#!/bin/bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 06/21/2015______________________________________________________________|
#  Description             : UTILITY USED TO RUN JSTESTDRIVER FOR A GIVEN TYPE AND FIDDLE NAME_______|
#  Command line Arguments  : $1 = FIDDLE TYPE, $2 = FIDDLE NAME______________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# 06/20/2015 - See CHANGELOG @ 201506200420
# 04/16/2016 - See CHANGELOG @ 201604160420
# 05/02/2015 - See CHANGELOG @ 201605020420
# ---------------------------------------------------------------------------------------------------|

source bin/_utils.sh;
source bin/_types.sh;
source bin/_test.sh;
source bin/jstestdriver/_run_jstestdriver.sh;

thisFile=$(echo "$0" | sed 's/\.\///g')
fiddleType=$1
fiddleName=$2
fiddlePath="../fiddles/${fiddleType}/${fiddleName}"


#try
(
    voidEchoUpperCase ${thisFile};

    # Handle fiddle.sh test request
    if [[ "${fiddleType}" == "fiddle.sh" ]]
    then
        testFiddleShell || exit $?;
    else
        # Verify parameter count is 2
        if [ "$#" -lt 2 ]; then  exit 86; fi

        # Verify that the target fiddle directory exists
        if [[ ! -d "${fiddlePath}" ]]; then exit 89; fi

        # Verify type parameter
        case ${fiddleType} in
            'jquery' | 'three' )
                cd bin
                runJsTestDriver "../${fiddlePath}";
                exit $?;
                ;;
            *)
                exit 86
        esac
    fi
)
#catch
_rc=$?
case ${_rc} in
    0)  if [[ "${fiddleType}" == "fiddle.sh" ]]
        then
            echo "All tests succeeded";
        else
            echo "The \"${fiddleName}\" ${fiddleType} fiddle has been tested successfully."
        fi
        ;;
    86) echo ""
        echo "Nope ~ Incorrect number of arguments"
        echo ""
        echo "Usage:"
        echo ""
        echo "$0 \"[t]\" \"[n]\""
        echo ""
        echo "[t] - type. Valid types include: "
        echo ""
        echo -e "\t\"jquery\"\tjQuery / Bootstrap Fiddle"
        echo ""
        echo "[n] - fiddle Name.  For example: \"fiddleParabolaSurface\""
        echo ""
        echo ""
        ;;
    87) echo "fubar! failed while attempting to delete \"${fiddlePath}\"."
        ;;
    88) echo "fubar! call to \"fiddle-index.sh\" for \"${fiddleType}\" failed."
        ;;
    89) echo "fubar! the target directory, \"${fiddlePath}\", doesn't exist."
        ;;
    *)  echo "fubar! Something went wrong."
        ;;
esac
#finally
exit ${_rc}
