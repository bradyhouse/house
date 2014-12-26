#!/bin/bash
#try
(
    # If no arguments specified - exit 86 ~ usage
    if [ $# -ne "2" ]; then exit 86; fi
    extjs_class_file=$1
    jasmine_stub_file=$2

    # If the file doesn't exist - exit 87 ~ extjs class doesn't exist
    if [[ ! -e $extjs_class_file ]]; then exit 87; fi

    # Get the Class Name from the file ~ grep for "define" and then split
    extjs_class_name=$(cat ${extjs_class_file} | grep "define" | tr "(" "\n" | tr "," "\n" | tr "'\"" "\n" | sed -n '3p' | sed -e 's/^[ ]*//')
    if [[ -z ${extjs_class_name} ]]; then exit 88; fi

    # If the class name is a single character - exit 89
    extjs_class_name_len=$(echo "${extjs_class_name}" | wc -c;)
    if [[ $extjs_class_name_len -le "3" ]]; then exit 89; fi

    # Generate the jasmine stub file
    cp -rf "tpl/jasmine_stub_header.js" ${jasmine_stub_file} || exit 90
    $(echo -en '\n' >> ${jasmine_stub_file};) || exit 90
    $(cat "tpl/jasmine_stub_body.js" >> ${jasmine_stub_file};) || exit 90
    $(./house.substr '{{classname}}' ${extjs_class_name} ${jasmine_stub_file};) || exit 90
)
#catch
case $? in
    0)  echo "stubbed $1"
        ;;
    86) echo ""
        echo "Jasmine Stub Generation Tool"
        echo ""
        echo "Usage:"
        echo ""
        echo "       $0 \"[e]\" \"[s]\""
        echo ""
        echo "       [e] - ExtJS Class File"
        echo "       [s] - Jasmine Stub File"
        echo ""
        ;;
    87) echo "FUBAR ~ The specified extjs class file doesn't exist"
        ;;
    88) echo "FUBAR ~ Failed while attempting to parse ExtJS class name.  Possibly js-beautify that b!#~%."
        ;;
    89) echo "FUBAR ~ ExtJS class file is badly formatted or incompatible. Verify that the class is defined using single and not double quotes."
        ;;
    90) echo "FUBAR ~ Failed while trying to write the Jasmine stub file. Can you say \" Per-mis-sions\"."
        ;;
    *)  echo "An unknown error has occurred. Haaa-Ha! You Win :)"
        ;;
esac