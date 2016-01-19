let metadata = {
    urls: {
        github: 'https://github.com/bradyhouse/house/tree/master/fiddles/three/fiddle-0011-PlanetTween',
        sun: {
            surfaceMaterial: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/297733/sunSurfaceMaterial.jpg',
            atmosphereMaterial: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/297733/sunAtmosphereMaterial.png'
        },
        mercury: {
            surfaceMaterial: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/297733/mercurySurfaceMaterial.jpg'
        },
        venus: {
            surfaceMaterial: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/297733/venusSurfaceMaterial.jpg'
        },
        earth: {
            normalMaterial: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/297733/earthSurfaceNormal.jpg',
            surfaceMaterial: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/297733/earthSurface.jpg',
            specularMaterial: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/297733/earthSurfaceSpecular.jpg',
            cloudsMaterial: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/297733/earthAtmosphere.png'
        },
        moon: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/297733/moon.jpg',
        mars: {
            surfaceMaterial: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/297733/marsSurfaceMaterial.png'
        },
        jupiter: {
            surfaceMaterial: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/297733/jupiterSurfaceMaterial.jpg'
        },
        saturn: {
            surfaceMaterial: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/297733/saturnSurface.jpg',
            ringsMaterial: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/297733/saturnRings.png'
        },
        uranus: {
            surfaceMaterial: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/297733/uranusSurfaceMaterial.jpg'
        },
        neptune: {
            surfaceMaterial: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/297733/neptuneSurfaceMaterial.jpg'
        },
        pluto: {
            surfaceMaterial: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/297733/plutoSurfaceMaterial.jpg'
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
