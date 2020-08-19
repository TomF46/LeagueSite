import React from "react";
import { cleanup, render } from "react-testing-library";
import ClubForm from "./ClubForm";

afterEach(cleanup);

function renderClubForm(args) {
  const defaultProps = {
    club: {},
    saving: false,
    errors: {},
    onSave: () => {},
    onChange: () => {},
  };

  const props = { ...defaultProps, ...args };
  return render(<ClubForm {...props} />);
}

it("should render Add Club header", () => {
  const { getByText } = renderClubForm();
  getByText("Add Club");
});

it('should label save button as "Save" when not saving', () => {
  const { getByText } = renderClubForm();
  getByText("Save");
});

it('should label save button as "Saving..." when saving', () => {
  const { getByText } = renderClubForm({ saving: true });
  getByText("Saving...");
});
