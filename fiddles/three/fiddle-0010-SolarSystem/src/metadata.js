let metadata = {
    urls: {
        sun: {
            surfaceMaterial: 'resources/images/sunSurfaceMaterial.jpg',
            atmosphereMaterial: 'resources/images/sunAtmosphereMaterial.png'
        },
        mercury: {
            surfaceMaterial: 'resources/images/mercurySurfaceMaterial.jpg'
        },
        venus: {
            surfaceMaterial: 'resources/images/venusSurfaceMaterial.jpg'
        }
    },
    constants: {
        SUN_SIZE_IN_EARTHS: 10,
        MOUSE_MOVE_TOLERANCE: 4,
        MAX_ROTATION_X: Math.PI / 2,
        MAX_CAMERA_Z: this.constants.SUN_SIZE_IN_EARTHS * 50,
        MIN_CAMERA_Z: this.constants.SUN_SIZE_IN_EARTHS * 3,
        EARTH_DISTANCE: 50,
        PLUTO_DISTANCE_IN_EARTHS: 77.2,
        EARTH_DISTANCE_SQUARED: 45000,
        EXAGGERATED_PLANET_SCALE: 5.55
    }
};
