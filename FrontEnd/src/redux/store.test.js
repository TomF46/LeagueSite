import { createStore } from "redux";
import rootReducer from "./reducers";
import initialState from "./reducers/initialState";
import * as clubActions from "./actions/clubActions";

it("Should handle creating clubs", () => {
  const store = createStore(rootReducer, initialState);
  const club = {
    name: "Club A",
  };

  const action = clubActions.createClubSuccess(club);
  store.dispatch(action);

  const createdClub = store.getState().clubs[0];
  expect(createdClub).toEqual(club);
});
