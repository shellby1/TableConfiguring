import * as drawers from '/Scripts/Charts/Drawer.js';
import * as elements from '/Scripts/Charts/BaseElements.js'
export { DataTable, RadialDiagramm };
class DataTable {
    /**
     * Create new data table object
     * @param {Array[object]} Diagramm data as Array of data object() 
     */
    constructor(Data) {
        this._table = Data;
        this._maxSum = 0;
        this._rowSum = Array.from(Array(this._table.length), () => 0);
        // Get data object property names
        var prms = Object.getOwnPropertyNames(this._table[0]);
        // Column names
        this._colNames = new Array(prms.length - 1);
        // For each data parameters
        for (var i = 1; i < prms.length; i++) {
            // Set column names
            this._colNames[i - 1] = prms[i];
            // For each row 
            for (var j = 0; j < this._table.length; j++) {
                // Set rowSum per row
                this._rowSum[j] += this._table[j][this._colNames[i - 1]];
                // Set maxSum
                if (this._rowSum[j] > this._maxSum)
                    this._maxSum = this._rowSum[j];
            }
        }
    }
    // Get data array
    get table() {
        return this._table;
    }
    // Get max row summ
    get maxSum() {
        return this._maxSum;
    }
    // Get row summ array
    get rowSum() {
        return this._rowSum;
    }
    // Get table column names
    get colNames() {
        return this._colNames;
    }
    // Get data array length
    get length() {
        return this._table.length;
    }
}
class _baseDiagramm {
    /**
     * Create new canvas element in container with base functionality
     * @param {htmlElement} Container
     * @param {integer} Width Canvas width in pixels
     * @param {integer} Height Canvas height in pixels
     * @param {Array[object]} Data Chart data as Array of data object()
     * @param {Array[string]} ColorMap Chart color map. Use all valid css colors
     * @param {string} BackgroundColor Canvas background color. Use all valide css colors
     */
    constructor(Container, Width, Height, Data, ColorMap, BackgroundColor) {
        this._drawer = new drawers.Drawer(Container, Width, Height, BackgroundColor);
        this._data = Data;
        this._colorMap = ColorMap;
        this._center_x = this._drawer.width / 2;
        this._center_y = this._drawer.height / 2;
        this._angle = 0;
        this._img = null;
    }
}
class RadialDiagramm extends _baseDiagramm {
    /**
     * Create new canvas element in container with base functionality
     * @param {htmlElement} Container
     * @param {integer} Width Canvas width in pixels
     * @param {Array[object]} Data Chart data as Array of data object()
     * @param {Array[string]} ColorMap Chart color map. Use all valid css colors
     * @param {string} BackgroundColor Canvas background color. Use all valide css colors
     */
    constructor(Container, Width, Data, ColorMap) {
        super(Container, Width, Width, Data, ColorMap);
    }
    Draw() {
        // Object data parameters (column names)
        var prms = this._data.colNames;
        // For each row in data draw sector
        for (var d = 0; d < this._data.length; d++) {
            var row = this._data.table[d];
            var secL = 360 / this._data.length;
            var sum = this._data.rowSum[d];
            // Find sector start end angle
            var sf = d * secL;
            var ef = (d + 1) * secL;
            // Scale by max data sum
            var scl = (this._drawer.width / 2 - 20) / this._data.maxSum;
            // Iterate all parameters (data columns) per row
            for (var i = 0; i < prms.length; i++) {
                // Get value per row d and column i
                var dlt = drawers._validation.getDecimal(row[prms[i]]);
                // Draw sector if data is not 0
                if (dlt != 0) {
                    this._drawer.Sector(this._center_x, this._center_y, (sum - dlt) * scl, sum * scl, sf, ef, this._colorMap[i], true);
                    sum -= dlt;
                }
            }
        }
        // Save curr img
        this._img = this._drawer.getImgData(this._drawer._x, this._drawer._y, this._drawer.width, this._drawer.height);
    }
}