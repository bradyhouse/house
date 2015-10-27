
class SuperMan extends SuperHero {

    constructor() {
        super({
            name: 'SuperMan',
            mixins: [
                'Flight',
                'Strength',
                'Indestructible'
            ]
        });
    }

}
