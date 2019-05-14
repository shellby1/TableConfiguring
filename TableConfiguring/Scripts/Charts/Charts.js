import * as drawers from '/Scripts/Charts/Drawer.js';
import * as elements from '/Scripts/Charts/BaseElements.js'
export { DataTable, RadialDiagramm, CircularDiagram };
class DataTable {
    /**
     * Create new data table object
     * @param {Array[object]} Diagramm data as Array of data object() 
     */
    constructor(Data) {
        // Array of data objects
        this._table = Data;
        // Max row sum
        this._maxSum = 0;
        // Columns summ 
        this._colsSum = 0;
        // Row summ
        this._rowSum = Array.from(Array(this._table.length), () => 0);
        // Get data object property names
        var prms = Object.getOwnPropertyNames(this._table[0]);
        // Column names
        this._colNames = new Array(prms.length - 1);
        // Lable column name
        this._colLable = prms[0];
        // Column summ
        this._colSum = Array.from(Array(prms.length - 1), () => 0);
        // For each data parameters
        for (var i = 1; i < prms.length; i++) {
            // Set column names
            this._colNames[i - 1] = prms[i];
            // For each row 
            for (var j = 0; j < this._table.length; j++) {
                // Set rowSum per row
                this._rowSum[j] += this._table[j][this._colNames[i - 1]];
                // Set colSum per column
                this._colSum[i-1] += this._table[j][this._colNames[i-1]];
                // Set maxSum
                if (this._rowSum[j] > this._maxSum)
                    this._maxSum = this._rowSum[j];
            }
            this._colsSum += this._colSum[i-1];
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
    // Get column summ array
    get colSum(){
        return this._colSum;
    }
    // Get columns summ
    get colsSum(){
        return this._colsSum;
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
        this._name = null;
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
    constructor(Container, Name, Width, Data, ColorMap) {
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
class CircularDiagram extends _baseDiagramm {
    constructor(Container, Name, Width, Data, ColorMap) {
        super(Container, Width, Width, Data, ColorMap);
        // Translate origin to center
        this._drawer.translateSelf(this._center_x, this._center_y, 0);
        this._name = new elements.Text(this._drawer, -Name.length * 10, -20, 0, Name, 40);
        // Sector items with lables
        this._sectors = [];
        // Object data parameters (column names)
        var prms = this._data.colNames;
        // Sector start, end, mid angle
        var sf = 0;
        var ef = 0;
        var mf = 0;
        var wf = 0;
        // Scale by max data sum
        var scl = (this._drawer.width / 2 - 20) / this._data.maxSum;
        // Outer radiuse
        var outer_r = this._data.maxSum * scl;
        // For each row in data draw sector
        for (var d = 0; d < this._data.length; d++) {
            var row = this._data.table[d];
            var secL = 360 * this._data.rowSum[d] / this._data.colsSum;
            var sum = this._data.rowSum[d];
            // Find sector start, end, mid angle
            sf = ef;
            ef += secL;
            wf = ef - sf;
            mf = (ef + sf) / 2;
            // Init delta per column
            var dlt_c = sum;
            // Text posion
            var t_x = outer_r * Math.cos(drawers._validation.getRadial(mf));
            var t_y = outer_r * Math.sin(drawers._validation.getRadial(mf))
            // Sector per row
            var sector = {sectors: [], lable: new elements.Text(this._drawer, t_x, t_y, 0, this._data.table[d][this._data._colLable].name, 20)};
            // Iterate all parameters (data columns) per row
            for (var i = 0; i < prms.length; i++) {
                // Get value per row d and column i
                var dlt = drawers._validation.getDecimal(row[prms[i]]);
                // Draw sector if data is not 0
                if (dlt != 0) {
                    // Sector per column in row 
                    sector.sectors.push(new elements.Sector(this._drawer, 0, 0, sf, wf, (dlt_c - dlt) * outer_r / sum, dlt_c * outer_r / sum, this._colorMap[i]));
                }
            }
            // Add sector to sector items
            this._sectors.push(sector);
        }
    }
    Draw() {
        // Draw sectors per row
        for (var s = 0; s < this._sectors.length; s++) {
            // Draw sectors per column
            for (var t = 0; t < this._sectors[s].sectors.length; t++) {
                console.log(this._sectors[s].sectors[t]);
                this._sectors[s].sectors[t].Draw();
            }
            // Sectors list per column
            this._sectors[s].lable.Draw();
        }
        this._name.Draw();
    }
}