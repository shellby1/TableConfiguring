export { Drawer, _validation };
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
        this._x += int_x;
    }
    // Get current origin y
    get currentOriginY() {
        return this._y;
    }
    // Set current origin y
    set currentOriginY(Y) {
        var int_y = _validation.getInt(Y);
        this._ctx.translate(0, - int_y);
        this._y += int_y;
    }
    // Get current origin angle
    get currentOriginAngle() {
        return this._angle * 180 / Math.PI;
    }
    // Set current origin angle
    set currentOriginAngle(A) {
        var int_A = _validation.getRadial(A);
        this._ctx.rotate(- int_A)
        this._angle += int_A;
    }
    // Get canvas width
    get width() {
        return this._ctx.canvas.width;
    }
    // Set canvas width
    set width(w) {
        this._ctx.canvas.width = _validation.getInt(w);
    }
    // Get canvas width
    get height() {
        return this._ctx.canvas.height;
    }
    // Set canvas width
    set height(h) {
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
     * Get image data from start at x,y and width w and height h
     * @param {any} x Image bottom left corner horizontal coordinate
     * @param {any} y Image bottom left corner vertical coordinate
     * @param {any} w Image width
     * @param {any} h Image height
     */
    getImgData(x, y, w, h) {
        var int_x = _validation.getInt(x);
        var int_y = _validation.getInt(y);
        var int_w = _validation.getInt(w);
        var int_h = _validation.getInt(h);
        return this._ctx.getImageData(int_x, int_y, int_w, int_h);
    }
    /**
     * Translate current coordinate system by default to center of canvas element
     * @param {integer} dx Horisontal increment in pixels
     * @param {integer} dy Vertical increment in pixels
     * @param {decimal} angle Horizontal axes angle
     */
    translateSelf(dx, dy, angle) {
        this.currentOriginX = dx;
        this.currentOriginY = dy;
        this.currentOriginAngle = angle;
    }
    /**
     * Draw arc by center, radiuse, start end angle in anticlockwise direction
     * @param {integer} x Horisontal position in pixels
     * @param {integer} y Vertical position in pixels
     * @param {integer} r Arc radiuse
     * @param {degree} sA Start angle
     * @param {degree} eA End angle
     * @param {string} color Arc color. Use all valid css colors
     * @param {int} th Arc line thickness
     * @param {boolean} fill Arc fill color. Use all valid css colors
     */
    Arc(x, y, r, sA, eA, color, th, fill = false) {
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
        if (fill) {
            this._ctx.fillStyle = str_color;
            this._ctx.fill();
        }
        else {
            this._ctx.lineWidth(th);
            this._ctx.strokeStyle = str_color;
            this._ctx.stroke();
        }
    }
    /**
    * Draw sector by center, radiuse, start end angle in anticlockwise direction
    * @param {integer} x Horisontal position in pixels
    * @param {integer} y Vertical position in pixels
    * @param {degrement} r1 First curve radiuse
    * @param {degrement} r2 Second curve radiuse
    * @param {degree} sA Start angle
    * @param {degree} eA End angle
    * @param {string} color Arc color. Use all valid css colors
    * @param {bolean} fill Arc fill color. Use all valid css colors
    */
    Sector(x, y, r1, r2, sA, eA, color, fill = false) {
        var int_x = _validation.getInt(x);
        var int_y = - _validation.getInt(y);
        var int_r1 = _validation.getInt(r1);
        var int_r2 = _validation.getInt(r2);
        var rad_sA = - _validation.getRadial(sA);
        var int_x_sA = int_x + int_r1 * Math.cos(rad_sA);
        var int_y_sA = int_y + int_r1 * Math.sin(rad_sA);
        var rad_eA = - _validation.getRadial(eA);
        var int_x_eA = int_x + int_r2 * Math.cos(rad_eA);
        var int_y_eA = int_y + int_r2 * Math.sin(rad_eA);
        var str_color = _validation.isNullOrEmpty(color);
        // Draw sector
        this._ctx.beginPath();
        this._ctx.moveTo(int_x_sA, int_y_sA);
        this._ctx.arc(int_x, int_y, int_r1, rad_sA, rad_eA, true);
        this._ctx.lineTo(int_x_eA, int_y_eA);
        this._ctx.arc(int_x, int_y, int_r2, rad_eA, rad_sA);
        this._ctx.closePath();
        if (fill) {
            this._ctx.fillStyle = str_color;
            this._ctx.fill();
        }
        else {
            this._ctx.strokeStyle = str_color;
            this._ctx.stroke();
        }
    }
    /**
     * Draw rectangle by left bottom corner
     * @param {number} x1 Left bottom corner horizontal position
     * @param {number} y2 Left bottom corner vertical position 
     * @param {number} w Rectangle width
     * @param {number} h Rectangle height
     * @param {string} color Rectangle color
     * @param {number} th Line width
     * @param {boolean} fill Fill rectangle if true
     */
    rectangle(x1, y1, w, h, color, th, fill = false) {
        this._ctx.beginPath();
        this._ctx.lineWidth = th;
        if (fill) {
            this._ctx.fillStyle = color;
            this._ctx.fillRect(x1, - h - y1, w, h);
        }
        else {
            this._ctx.strokeStyle = color;
            this._ctx.strokeRect(x1, - h - y1, w, h);
        }
    }
    rhombus(x1, y1, w, h, color, th, fill = false) {
        this._ctx.beginPath();
        this._ctx.lineWidth = th;
        this._ctx.rotate(Math.PI / 2);
        if (fill) {
            this._ctx.strokeStyle = color;
            this._ctx.fillRect(x1, y1, w, h);
        }
        else {
            this._ctx.fillStyle = color;
            this._ctx.strokeRect(x1, -y1, w, h);
        }
        this._ctx.rotate(-Math.PI / 2);
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
    LineByStartEnd(x1, y1, x2, y2, color, thikness = 1) {
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
    /**
     * Get radian angle from string
     * @param {string} value The string represent an angle degrement
     */
    static getRadial(value) {
        if (!isNaN(value))
            return parseFloat(value) * Math.PI / 180;
        else
            throw 'Argument value=' + value + ' is not a number';
    }
    /**
     * Get degrement angle from string
     * @param {any} value The string represent an angle raidan
     */
    static getDegrement(value) {
        if (!isNaN(value))
            return parseFloat(value) * 180 / Math.PI;
        else
            throw 'Argument value=' + value + ' is not a number';
    }
    /**
     * Validate if string is null or empty
     * @param {string} value Referense to check
     */
    static isNullOrEmpty(value) {
        switch (value) {
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
    static getBoolean(value) {
        if (!isNaN(value))
            switch (value.toString().toUpperCase()) {
                case 'TRUE':
                    return true;
                    break;
                case 'FALSE':
                    return false;
                    break;
                default:
                    throw 'Invalid argument';
            }
        else
            throw 'Argument value=' + value + ' is not a boolean';
    }
}