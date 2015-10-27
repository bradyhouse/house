This command creates horizontal mirror images of a folder of images and/or
sprites. This command requires some name consistency in order to differentiate
output files from input files and the geometry of sprites.

Sprites must have a name segment that looks like "4x3" to define its geometry.
This is understood as "columns" x "rows" or, in this example, 4 columns and 3
rows.

The following examples all fit this pattern:

 * tools-2x12.png
 * sprite_12x3.gif
 * some-3x5-sprite.png

The input files and output files are separated by a suffix that must be given.
The output files will be produced from the input files applying the suffix. By
default, the output files are written to the same folder as the input files.
This can be changed by specifying "-out".

For example:

    sencha fs mirror all -r -suffix=-rtl /path/to/images

The above command performs the following:

 * Scans `"/path/to/images"` (and all sub folders due to `-r`) for images.
 * Any image not ending in `"-rtl"` is considered an input file.
 * Any input image with sprite geometry in its name has its cells flipped.
 * Other input images are entirely flipped.
 * The input files are written using their original name plus the suffix.
 * Up-to-date checks are made but can be skipped by passing `-overwrite`.
 * Files are written to `"/path/to/images"`.

By passing the `-format` switch, the format of the output images can be set
to be other than the same format as the original file. For example, one could
convert PNG files to GIF by passing `-format=gif`. This does only basic image
conversion and no advanced image processing. Simple color quantization can be
enabled using `-quantize`.

For example:

    sencha fs mirror all all -format=gif -ext=png -quantize -out=/out/dir \
         -suffix=-rtl /some/pngs

The above command will process all `"png"` images and will write out their
`"gif"` versions (using color quantization) to a different folder.

