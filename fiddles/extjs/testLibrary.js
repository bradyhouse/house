var testLibrary = {
	baseTreePanel: function(t) {
		var treepanel = null, root = null;
		var getCheckBoxByRecord = function(child) {
			var row = getRowByRecord(child);
			var checkBox = row.down('td:first-child').child('div').child('input');
			return checkBox;
		};
		var getExpanderByRecord = function(child) {
			var row = getRowByRecord(child);
			var expander = row.down('td:first-child').child('div').child('img[class~=x-tree-expander]');
			return expander;
		};
		var getViewNodeByRecord = function(child) {
			var node = treepanel.getView().getNodeByRecord(child);
			return node;
		};
		var getRowByRecord = function(child) {
			var viewRange = treepanel.getView().getViewRange();
			var node = getViewNodeByRecord(child);
			var headNode = getViewNodeByRecord(viewRange[0]);

			var rowIndex = node.getAttribute('data-recordindex') - headNode.getAttribute('data-recordindex');
			var row = t.getRow(treepanel, rowIndex);

			return row;
		};
		var isCheckBoxChecked = function(checkBox) {
			var checkBoxClass = checkBox.getAttribute('class');
			return (checkBoxClass.indexOf('x-tree-checkbox-checked') !== -1);
		};
		var check_helper =  function(child, tocheck, callback) {
			var checkBox = getCheckBoxByRecord(child);		
			var checked = isCheckBoxChecked(checkBox);

			if(checked === tocheck) {
				callback();
			}	
			else {
				t.click(checkBox, callback);
			}
		};
		var expand_helper =  function(child, toexpand, callback) {
			var expander = getExpanderByRecord(child);
			t.click(expander, callback);
		};
		return {
			check: function(child, callback) {
				check_helper(child, true, callback);
			},
			expand: function(child, callback) {
				expand_helper(child, true, callback);
			},
			findChildByText: function(text) {
				var root = this.root;
				var child = null;
				var childId = null;
				
				child = root.findChildBy(function(child) {
					if(child.data.clearingOrganizationId === text) {
						return true;
					}
				});
				return child;
			},
			set: function(query, callback) {
				var me = this;
				if(typeof query === 'string') {
	                treepanel = t.cq1(query);
					t.ok(treepanel, "treepanel is set");
                }
                else {
                    treepanel = query;
                }
				me.root = treepanel.getRootNode();
				t.waitForRowsVisible(treepanel, callback);
			},
			verifyChildrenDisplayedAndChecked: function(children) {
				var childrenDisplayedAndChecked = true;
				for(var i = 0; i < children.length; i += 1) {
					var viewNode = getViewNodeByRecord(children[i]);
					if(!viewNode) {
						childrenDisplayedAndChecked = false;
						break;
					}
					var checkBox = getCheckBoxByRecord(children[i]);
					if(!isCheckBoxChecked(checkBox)) {
						childrenDisplayedAndChecked = false;
						break;
					}

				}
				t.ok(childrenDisplayedAndChecked, 'All children are displayed and checked');
			},
			verifyChildrenDisplayed: function(children) {
				var childrenDisplayed = true;
				for(var i = 0; i < children.length; i += 1) {
					var viewNode = getViewNodeByRecord(children[i]);
					if(!viewNode) {
						childrenDisplayed = false;
						break;
					}
				}
				t.ok(childrenDisplayed, 'All children are displayed');
			}
		}
	},
	measureFirms: function(t) {
		var me = this;
		var measureFirmInstance = me.baseTreePanel(t);
		measureFirmInstance.select = function(clearingOrganizationId, clearingMemberFirmId, callback) {
			var me = this;
			var child = me.findChild(clearingOrganizationId, clearingMemberFirmId);
			me.check(child, callback);
		};
		measureFirmInstance.selectToExpand = function(clearingOrganizationId, clearingMemberFirmId, callback) {
			var me = this;
			var child = me.findChild(clearingOrganizationId, clearingMemberFirmId);
			if(child.isExpanded()) {
				callback()
			}
			else {
				me.expand(child, callback);
			}
		};
		measureFirmInstance.findChild = function(clearingOrganizationId, clearingMemberFirmId) {
			var root = this.root;
			var child = null;
			var childId = null;
			
			child = root.findChildBy(function(child) {
				if(child.data.clearingOrganizationId === clearingOrganizationId && child.data.clearingMemberFirmId === clearingMemberFirmId) {
					return true;
				}
			});
			return child;
		};
		measureFirmInstance.callChildVerifyChildrenDisplayed = function(clearingOrganizationId, clearingMemberFirmId) {
			var me = this;
			//var oldVerify = me.verifyChildrenDisplayed;
			var child = me.findChild(clearingOrganizationId, clearingMemberFirmId);
			var children = child.childNodes;
			t.ok(children, child.data.text + ' has children to display');
			me.verifyChildrenDisplayed(children);
		};
		measureFirmInstance.callChildVerifyChildrenDisplayedAndChecked = function(clearingOrganizationId, clearingMemberFirmId) {
			var me = this;
			var child = me.findChild(clearingOrganizationId, clearingMemberFirmId);
			var children = child.childNodes;
			t.ok(children, child.data.text + ' has children to verify checked');
			me.verifyChildrenDisplayedAndChecked(children);
		};
		return measureFirmInstance;
	},
	measureChart: function(t) {
        var measurechart = null;
        return {
            set: function(chartItemId, callback) {
                var query = null;
                if(typeof chartItemId === 'string') {
                    query = "measurepanel[itemId='" + chartItemId +"']";
                    t.waitForCQvisible(query, function() {
                        measurechart = t.cq1(query);
                        callback();
                    })
                }
                else {
                    measurechart = chartItemId;
                    callback();
                }
            },
            findAxis: function(position) {
                var axis = null;
                measurechart.axes.items.forEach(function(item) {
                    if(item.position == position)
                        axis = item;
                })
                return axis;
            },
            labelsVisible: function(axis) {
                if(!axis)
                    return false;
                var visible = true;
                axis.labelGroup.items.forEach(function(item) {
                    if(item.attr.hidden) {
                        visible = false;
                    }
                });
                return visible;
            },
            verifyLabelsVisibleAndCorrect: function(labels) {
                var leftAxis = this.findAxis('left');
                var rightAxis = this.findAxis('right');
                var leftVisible = this.labelsVisible(leftAxis);
                var rightVisible = this.labelsVisible(rightAxis);
                var visible = leftVisible && rightVisible;
                t.ok(visible, 'Both left and right axis labels are visible');
                t.isDeeply(this.itemsToTextArray(leftAxis.labelGroup.items), labels, 'left labels are as ' + labels);
                t.isDeeply(this.itemsToTextArray(rightAxis.labelGroup.items), labels,  'right labels are as ' + labels);
            },
            itemsToTextArray: function(items) {
                var array = [];
                items.forEach(function(item) {
                    array.push(item.text);
                });
                return array;
            },
            gridTrue: function() {
                var leftAxis = this.findAxis('left');
                var rightAxis = this.findAxis('right');
                var gridTrue = leftAxis && rightAxis && (leftAxis.grid || rightAxis.grid);
                t.ok(gridTrue, 'at least one of the axis draw grid')
            },
            numLine: function() {
                var path = measurechart.axes.items[0].gridLines.path;
                var num = 0;
                path.forEach(function(line) {
                    if(line == 'M') {
                        num += 1;
                    }
                });
                return num;
            },
            checkZerolineOverlap: function() {
                var zeroLine = measurechart.axes.items[0].zeroLine;
                t.ok(zeroLine, 'zero line exist');
                var path = zeroLine.path;
                var gridPath = measurechart.axes.items[0].gridLines.path;
                var index = Math.floor((gridPath.length/path.length)/2);
                var middlePath = []
                for(var i = 0; i < path.length; i++) {
                    middlePath.push(gridPath[index*path.length+i]);
                }
                t.isDeeply(path, middlePath, 'zero index line path overlaps with "zeroline" path');
            },
            zeroLineColor: function() {
                var zeroLine = measurechart.axes.items[0].zeroLine;
                return zeroLine.stroke;
            }

        }
    }
}