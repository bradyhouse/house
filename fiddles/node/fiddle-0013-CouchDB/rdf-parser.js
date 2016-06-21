'use strict';
const
  fs = require('fs'),
  cheerio = require('cheerio');

module.exports = function(filename, callback) {
    fs.readFile(filename, function(err, data){
        if (err) { return callback(err); }
        let
          $ = cheerio.load(data.toString(), {
              normalizeWhitespace: true,
              xmlMode: true
          }),
          collect = function(index, elem) {
              return $(elem).text();
          };

        callback(null, {
            _id: $('pgterms\\:ebook').attr('rdf:about').replace('ebooks/', ''),
            title: $('dcterms\\:title').text(),
            authors: $('pgterms\\:name').map(collect).toArray(),
            subjects: $('[rdf\\:resource$="/LCSH"] ~ rdf\\:value').map(collect).toArray()
        });
    });
};
