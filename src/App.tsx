import React from 'react';
import './App.css';
import Card from "./components/Card/Card";

const colors = [
  '#7CCBF8',
  '#F9CF6B',
  '#37CE86',
  '#89D766',
  '#ED81C1',
  '#C766D7',
  '#8533FF',
  '#62CFD7',
  '#FF824D',
  '#646CB4',
  '#F58C83',
  '#D4E56B']

function App() {
  return (
    <div className="App">
      {colors.map((color, index) => <Card bgColor={color} key={color}>{index}</Card>)}
    </div>
  );
}

export default App;
