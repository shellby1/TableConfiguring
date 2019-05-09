class Drawer {
    /**
     * Create new canvas element in container with base functionality
     * @param {htmlElement} Container
     * @param {integer} Width Canvas width in pixels
     * @param {integer} Height Canvas height in pixels
     * @param {string} BackgroundColor Canvas background color. Use all valide css colors
     */
    constructor(Container, Width, Height, BackgroundColor) {
        // Container html element
        this._container = Container;
        // Canvas context
        this._ctx = null;
        // Current origin x
        this._x = 0;
        // Current origin y
        this._y = 0;
        // Current origin angel
        this._angle = 0;
        // Initialize canvas context
        this._createCanvas(Width, Height, BackgroundColor);
        this._ctx.translate(0, Height);
    }
    // Create canvas context (ctx) set color and dimentions
    _createCanvas(width, height, backgroundColor) {
        // Create canvas htmlelement
        var canvas = document.createElement('canvas');
        // Set canvas dimentions
        canvas.width = width;
        canvas.height = height;
        // Create canvas context
        this._ctx = canvas.getContext('2d');
        // Set canvas backGround color
        if (backgroundColor != null)
            canvas.style.backgroundColor = backgroundColor;
        //
        // Append canvas html element to container
        this._container.appendChild(canvas);
    }
    // Get background color.
    get backGroundColor() {
        return this._ctx.canvas.style.backgroundColor;
    }
    // Set background color
    set backGroundColor(color) {
        this._ctx.canvas.style.backgroundColor = color;
    }
    // Get current origin x
    get currentOriginX() {
        return this._x;
    }
    // Set current origin x
    set currentOriginX(X) {
            var int_x = _validation.getInt(X);
            this._ctx.translate(int_x, 0);
            this._x = int_x;
    }
    // Get current origin y
    get currentOriginY() {
        return this._y;
    }
    // Set current origin y
    set currentOriginY(Y) {
            var int_y = _validation.getInt(Y);
            this._ctx.translate(0, this._ctx.canvas.height - int_y);
            this._y = int_y;
    }
    // Get current origin angle
    get currentOriginAngle() {
        return this._angle * 180 / Math.PI;
    }
    // Set current origin angle
    set currentOriginAngle(A) {
        this._angle = _validation.getRadial(A);
    }
    // Get canvas width
    get width(){
        return this._ctx.canvas.width;
    }
    // Set canvas width
    set width(w){
        this._ctx.canvas.width = _validation.getInt(w);
    }
    // Get canvas width
    get height(){
        return this._ctx.canvas.width;
    }
    // Set canvas width
    set height(h){
        this._ctx.canvas.height = _validation.getInt(h);
    }
    /**
     * Clear canvas field.
     */
    clrearCanvas() {
        this._ctx.save();
        // Get canvas dimentions
        var x = this._ctx.canvas.width;
        var y = this._ctx.canvas.height;
        // Set current origin to global origin
        this._ctx.translate(-this._x, -y + this._y);
        // Clear context field
        this._ctx.clearRect(0, 0, x, y);
        this._ctx.restore();
    }
    saveCanvas() {
        this._ctx.save();
    }
    restoreCanvas() {
        this._ctx.restore();
    }
    /**
     * Translate current coordinate system by default to center of canvas element
     * @param {integer} dx Horisontal increment in pixels
     * @param {integer} dy Vertical increment in pixels
     */
    translateSelf(dx, dy, ) {
        this.currentOriginX += dx;
        this.currentOriginY += dy;
    }
    /**
     * Draw arc by center, radiuse, start end angle in anticlockwise direction
     * @param {integer} x Horisontal position in pixels
     * @param {integer} y Vertical position in pixels
     * @param {degree} sA Start angle
     * @param {degree} eA End angle
     * @param {string} color Arc color. Use all valid css colors
     * @param {bolean} fill Arc fill color. Use all valid css colors
     */
    Arc(x, y, r, sA, eA, color, fill = false) {
        // Get valid number values
        var int_x = _validation.getInt(x);
        var int_y = - _validation.getInt(y);
        var int_r = _validation.getInt(r);
        var rad_sA = - _validation.getRadial(sA);
        var rad_eA = - _validation.getRadial(eA);
        var str_color = _validation.isNullOrEmpty(color);
        // Draw arc
        this._ctx.beginPath();
        this._ctx.arc(int_x, int_y, int_r, rad_sA, rad_eA, true);
        if(fill){
            this._ctx.fillStyle = str_color;
            this._ctx.fill();
        }
        else{
            this._ctx.strokeStyle = str_color;
            this._ctx.stroke();
        }
    }
     /**
     * Draw sector by center, radiuse, start end angle in anticlockwise direction
     * @param {integer} x Horisontal position in pixels
     * @param {integer} y Vertical position in pixels
     * @param {degree} sA Start angle
     * @param {degree} eA End angle
     * @param {string} color Arc color. Use all valid css colors
     * @param {bolean} fill Arc fill color. Use all valid css colors
     */
    Sector (x, y, r, sA, eA, color, fill = false) {
        var int_x = _validation.getInt(x);
        var int_y = - _validation.getInt(y);
        var int_r = _validation.getInt(r);
        var rad_sA = - _validation.getRadial(sA);
        var int_x_sA = int_x + int_r * Math.cos(rad_sA);
        var int_y_sA = int_y + int_r * Math.sin(rad_sA);
        var rad_eA = - _validation.getRadial(eA);
        var int_x_eA = int_x + int_r * Math.cos(rad_eA);
        var int_y_eA = int_y + int_r * Math.sin(rad_eA);
        var str_color = _validation.isNullOrEmpty(color);
        // Draw sector
        this._ctx.beginPath();
        this._ctx.moveTo(int_x, int_y);
        this._ctx.lineTo(int_x_sA, int_y_sA);
        this._ctx.arc(int_x, int_y, int_r, rad_sA, rad_eA, true);
        this._ctx.closePath();
        if(fill){
            this._ctx.fillStyle = str_color;
            this._ctx.fill();
        }
        else{
            this._ctx.strokeStyle = str_color;
            this._ctx.stroke();
        }
    }
    /**
     * Draw line by start end points
     * @param {integer} x1 Horizontal start point coordinate in pixels
     * @param {integer} y1 Vertical start point coordinate in pixels
     * @param {integer} x2 Horizontal end point coordinate in pixels
     * @param {integer} y2 Vertical end point coordinate in pixels
     * @param {string} color Line color. Use all valid css colors
     * @param {integer} thikness Line thikness in pixels 
     */
    LineByStartEnd (x1, y1, x2, y2, color, thikness = 1) {
        // Get valid number values
        var int_x1 = _validation.getInt(x1);
        var int_y1 = - _validation.getInt(y1);
        var int_x2 = _validation.getInt(x2);
        var int_y2 = - _validation.getInt(y2);
        var str_color = _validation.isNullOrEmpty(color);
        // Draw line
        this._ctx.beginPath();
        this._ctx.strokeStyle = str_color;
        this._ctx.lineWidth = thikness;
        this._ctx.moveTo(int_x1, int_y1);
        this._ctx.lineTo(int_x2, int_y2);
        this._ctx.stroke();
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
        this._drawer = new Drawer(Container, Width, Height, BackgroundColor);
        this._data = Data;
        this._colorMap = ColorMap;
        this._x = this._drawer.width / 2;
        this._y = this._drawer.height / 2;
        this._angle = 0;
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
        var prms = Object.getOwnPropertyNames(this._data[0]);
        var maxSum = 0;
        this._data.forEach(function (elem) {
            var sum = 0;
            for (var i = 1; i < prms.length; i++) {
                sum += _validation.getDecimal(elem[prms[i]]);
            }
            if (sum > maxSum)
                maxSum = sum;
        });
        return maxSum;
        //this._drawer.Sector(this._center_x, this._center_y);
    }
}
class _elemBase{
    /**
     * Create base element object
     * @param {Drawer} Drawer Main elemnt drawer object reference
     * @param {number} cX Element center horizontal position
     * @param {number} cY Element center vertical position
     * @param {number} cA Element horizontal axis angele (anticlockwise)
     */
    constructor(Drawer, cX, cY, cA) {
        if (Drawer.constructor.name == 'Drawer')
            this._drawer = Drawer;
        this._cX = _validation.getInt(cX);
        this._cY = _validation.getInt(cY);
        this._cA = _validation.getRadial(cA);
    }
    // Get element center horizontal position
    get centerX() {
        return this._cX;
    }
    // Set element center position
    set centerX(val) {
        this._cX = _validation.getInt(val);
    }
    // Get element center vertical position
    get centerY() {
        return this._cY;
    }
    // Set element center vertical position
    set centerY(val) {
        this._cY = _validation.getInt(val);
    }
    // Get element center horizontal axis orientation
    get centerA() {
        return this._cA * 180 / Math.PI;
    }
    // Set element center horizontal axis orientation
    set centerA(val) {
        this._cA = _validation.getRadial(val);
    }
}
class Point extends _elemBase {
    /**
     * Create object of point
     * @param {Drawer} Drawer Main elemnt drawer object reference
     * @param {integer} X Pointh horizontal coordinate
     * @param {integer} Y Point vertical coordinate
     * @param {degrement} A Point horizontal axis angle
     * @param {'arc','crl','rec','rmb'} Form Point form type {} 
     */
    constructor(Drawer, X, Y, A, Form) {
        // Coordinates
        super(Drawer, X, Y, A);
        // Type of point
        this._form = 'arc';
        if (isNaN(Form))
            this.Form(Form);
    }
    // Get point form type
    get Form() {
        return this._type;
    }
    // Set point form type
    set Form(form) {
        switch (form) {
            case 'arc':
            case 'crl':
            case 'rec':
            case 'rmb':
                this._form = form;
                break;
            default:
                throw 'Argument will be "arc", "crl", "rec" or "rmb"';
        }
    }
    // Draw point
    Draw() {
        var drw = this._drawer;
        drw.saveCanvas();

        drw.restoreCanvas();
    }
}
class line {
    /**
     * Create object of line
     */
    constructor(x1, y1, x2, y2, thikness = 1) {
        this.int_x1 = _validation.getInt(x1);
        this.int_y1 = _validation.getInt(y1);
        this.int_x2 = _validation.getInt(x2);
        this.int_y2 = _validation.getInt(y2);
    }
}
class arc {
    /**
     * Create describtion obbject of arc
     * 
     */
    constructor() {
        // Arc center
        this._x = 0;
        this._y = 0;
        // Arc radiuse
        this._radiuse;
        // Arc boundary condition
        this._startAngle = 0;
        this._endaAngle = 0;
        // Arc color
        this._color = '';
        // Arc fill color
        this._fillColor = '';
    }
    get X() {
        return this._x;
    }
    set X(X) {
        this._x = _validation.getInt(X);
    }
    get Y() {
        return this._y;
    }
    set Y(Y) {
        this._y = _validation.getInt(Y);
    }
}
class _validation {
    /** 
     * Get integer from string.
     * @param {string} value The string reprepresent a number
     */
    static getInt(value) {
        if (!isNaN(value))
            return parseInt(value);
        else
            throw 'Argument value=' + value + ' is not a number';
    }
    /**
     * Get decimal from string.
     * @param {string} value The string represent a number
     */
    static getDecimal(value) {
        if (!isNaN(value))
            return parseFloat(value);
        else
            throw 'Argument value=' + value + ' is not a number';
    }
    static getRadial(value) {
        if (!isNaN(value))
            return parseFloat(value) * Math.PI / 180;
        else
            throw 'Argument value=' + value + ' is not a number';
    }
    static getDegrement(value) {
        if (!isNaN(value))
            return parseFloat(value) * 180 / Math.PI;
        else
            throw 'Argument value=' + value + ' is not a number';
    }
    /**
     * Validate if string is null or empty
     */
    static isNullOrEmpty(value){
        switch(value){
            case undefined:
                throw 'Argument undefined';
                break;
            case '':
                throw 'Argument is empty';
                break;
            default:
                return value;
        }
    }
}