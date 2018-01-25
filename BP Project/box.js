class Box {
    constructor(x, y, n, notype) {
        this.x = x;
        this.y = y;
        this.n = n;
        this.notype = notype;
        // notype - will not change when clicked
    }

    show() {
        rect(this.x, this.y, 100, 120);
        textAlign(CENTER, CENTER);
        textSize(90);
        text(this.n, this.x + BOX_WIDTH / 2, this.y + BOX_HEIGHT / 2);
    }
}

class po extends Box {
    constructor(x, y, n, notype, p) {
        super(x, y, n, notype);
        this.p = p;
        // notype - will not change when clicked
    }
}
