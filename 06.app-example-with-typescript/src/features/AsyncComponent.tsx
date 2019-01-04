import * as React from 'react'

interface State {
  component: React.Component
}

export function asyncComponent(importComponent: Promise<any>) {
  class AsyncComponent extends React.Component<{}, State> {
    constructor(props: any) {
      super(props);

      this.state = {
        component: null
      };
    }

    async componentDidMount() {
      const { default: component } = await importComponent();
      this.setState({
        component: component
      });
    }

    render() {
      const C: any = this.state.component;
      return C ? (<C {...this.props} />) : null;
    }
  }

  return AsyncComponent;
}
