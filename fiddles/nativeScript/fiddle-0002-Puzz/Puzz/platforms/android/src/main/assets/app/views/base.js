module.exports = {

    isEven: function(x) {
        return (x % 2) == 0;
    },

    isValid: function(sequence) {

        var inversionCounts = [],
            inversionSum = 0;


        sequence.map(function (a, x, arr) {
            var inversions = arr.filter(function (b, y) {
                return y > x && b < a;
            });

            if (inversions.length) {
                inversionCounts.push(inversions.length);
            } else {
                inversionCounts.push(0);
            }
        });

        inversionCounts.map(function (cnt) {
            inversionSum += cnt;
        });

        return this.isEven(inversionSum);
    },

    resizeButtons: function (view, parent, btnIds, cols, rows) {
        var pageWidth = parent.getMeasuredWidth(),
            pageHeight = parent.getMeasuredHeight(),
            btnWidth = Math.floor((pageWidth-26) / cols),
            btnHeight = Math.floor((pageHeight-20) / rows);

        console.log('button width : ' + btnWidth);
        console.log('button height : ' + btnHeight);

        if (btnWidth > 0 && btnHeight > 0) {
            btnIds.forEach(function (id) {
                var btn = view.getViewById(parent, "btn" + id);
                if (btn) {
                    console.log('resizing ' + btn.id);
                    btn.width = btnWidth;
                    btn.height = btnHeight;
                }
            });
        } 
    },

    sequenceButtons: function(view, parent, btnIds, seq) {
        btnIds.forEach(function(id) {
            var btn = view.getViewById(parent, "btn" + id),
                seqKey = id - 1,
                seqValue = seq[seqKey];
            btn.text = seqValue;
        });
    },

    generateSequence: function(min, max, count) {
        var range = [],
            number = 0,
            matches = [],
            i = 0;

        while (i < count) {
            number = Math.floor(Math.random() * (max - min + 1)) + min;
            matches = range.filter(function (elem) {
                return elem == number;
            });
            if (matches.length == 0) {
                range.push(number);
                i++;
            }
        }

        return range;
    },

    generateGameSequence: function(min, max, count) {
        var sequence = this.generateSequence(min, max, count);
        while (!this.isValid(sequence)) {
            sequence = this.generateSequence(min, max, count);
        }
        return sequence;
    }
};

