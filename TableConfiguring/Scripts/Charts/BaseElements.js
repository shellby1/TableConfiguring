import { Drawer, _validation } from "/Scripts/Charts/Drawer.js";
export { Point  , Sector, Line, Arc, Text };
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
    constructor(Drawer, cX, cY, cA, w, h, Color, fill) {
        if (Drawer.constructor.name == 'Drawer')
            this._drawer = Drawer;
        else
            throw 'Drawer is not specified';
        this._cX = _validation.getInt(cX);
        this._cY = _validation.getInt(cY);
        this._cA = _validation.getDecimal(cA);
        this._w = _validation.getInt(w);
        this._h = _validation.getInt(h);
        this._color = _validation.isNullOrEmpty(Color);
        this._fill = _validation.getBoolean(fill);
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
     * @param {degrement} A Point horizontal axis angle (default 0)
     * @param {integer} S Point size (default 5)
     * @param {string} Color Point color
     * @param {'arc','rec','rmb'} Form Point form type
     * @param {boolean} Fill Fill point if true
     */
    constructor(Drawer, X, Y, A, S, Color, Form, Fill = true ) {
        // Coordinates
        super(Drawer, X, Y, A, S, S / 3, Color, Fill);
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
            case 'arr':
                this._form = form;
                break;
            default:
                throw 'Argument will be "arc", "rec", "rmb" or arr';
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
                drw.rectangle(-lbc_x, -lbc_y, this._w, this._w, this._color, 2, this._fill);
                break;
            case 'rmb':
                drw.rhombus(-lbc_x, -lbc_y, this._w, this._h, this._color, this._w, this._fill);
                break;
            case 'arr':
                if (this._fill) {
                    drw._ctx.fillStyle = this._color;
                    drw._ctx.beginPath();
                    drw._ctx.moveTo(0, 0);
                    drw._ctx.lineTo(-this._w, this._h);
                    drw._ctx.lineTo(-this._w, -this._h);
                    drw._ctx.closePath();
                    drw._ctx.fill();
                }
                else {
                    drw._ctx.strokeStyle = this._color;
                    drw._ctx.beginPath();
                    drw._ctx.moveTo(0, 0);
                    drw._ctx.lineTo(-this._w, this._h);
                    drw._ctx.moveTo(0, 0);
                    drw._ctx.lineTo(-this._w, -this._h);
                    drw._ctx.stroke();
                }
                break;
        }
        drw.translateSelf(-this._cX, -this._cY, -this._cA);
    }
}
class Sector extends _elemBase {
    /**
     * Create sector element by specified parameters
     * @param {Drawer} Drawer Main elemnt drawer object reference
     * @param {integer} cX Element concentric center horizontal position
     * @param {integer} cY Element concentric center vertical position
     * @param {degrement} cA Element horisontal angle
     * @param {degrement} wA Element width angle
     * @param {integer} r1 Element inner radiuse (can be 0)
     * @param {integer} r2 Element outer radiuse
     * @param {string} Color Element color
     * @param {integer} th Element thickness if fill is false
     * @param {boolean} fill
     */
    constructor(Drawer, cX, cY, cA, wA, r1, r2, Color, th = 1, Fill = true, Outline = true, OutlineColor = 'black') {
        super(Drawer, cX, cY, cA, 0, 0, Color, Fill);
        this._wA = _validation.getDecimal(wA);
        this._r1 = _validation.getInt(r1);
        this._r2 = _validation.getInt(r2);
        this._th = _validation.getInt(th);
        this._outline = Outline;
        this._outlineColor = OutlineColor;
    }
    Draw() {
        var drw = this._drawer;
        drw.translateSelf(this._cX, this._cY, this._cA)
        if(this._outline)
            drw.Sector(this._cX, this._cY, this._r1, this._r2, 0, this._wA, this._outlineColor);
        drw.Sector(this._cX, this._cY, this._r1, this._r2, 0, this._wA, this._color, this._fill);
        drw.translateSelf(-this._cX, -this._cY, -this._cA)
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
    /**
     * Create object of Text
     * @param {Drawer} Drawer Main elemnt drawer object reference
     * @param {integer} x1 Element left bottom corner horizontal position
     * @param {integer} y1 Element left bottom corner vertical position
     * @param {degrement} cA Element hjrizontal axes angle
     * @param {string} text Element text
     * @param {integer} size Text size in pixels
     * @param {string} font Text font
     * @param {string} Color Text color
     * @param {boolean} fill Fill text if true
     */
    constructor(Drawer, x1, y1, cA, text, size, font = 'serif', Color = 'black', Fill = true) {
        super(Drawer, x1, y1, cA, Drawer._ctx.measureText(text).width, size, Color, Fill);
        this._font = font;
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
            ctx.fillText(this._text, 0, -this._h);
        }
        else {
            ctx.lineWidth = this._w;
            ctx.strokeStyle = this._color;
            ctx.strokeText(this._text, 0, -this._h);
        }
        drw.translateSelf(-this._cX, -this._cY, -this._cA);
    }
}
