import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { useQuery } from "react-query";
import StreamingDetails from "../components/details/streamingDetails";
import userEvent from '@testing-library/user-event';

jest.mock("react-query");
jest.mock("../api/movie-api");

describe("StreamingDetails component", () => {
  const movie = { id: 12345 };
  const streamingData = {
    results: {
      IE: {
        flatrate: [
          {
            provider_name: 'Netflix',
          },
        ],
      },
    },
  };

  it("displays a loading spinner while the streaming data is being fetched", () => {
    useQuery.mockReturnValue({
      isLoading: true,
    });
    render(<StreamingDetails movie={movie} />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("displays N/A if there is an error while fetching the streaming data", async () => {
    useQuery.mockReturnValue({
      isLoading: false,
      isError: true,
    });

    render(<StreamingDetails movie={movie} />);
    await waitFor(() => {
      expect(screen.getByText("N/A")).toBeInTheDocument();
    });
  });

  it('renders the streaming providers when there is no error', async () => {
    useQuery.mockReturnValue({ data: streamingData });
    render(<StreamingDetails movie={movie} />);
    await screen.findByText('Streaming on:');
    expect(screen.getByTestId('netflix-button')).toBeInTheDocument();
  });

  it('opens the dialog when the "Streaming on:" text is clicked', async () => {
    useQuery.mockReturnValue({ data: streamingData });
    render(<StreamingDetails movie={movie} />);
    await screen.findByText('Streaming on:');
    userEvent.click(screen.getByText('Streaming on:'));
    await screen.findByRole('dialog');
  });
 
});