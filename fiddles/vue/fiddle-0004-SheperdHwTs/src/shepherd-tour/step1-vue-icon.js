export default (startupTour) => ({
    tour: startupTour,
    options: {
      title: "/ ~ src/view/FiddleView.vue",
      text: "Target of the default route, and wrapper for your new fiddle.",
      attachTo: { on: "right" },
      cancelIcon: {
        enabled: true,
        label: "cancel tour",
      },
      buttons: [
        {
          text: "Next",
          action: startupTour.next
        }
      ]
    }
  });
  