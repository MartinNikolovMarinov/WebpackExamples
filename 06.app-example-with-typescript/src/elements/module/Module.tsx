// Copyright (c) Lykke Corp.
// See the LICENSE file in the project root for more information.

import * as React from 'react'

interface Props {
  id: string
  sandbox: jc.Sandbox
  instanceId?: string
  moduleProps?: Record<string, any>
  className?: string
}

export class Module extends React.PureComponent<Props> {

  private root: HTMLDivElement

  constructor(props: Props) {
    super(props)

    this.root = null
    this.getRootRef = this.getRootRef.bind(this)
  }

  public componentDidMount(): void {
    this.startModule(this.props.moduleProps)
  }

  public componentDidUpdate(prevProps: Props): void {
    const moduleProps = this.props.moduleProps
    const prevModuleProps = prevProps.moduleProps
    if (moduleProps !== prevModuleProps) {
      this.props.sandbox.stopModule(prevProps.id)
      this.startModule(prevModuleProps)
    }
  }

  public componentWillUnmount(): void {
    this.props.sandbox.stopModule(this.props.id, this.props.instanceId)
  }

  public render(): React.ReactNode {
    return (
      <div
        ref={this.getRootRef}
        className={this.props.className}
      />
    )
  }

  private getRootRef(root: HTMLDivElement): HTMLDivElement {
    this.root = root
    return root
  }

  private startModule(moduleProps: Record<string, any>): void {
    this.props.sandbox.startModule(this.props.id, {
      instanceId: this.props.instanceId,
      props: {
        root: this.root,
        ...moduleProps,
      },
    })
  }
}
