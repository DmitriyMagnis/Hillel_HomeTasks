import React from 'react';

import SmileList from './component/SmileItemList/SmileList';
import Winner from './component/Winner/Winner';
import { defaultSmiles } from './constants';
import type { ISmileItem } from './types/common';

interface ISmileState {
  smileItems: ISmileItem[];
  winner: ISmileItem | null;
}
interface ISmileProps {}

class App extends React.Component<{}, ISmileState> {
  constructor(props: ISmileProps) {
    super(props);

    const winner = localStorage.getItem('winner');
    const items = localStorage.getItem('items');

    this.state = {
      smileItems: items ? JSON.parse(items) : defaultSmiles,
      winner: winner ? JSON.parse(winner) : null,
    };
  }

  onIconClick = (id: number) =>
    this.setState(
      prev => ({
        ...prev,
        smileItems: prev.smileItems.map(smile => ({
          ...smile,
          clicks: id === smile.id ? smile.clicks + 1 : smile.clicks,
        })),
      }),
      () => localStorage.setItem('items', JSON.stringify(this.state.smileItems))
    );

  showResults = () => {
    const max: ISmileItem = this.state.smileItems.reduce(
      (max, smile) => (max.clicks <= smile.clicks ? smile : max),
      this.state.smileItems[0]
    );

    this.setState({ ...this.state, winner: max }, () =>
      localStorage.setItem('winner', JSON.stringify(max))
    );
  };
  reset = () => {
    this.setState(
      {
        winner: null,
        smileItems: defaultSmiles,
      },
      () => localStorage.clear()
    );
  };
  render() {
    const { smileItems, winner } = this.state;
    console.log(this.state);
    return (
      <div className="wrapper">
        <SmileList smileitems={smileItems} onIconClick={this.onIconClick} />

        <Winner winner={winner} showResult={this.showResults} />

        <button type="button" onClick={this.reset}>
          reset
        </button>
      </div>
    );
  }
}

export default App;
