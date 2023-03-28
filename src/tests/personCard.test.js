import React from 'react';
import { render, screen } from '@testing-library/react';
import mediaQuery from 'css-mediaquery';
import PersonCard from '../components/peopleCards/personCard';

function createMatchMedia(width) {
  return query => ({
    matches: mediaQuery.match(query, { width }),
    addListener: () => {},
    removeListener: () => {},
  });
}

describe('PersonCard component', () => {
  beforeAll(() => {
    window.matchMedia = createMatchMedia(window.innerWidth);
  });
  it('renders correctly', () => {
    const person = {
      name: 'Homer Simpson',
      profile_path: 'path/to/image.jpg',
      character: 'Homer Simpson'
    };
    render(<PersonCard person={person} />);
  });
  test("renders an image with a valid src", () => {
    const person = { name: "John Doe", profile_path: "path/to/image.jpg" };
    render(<PersonCard person={person} />);
    const image = screen.getByRole("img");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      "https://image.tmdb.org/t/p/w500/path/to/image.jpg"
    );
  });
  test("renders backup image if no image for actor", () => {
    const person = { name: "Homer Simpson" };
    render(<PersonCard person={person} />);
    const image = screen.getByRole("img");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      `${process.env.PUBLIC_URL}/assets/poster-placeholder.png`
    );
  });
  test("renders the character name if it exists", () => {
    const person = { name: "Homer Simpson", character: "Homer Simpson" };
    render(<PersonCard person={person} />);
    const characterName = screen.getByText(/As (.*)/);
    expect(characterName).toHaveTextContent("As Homer Simpson");
    expect(characterName).toBeInTheDocument();
  });
});
