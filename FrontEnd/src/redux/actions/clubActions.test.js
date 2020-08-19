import * as clubActions from "./clubActions";
import * as types from "./actionTypes";
import { clubs } from "../../../tools/mockData";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import configureMockStore from "redux-mock-store";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("Async Actions", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  describe("Load clubs thunk", () => {
    it("Should create BEGIN_API_CALL and LOAD_CLUBS_SUCCESS when loading clubs", () => {
      fetchMock.mock("*", {
        body: clubs,
        headers: { "content-type": "application/json" },
      });

      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        { type: types.LOAD_CLUBS_SUCCESS, clubs },
      ];

      const store = mockStore({ clubs: [] });
      return store.dispatch(clubActions.loadClubs()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});

describe("createClubSuccess", () => {
  it("should create a CREATE_CLUB_SUCCESS action", () => {
    const club = clubs[0];
    const expectedAction = {
      type: types.CREATE_CLUB_SUCCESS,
      club,
    };

    const action = clubActions.createClubSuccess(club);

    expect(action).toEqual(expectedAction);
  });

  describe("deleteClubOptimistic", () => {
    it("should create a DELETE_CLUB_OPTIMISTIC action", () => {
      const club = clubs[0];
      const expectedAction = {
        type: types.DELETE_CLUB_OPTIMISTIC,
        club,
      };

      const action = clubActions.deleteClubOptimistic(club);
      expect(action).toEqual(expectedAction);
    });
  });
});
