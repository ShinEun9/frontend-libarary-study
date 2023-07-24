import { setupWorker } from "msw";
import { handler } from "./handler";

export const worker = setupWorker(...handler);

// ! msw로 모의서버 만들기
// https://velog.io/@khy226/msw%EB%A1%9C-%EB%AA%A8%EC%9D%98-%EC%84%9C%EB%B2%84-%EB%A7%8C%EB%93%A4%EA%B8%B0
