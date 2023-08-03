import { useState } from "react";
import useFunnel from "./Funnel/useFunnel";

function App() {
  const [registerData, setRegisterData] = useState();
  const [FunnelComponent, setStep] = useFunnel("가입방식");

  return (
    <div className="App">
      <FunnelComponent>
        <FunnelComponent.Step name="가입방식">
          <div>
            <h1>가입방식페이지</h1>
            <button
              type="button"
              onClick={() => {
                console.log("주민번호");
                setStep("주민번호");
              }}
            >
              주민번호 페이지로 이동
            </button>
          </div>
        </FunnelComponent.Step>
        <FunnelComponent.Step name="주민번호">
          <div>
            <h1>주민번호페이지</h1>
            <button type="button" onClick={() => setStep("가입방식")}>
              가입방식 페이지로 이동
            </button>
          </div>
        </FunnelComponent.Step>
      </FunnelComponent>
    </div>
  );
}
export default App;
