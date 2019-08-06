export interface IRunner {
  outerContainerEl: Element;
  containerEl: Element;
  config: any;
  dimensions: any;
  time: number;
  currentSpeed: number;
  activated: boolean;
  playing: boolean;
  crashed: boolean;
  paused: boolean;
  init(): void;
  loadImages(): void;
}
