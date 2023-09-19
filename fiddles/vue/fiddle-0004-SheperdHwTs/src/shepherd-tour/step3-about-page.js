export default (startupTour) => ({
    tour: startupTour,
    options: {
      title: "/about ~ src/views/AboutView.vue",
      attachTo: { on: "bottom" },
      text: "This page utilizes markdown-it-vue to display the contents of the README.md file.",
      cancelIcon: {
        enabled: true,
        label: "cancel tour",
      },
      buttons: [
        {
          text: "End",
          action: () => {
            startupTour.routerPush("/", startupTour.cancel)
          }
        }
      ]
    }
  });
  