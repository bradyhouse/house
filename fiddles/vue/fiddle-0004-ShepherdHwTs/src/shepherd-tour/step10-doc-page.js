export default (startupTour) => ({
    tour: startupTour,
    options: {
      id: '10',
      title: "/doc ~ src/views/DocView.vue",
      text: `This page can be used to provide links 
      to the libraries and documentation explored in the fiddle.  
      By default, it includes links to Vue documentation.`,   
      attachTo: { on: "bottom" },
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
          text: "End",
          action: () => {
            startupTour.routerPush("/", startupTour.cancel)
          }
        }
      ]
    }
  });
  