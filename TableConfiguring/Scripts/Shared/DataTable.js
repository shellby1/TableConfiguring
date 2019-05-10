class DataTable {
    /**
     * Create new data table object
     * @param {Array[object]} Diagramm data as Array of data object() 
     */
    constructor(Data) {
        this._table = Data;
        this._maxSum = 0;
        this._rowSum = new Array(Data.length);
        this._colNames = new Array(Data.length);
        // Get data object property names
        var prms = Object.getOwnPropertyNames(this._table[0]);
        // For each data parameters
        for(var i = 1; i < prms.length; i++){
            // Set column names
            this._colNames[i-1] = prms[i];
            // For each row 
            for(var j=0;j<this._table.length; j++){
                // Set rowSum per row
                this._rowSum[j] += this._table[j][this._colNames[i-1]];
                // Set maxSum
                if(this._rowSum[j] > this._maxSum)
                    this._maxSum = this._rowSum[j];
            }
        }
    }
    // Get data array
    get table(){
        return this._table;
    }
    // Get max row summ
    get maxSum(){
        return this._maxSum;
    }
    // Get row summ array
    get rowSum(){
        return this._rowSum;
    }
    // Get data array length
    get length(){
        return this._table.length;
    }
}
