import clubReducer from "./clubReducer";
import * as actions from "../actions/clubActions";

it("should add club when passed CREATE_CLUB_SUCCESS", () => {
  const initialState = [
    {
      name: "A",
    },
    {
      name: "B",
    },
  ];

  const newClub = {
    name: "C",
  };

  const action = actions.createClubSuccess(newClub);

  const newState = clubReducer(initialState, action);

  expect(newState.length).toEqual(3);
  expect(newState[0].name).toEqual("A");
  expect(newState[1].name).toEqual("B");
  expect(newState[2].name).toEqual("C");
});

it("should update clubs when passed UPDATE_CLUB_SUCCESS", () => {
  const initialState = [
    { id: 1, name: "A" },
    { id: 2, name: "B" },
    { id: 3, name: "C" },
  ];

  const club = { id: 2, name: "New name" };
  const action = actions.updateClubSuccess(club);

  const newState = clubReducer(initialState, action);
  const updatedClub = newState.find((a) => a.id == club.id);
  const untouchedClub = newState.find((a) => a.id == 1);

  expect(updatedClub.name).toEqual("New name");
  expect(untouchedClub.name).toEqual("A");
  expect(newState.length).toEqual(3);
});
