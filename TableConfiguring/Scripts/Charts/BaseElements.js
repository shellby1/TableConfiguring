import { Drawer, _validation } from "/Scripts/Charts/Drawer.js";
export { Point  , Sector, Line, Arc };
class _elemBase {
    /**
     * Create base element object
     * @param {Drawer} Drawer Main elemnt drawer object reference
     * @param {number} cX Element center horizontal position
     * @param {number} cY Element center vertical position
     * @param {number} cA Element horizontal axis angele (anticlockwise)
     * @param {number} w Element width
     * @param {number} h Element height
     */
    constructor(Drawer, cX, cY, cA, w, h, Color) {
        if (Drawer.constructor.name == 'Drawer')
            this._drawer = Drawer;
        this._cX = _validation.getInt(cX);
        this._cY = _validation.getInt(cY);
        this._cA = _validation.getRadial(cA);
        this._w = _validation.getInt(w);
        this._h = _validation.getInt(h);
        this._color = _validation.isNullOrEmpty(Color);
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
    // Get element color
    get color() {
        return this._color;
    }
    // Set element color
    set color(val) {
        this._color = _validation.isNullOrEmpty(val);
    }
}
class Point extends _elemBase {
    /**
     * Create object of point
     * @param {Drawer} Drawer Main elemnt drawer object reference
     * @param {integer} X Pointh horizontal coordinate
     * @param {integer} Y Point vertical coordinate
     * @param {integer} S Point size (default 5)
     * @param {degrement} A Point horizontal axis angle (default 0)
     * @param {string} Color Point color
     * 
     * @param {'arc','rec','rmb'} Form Point form type
     */
    constructor(Drawer, X, Y, S, A, Color, Form, fill = true ) {
        // Coordinates
        super(Drawer, X, Y, A, S, S, Color);
        // Fill point
        this._fill = fill;
        // Type of point
        this._form = 'arc';
        this.Form = Form;
    }
    // Get point form type
    get Form() {
        return this._form;
    }
    // Set point form type
    set Form(form) {
        switch (form) {
            case 'arc':
            case 'rec':
            case 'rmb':
                this._form = form;
                break;
            default:
                throw 'Argument will be "arc", "rec" or "rmb"';
        }
    }
    // Draw point
    Draw() {
        var drw = this._drawer;
        drw.translateSelf(this._cX, this._cY, this._cA);
        var lbc_x = this._w / 2;
        var lbc_y = this._h / 2
        switch (this._form) {
            case 'arc':
                drw.Sector(0, 0, 0, this._w, 0, 360, this._color, this._fill);
                break;
            case 'rec':
                drw.rectangle(-lbc_x, -lbc_y, this._w, this._h, this._color, 2, this._fill);
                break;
            case 'rmb':
                drw.rhombus(-lbc_x, -lbc_y, this._w, this._h, this._color, this._w, this._fill);
                break;
        }
        drw.translateSelf(-this._cX, -this._cY, -this._cA);
    }
}
class Sector extends _elemBase {
    constructor(Drawer, cX, cY, cA, wA, r1, r2, Color, th = 1, fill = true) {
        super(Drawer, cX, cY, cA, 0, 0, Color);
        this._wA = _validation.getRadial(wA);
        this._r1 = _validation.getInt(r1);
        this._r2 = _validation.getInt(r2);
        this._th = _validation.getInt(th);
        this._fill = fill;
    }
    Draw() {
        this._drawer.Sector()
        this._drawer.Sector(this._cX, this._cY, this._r1, this._r2, 0, this._wA, this._color, this._fill);
    }
}
class Line extends _elemBase {
    /**
     * Create object of line
     */
    constructor(Drawer, x1, y1, x2, y2, color, th = 1) {
        super(Drawer, x1, y1, 0, th, 0, color);
        this._x2 = _validation.getInt(x2);
        this._y2 = _validation.getInt(y2);
        this._lngth = Math.sqrt((this._x2 - this._cX) ** 2 + (this._y2 - this._cY) ** 2);
        this.centerA = Math.atan((this._y2 - this._cY) / (this._x2 - this._cX));
    }
    Draw() {
        var drw = this._drawer;
        drw.saveCanvas();
        drw.translateSelf(this._cX, this._cY, this._cA);
        this._drawer.LineByStartEnd(0, 0, this._lngth, 0, this._color, this._th);
        drw.restoreCanvas();
    }
}
class Arc {
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
class Text extends _elemBase {
    constructor(Drawer, x1, y1, cA, text, size, font = 'serif', Color = 'black', fill = true) {
        super(Drawer, x1, y1, cA, text.length, size, Color);
        this._font = font;
        this._fill = fill;
        this._text = text;
    }
    Draw() {
        var drw = this._drawer;
        var ctx = drw._ctx;
        drw.translateSelf(this._cX, this._cY, this._cA);
        ctx.font = this._h + 'px ' + this._font;
        ctx.textBaseline = 'hanging';
        if(this._fill) {
            ctx.fillStyle = this._color;
            ctx.fillText(this._text, 0, 0);
        }
        else {
            ctx.strokeStyle = this._color;
            ctx.strokeText(this._text, 0, 0);
        }
        drw.translateSelf(-this._cX, -this._cY, -this._cA);
    }
}
