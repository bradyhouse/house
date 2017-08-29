describe('Sudoku', function() {

    describe("test 1", function() {
      it("should return true", function() {
        var grid = [[1,3,2,5,4,6,9,8,7],
            [4,6,5,8,7,9,3,2,1],
            [7,9,8,2,1,3,6,5,4],
            [9,2,1,4,3,5,8,7,6],
            [3,5,4,7,6,8,2,1,9],
            [6,8,7,1,9,2,5,4,3],
            [5,7,6,9,8,1,4,3,2],
            [2,4,3,6,5,7,1,9,8],
            [8,1,9,3,2,4,7,6,5]],
            expected = true,
            output = app.sudoku(grid);
        expect(output).toEqual(expected);
      });
    });

    describe("test 2", function() {
      it("should return false", function() {
        var grid = [[1,3,2,5,4,6,9,2,7],
            [4,6,5,8,7,9,3,8,1],
            [7,9,8,2,1,3,6,5,4],
            [9,2,1,4,3,5,8,7,6],
            [3,5,4,7,6,8,2,1,9],
            [6,8,7,1,9,2,5,4,3],
            [5,7,6,9,8,1,4,3,2],
            [2,4,3,6,5,7,1,9,8],
            [8,1,9,3,2,4,7,6,5]],
          expected = false,
          output = app.sudoku(grid);
        expect(output).toEqual(expected);
      });
    });

    describe("test 3", function() {
      it("should return false", function() {
        var grid = [[1,3,4,2,5,6,9,8,7],
            [4,6,8,5,7,9,3,2,1],
            [7,9,2,8,1,3,6,5,4],
            [9,2,3,1,4,5,8,7,6],
            [3,5,7,4,6,8,2,1,9],
            [6,8,1,7,9,2,5,4,3],
            [5,7,6,9,8,1,4,3,2],
            [2,4,5,6,3,7,1,9,8],
            [8,1,9,3,2,4,7,6,5]],
          expected = false,
          output = app.sudoku(grid);
        expect(output).toEqual(expected);
      });
    });

  describe("test 4", function() {
    it("should return false", function() {
      var grid = [[1,3,2,5,4,6,9,8,7],
          [4,6,5,8,7,9,3,2,1],
          [7,9,8,2,1,3,6,5,4],
          [9,2,1,4,3,5,8,7,6],
          [3,5,4,7,6,8,2,1,9],
          [6,8,7,1,9,2,5,4,3],
          [5,4,6,9,8,1,4,3,2],
          [2,7,3,6,5,7,1,9,8],
          [8,1,9,3,2,4,7,6,5]],
        expected = false,
        output = app.sudoku(grid);
      expect(output).toEqual(expected);
    });
  });


});
