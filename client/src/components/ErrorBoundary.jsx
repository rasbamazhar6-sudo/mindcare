import { Component } from "react";
import Button from "./ui/Button";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4 text-center">
          <h1 className="font-display text-2xl text-slate-900">Something went wrong</h1>
          <p className="max-w-md text-sm text-slate-600">
            MindCare hit an unexpected error. Refresh the page or return home.
          </p>
          <Button type="button" onClick={() => window.location.assign("/")}>
            Go home
          </Button>
        </div>
      );
    }
    return this.props.children;
  }
}
