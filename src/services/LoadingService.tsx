class Loading {
  private loaderSelector = ".loading-container";
  private loaderElement: Element | null = null;

  public isLoading: Boolean = true;

  constructor() {}

  private getLoader(): Element | null {
    if (!this.loaderElement) {
      this.loaderElement = document.querySelector(this.loaderSelector);
    }

    // Re-check in case DOM has changed or was not ready before
    if (!this.loaderElement) {
      this.loaderElement = document.querySelector(this.loaderSelector);
    }

    return this.loaderElement;
  }

  public show() {
    const loader = this.getLoader();
    loader?.classList.remove("hidden");
    this.isLoading = true;
  }

  public hide() {
    const loader = this.getLoader();
    loader?.classList.add("hidden");
    this.isLoading = false;
  }
}

const LoadingService = new Loading();
export default LoadingService;
