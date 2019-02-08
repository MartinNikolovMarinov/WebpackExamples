declare global {
  namespace msg {
    interface RouteChangeMsg extends jc.Message {
      match?: jc.RouteMatch
    }
  }
}

export {}
