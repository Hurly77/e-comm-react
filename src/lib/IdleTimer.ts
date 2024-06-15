export type IdleTimerConstructor = {
  timeout: number;
  onTimeout: (() => void) | (() => null);
  onExpired: (() => void) | (() => null);
};

// The purpose of this class is to track user inactivity,
// it sets up event listeners for mousemove, scroll, and keydown
// if user doesn't interact with the page in the specified time
// the onTimeout callback is called
// onExpired made of the purpose of logging out the user if a token like a jwt expires
export default class IdleTimer {
  timeout: number;
  onTimeout: (() => void) | (() => null);
  onExpired: (() => void) | (() => null);
  eventHandler: ((e: Event) => void) | undefined;
  interval: NodeJS.Timer | undefined;
  timeoutTracker: null | NodeJS.Timeout;

  constructor({ timeout, onTimeout, onExpired }: IdleTimerConstructor) {
    this.timeout = timeout;
    this.onTimeout = onTimeout;
    this.onExpired = onExpired;
    this.interval = undefined;
    this.timeoutTracker = null;

    const expiredTime = parseInt(localStorage.getItem("_expiredTime") || "0", 10);
    const inActiveUser = expiredTime > 0 && expiredTime < Date.now();

    if (inActiveUser) {
      this.onExpired();
      return;
    }

    this.eventHandler = this.updateExpiredTime.bind(this);
    this.tracker();
    this.startInterval();
  }

  startInterval() {
    this.updateExpiredTime();

    this.interval = setInterval(() => {
      const expiredTime = parseInt(localStorage.getItem("_expiredTime") || "0", 10);
      const expiredToken = parseInt(localStorage.getItem("_expiredToken") || "0", 10);
      const isExpiredToken = expiredToken > 0 && expiredToken < Date.now();
      // checking if expiredTime is 0, is to prevent race condition
      // where the Clean Near the same time the interval fires
      const isInActiveUser = expiredTime < Date.now() && expiredTime != 0;

      if (isInActiveUser && this.onTimeout) {
        this.onTimeout();
        this.cleanUp();
        // eslint-disable-next-line no-console
        console.debug("IdleTimer: Timeout");
      }

      if (isExpiredToken && this.onExpired) {
        this.onExpired();
        this.cleanUp();
        // eslint-disable-next-line no-console
        console.debug("IdleTimer: Expired");
      }
    }, 1000);
  }

  updateExpiredTime(_e?: Event, expire?: number) {
    if (this.timeoutTracker) clearTimeout(this.timeoutTracker);

    this.timeoutTracker = setTimeout(() => {
      const expires_in = expire ? expire : Date.now() + this.timeout * 1000;
      localStorage.setItem("_expiredTime", expires_in.toString());
    }, 300);
  }

  tracker() {
    window.addEventListener("mousemove", this.eventHandler ?? (() => null));
    window.addEventListener("scroll", this.eventHandler ?? (() => null));
    window.addEventListener("keydown", this.eventHandler ?? (() => null));
  }

  cleanUp() {
    localStorage.removeItem("_expiredTime");
    if (this.interval) clearInterval(this.interval as unknown as number);
    window.removeEventListener("mousemove", this.eventHandler ?? (() => null));
    window.removeEventListener("scroll", this.eventHandler ?? (() => null));
    window.removeEventListener("keydown", this.eventHandler ?? (() => null));
  }
}
