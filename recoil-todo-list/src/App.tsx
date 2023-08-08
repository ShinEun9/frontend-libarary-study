import { RecoilRoot } from "recoil";
import Calendar from "./components/Calendar";
import TodoFormModal from "./features/TodoFormModal";
import TodoStatisticsModal from "./features/TodoStatisticsModal";

function App() {
  return (
    <div className="App">
      <RecoilRoot>
        <Calendar />
        <TodoFormModal />
        <TodoStatisticsModal />
      </RecoilRoot>
    </div>
  );
}

export default App;
