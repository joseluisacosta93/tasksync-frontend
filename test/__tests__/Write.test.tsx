import { Write } from "@/app/components/ui/text/write";
import React from "react";
import { default as renderer } from "react-test-renderer";

jest.mock("@/theme/hooks/useColor", () => ({
  useColor: () => ({
    text: "#111111",
    primary: "#007bff",
  }),
}));

describe("Write Component", () => {
  it("se renderiza correctamente y coincide con el snapshot", () => {
    const tree = renderer.create(<Write text="Hola Mundo" />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
