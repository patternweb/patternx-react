setActiveNode(event) {
  const rect = event.currentTarget.getBoundingClientRect();
  this.dragOffset = {
    x: event.pageX - (rect.x + rect.width / 2),
    y: event.pageY - (rect.y + rect.height / 2)
  };
  this.activeNodeId = event.currentTarget.id;
  // // push node to end of state.nodes to put it on top of other nodes (z-index) before dragging
  // this.setState(prevState => {
  //   prevState.nodes.push(
  //     prevState.nodes.splice(
  //       prevState.nodes.findIndex(node => node.id === this.activeNodeId),
  //       1
  //     )[0]
  //   );
  //   return prevState;
  // });
}
