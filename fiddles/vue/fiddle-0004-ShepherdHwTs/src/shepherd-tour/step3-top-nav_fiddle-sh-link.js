export default (startupTour) => ({
    tour: startupTour,
    options: {
      id: '3',
      title: "/ ~ src/components/BreadCrumbs.vue",
      text: "Rendered version of the BreadCrumbs component. Its configured to display bread crumb links to bradyhouse.github.io",
      attachTo: { on: "bottom" },
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
  