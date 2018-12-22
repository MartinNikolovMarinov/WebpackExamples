import * as React from 'react'
import styled from 'styled-components'

const Title: any = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`

const Wrapper: any = styled.section`
  padding: 4em;
  background: papayawhip;
`

export interface Props {
  sandbox: jc.Sandbox
}

export class MasterPageView extends React.Component<Props> {
  constructor(props: any) {
    super(props)
  }

  public render(): React.ReactNode {
    return (
      <Wrapper>
        <div className="L1" />
        <Title>This is the main page</Title>
      </Wrapper>
    )
  }
}
