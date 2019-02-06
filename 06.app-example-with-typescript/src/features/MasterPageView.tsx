import * as React from 'react'
import { hot } from 'react-hot-loader'
import styled from 'styled-components'
import { Props } from './MasterPageProps'

const Title: any = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`

const Wrapper: any = styled.section`
  padding: 4em;
  background: papayawhip;
`

class MasterPageView extends React.Component<Props> {
  constructor(props: any) {
    super(props)
  }

  public render(): React.ReactNode {
    this.props.sandbox.publishAsync({
      type: this.props.sandbox.constants.MESSAGE_ONE,
      data: 'Test',
    })

    return (
      <Wrapper>
        <div className="L1" />
        <Title>This is the main page</Title>
      </Wrapper>
    )
  }
}

export default hot(module)(MasterPageView)
