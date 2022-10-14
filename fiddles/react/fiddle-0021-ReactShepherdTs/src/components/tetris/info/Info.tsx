const tourOptions: any = {

  defaultStepOptions: {
    cancelIcon: {
      enabled: true
    }
  },
  useModalOverlay: true
}

const Info: any[] = [
    {
      id: 'intro',
      beforeShowPromise: function () {
        return new Promise(function (resolve: Function) {
          setTimeout(function () {
            window.scrollTo(0, 0);
            resolve();
          }, 500);
        });
      },
      buttons: [
        {
          classes: 'shepherd-button-secondary',
          text: 'Exit',
          type: 'cancel'
        },
        {
          classes: 'shepherd-button-primary',
          text: 'Back',
          type: 'back'
        },
        {
          classes: 'shepherd-button-primary',
          text: 'Next',
          type: 'next'
        }
      ],
      classes: 'custom-class-name-1 custom-class-name-2',
      highlightClass: 'highlight',
      scrollTo: false,
      cancelIcon: {
        enabled: true,
      },
      title: 'React Fiddle #21 ~ Tetris',
      text: ['This fiddle models the behaivor of Tetris but a grid that pieces enter from top and come to rest at the ' +
      'bottom, as if pulled down by gravity. Each piece is made up of four unit squares. No ' +
      'two unit squares can occupy the same space in the grid at the same time. The ' +
      'pieces are rigid, and come to rest as soon as any part of a piece contacts the ' +
      'bottom of the grid or any resting block. As in Tetris, whenever an entire row of the ' +
      'grid is filled, it disappears, and any higher rows drop into the vacated space without ' +
      'any change to the internal pattern of blocks in any row ..."'],
      when: {
        show: () => {
          console.log('show step');
        },
        hide: () => {
          console.log('hide step');
        }
      }
    },
    {
      id: 'one',
      buttons: [
        {
          classes: 'shepherd-button-secondary',
          text: 'Exit',
          type: 'cancel'
        },
        {
          classes: 'shepherd-button-primary',
          text: 'Back',
          type: 'back'
        },
        {
          classes: 'shepherd-button-primary',
          text: 'Next',
          type: 'next'
        }
      ],
      classes: 'custom-class-name-1 custom-class-name-2',
      highlightClass: 'highlight',
      scrollTo: false,
      cancelIcon: {
        enabled: true,
      },
      title: 'Shape Textbox',
      text: ['Enter the collection o'],
      when: {
        show: () => {
          console.log('show step');
        },
        hide: () => {
          console.log('hide step');
        }
      }
    }

  ];

//#endregion


export { Info, tourOptions }