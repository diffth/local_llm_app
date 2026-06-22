import Header from "./components/Header";
import Greeting from "./components/Greeting"
import Counter from "./components/Counter";
import InputState from "./components/InputState";
import ListRender from "./components/ListRender";
import ConditionalRender from "./components/ConditionalRender";
import UseEffectRender from "./components/UseEffectRender";

function App() {
  return (
    <div>
      <Header />
      <Greeting />
      <Counter />
      <InputState />
      <ListRender />
      <hr />
      <ConditionalRender />
      <UseEffectRender />
    </div>
  );
}

export default App;