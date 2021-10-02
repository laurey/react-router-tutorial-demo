import { Counter } from "../containers/Counter";
import Timer from "../components/Timer";

function CounterPage() {
  return (
    <div>
      <Counter />
      <Timer value={100} />
    </div>
  );
}

export default CounterPage;
