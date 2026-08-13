let metadata = {
    urls: {
        github: 'https://github.com/bradyhouse/house/tree/master/fiddles/three/fiddle-0011-PlanetTween',
        sun: {
            surfaceMaterial: 'resources/images/sunSurfaceMaterial.jpg',
            atmosphereMaterial: 'resources/images/sunAtmosphereMaterial.png'
        },
        mercury: {
            surfaceMaterial: 'resources/images/mercurySurfaceMaterial.jpg'
        },
        venus: {
            surfaceMaterial: 'resources/images/venusSurfaceMaterial.jpg'
        },
        earth: {
            normalMaterial: 'resources/images/earthSurfaceNormal.jpg',
            surfaceMaterial: 'resources/images/earthSurface.jpg',
            specularMaterial: 'resources/images/earthSurfaceSpecular.jpg',
            cloudsMaterial: 'resources/images/earthAtmosphere.png'
        },
        moon: 'resources/images/moon.jpg',
        mars: {
            surfaceMaterial: 'resources/images/marsSurfaceMaterial.png'
        },
        jupiter: {
            surfaceMaterial: 'resources/images/jupiterSurfaceMaterial.jpg'
        },
        saturn: {
            surfaceMaterial: 'resources/images/saturnSurface.jpg',
            ringsMaterial: 'resources/images/saturnRings.png'
        },
        uranus: {
            surfaceMaterial: 'resources/images/uranusSurfaceMaterial.jpg'
        },
        neptune: {
            surfaceMaterial: 'resources/images/neptuneSurfaceMaterial.jpg'
        },
        pluto: {
            surfaceMaterial: 'resources/images/plutoSurfaceMaterial.jpg'
        }
    },
    consoleTag: 'H O U S E ~ f i d d l e s',
    constants: {
        SUN_SIZE_IN_EARTHS: 20,
        MOUSE_MOVE_TOLERANCE: 4,
        MAX_ROTATION_X: Math.PI / 2,
        MAX_CAMERA_Z: 10 * 50,
        MIN_CAMERA_Z: 10 * 3,
        EARTH_DISTANCE: 50,
        PLUTO_DISTANCE_IN_EARTHS: 77.2,
        EARTH_DISTANCE_SQUARED: 45000,
        EXAGGERATED_PLANET_SCALE: 5.55,
        MOON_DISTANCE_FROM_EARTH: 356400,
        MOON_PERIOD: 28,
        MOON_ROTATION_SPEED: 0.003,
        MOON_EXAGGERATE_FACTOR: 1.2,
        MOON_SIZE_IN_EARTHS: 1 / 3.7 * 1.2
    }
};
