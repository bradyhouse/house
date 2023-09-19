export default (startupTour) => ({
    tour: startupTour,
    options: {
      attachTo: { on: "top" },
      title: "/ ~ src/components/HelloWorld.vue",
      text: "Rendered version of the HelloWorld component.",
      cancelIcon: {
        enabled: true,
        label: "cancel tour",
      },
      buttons: [
        {
          text: "Next",
          action: () => startupTour.routerPush("/about", startupTour.next)
        }
      ]
    }
  });