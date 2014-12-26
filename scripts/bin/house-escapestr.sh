if [ $# -ne "1" ]
then
  echo ""
  echo "escape string"
  echo ""
  echo "Usage:"
  echo ""
  echo "       $0 \"[d]\" \"[c]\""
  echo ""
  echo "       [d] - directory"
  echo "       [c] - filename delete criteria"
  echo ""
  exit 86
fi
echo $1 | sed -e 's/[]\/$*.^|[]/\\&/g'
