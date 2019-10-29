interface IState {
  [id: string]: string;
}

const POST_GUESS_STATE = "POST_GUESS_STATE";

let state: IState;

const loadState = () => {
  if (state) {
    return;
  }
  const s = window.localStorage.getItem(POST_GUESS_STATE);
  if (!s) {
    window.localStorage.setItem(POST_GUESS_STATE, "{}");
    state = {};
    return;
  }
  state = JSON.parse(s) as IState;
};
loadState();

export const getPostGuessState = (id: string) => {
  return id in state ? state[id] : undefined;
};

export const markPostGuessState = (id: string, answer: string) => {
  state[id] = answer;
  window.localStorage.setItem(POST_GUESS_STATE, JSON.stringify(state));
};
