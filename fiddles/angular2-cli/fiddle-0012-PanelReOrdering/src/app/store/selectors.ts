export const framesModel = () => {
  return state => state
    .map(([frames, filter]) => {
      return {
        total: frames.length,
        frames: frames.filter(filter),
        active: frames.filter(frames => frames.isActive).length
      }
    })
};

export const activeFrames = () => {
  return state => state
    .map(s => s.frame)
    .distinctUntilChanged();
};
