class Level09 extends BaseLevel {

    constructor(width, height, hitCallback) {
        super(width, height, hitCallback, 10, ASSETS.IMAGES["b2.jpg"]);
        this.nextLevel = "Level10";
    }

    setup() {
        this.ground.push(new Ground(this.width / -8, this.height * 0.60, 1000, 1000, PI / 5));
        this.ground.push(new Ground(this.width +400, this.height * 0.60, 1000, 1000, PI / 8));

        this.ground.push(new Ground(this.width / 2, this.height - gridSize / 2, width, gridSize));
        this.anchors.push(new Joint(this.width - (gridSize * 16), this.height - gridSize, 12, true));
        this.anchors.push(new Joint(this.width - (gridSize * 8), this.height - gridSize, 12, true));
    }

    setupHumans() {
        this.humans.push(new Human(this.width - (gridSize * 10), this.height - gridSize, 110, this.humanHitCallback));
        this.humans.push(new Human(this.width - (gridSize * 12), this.height - gridSize, 120, this.humanHitCallback));
        this.humans.push(new Human(this.width - (gridSize * 14), this.height - gridSize, 120, this.humanHitCallback));
    }

    show() {
        super.show();
    }

    doCatastrophe() {
        for (var i = 0; i < 100; i++) {
            this.others.push(new LandSlide(random(-150, -100), random(-350, -300), random(8, 16)));
        }
    }

}
