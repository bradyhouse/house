export default (startupTour) => ({
    tour: startupTour,
    options: {
      id: '9',
      title: "/about ~ src/views/AboutView.vue",
      attachTo: { on: "bottom" },
      text: "This page utilizes markdown-it-vue to display the contents of the README.md file.",
      cancelIcon: {
        enabled: true,
        label: "cancel tour",
      },
      when: {
        cancel: function() {
            startupTour.routerPush("/")
        }
      },
      buttons: [
        {
          text: "Next",
          action: () => startupTour.routerPush("/docs", startupTour.next)
        }
      ]
    }
  });
  