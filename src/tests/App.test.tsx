import { screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import {expect, it, describe, beforeEach, vi} from "vitest";
import Header from "../modules/Header/Header.tsx";
import { renderWithMantine } from './render';
import Cart from "../modules/Header/components/Cart/Cart.tsx";
import {userEvent} from '@testing-library/user-event';
import Catalog from "../modules/catalog/Catalog.tsx";
import ky from "ky";
import {Popover} from "@mantine/core";


Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {}, // deprecated
    removeListener: () => {}, // deprecated
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});
vi.mock('ky');


describe("Testing component Header", () => {

  beforeEach(() => {
    renderWithMantine(<Header />);
  });

  it("Render logo", () => {
    expect(screen.getByText(/Vegetable/i)).toBeInTheDocument();
    expect(screen.getByText(/shop/i)).toBeInTheDocument()
  });

})

describe("Testing component Cart", () => {

  beforeEach(() =>
    renderWithMantine(
       <Cart />
    ));

  it('Render button Cart', async () => {
     const button = await screen.findByRole('button', { name: /Cart/i });
     expect(button).toBeInTheDocument()
  });

  it("opens modal when button is clicked", async () => {
    const button = await screen.findByRole('button', { name: /Cart/i });
    await userEvent.click(button);
    const img = await screen.findByAltText('the cart is empty');
    expect(img).toBeInTheDocument()
  });

  it("close modal when button is clicked", async () => {
    const button = await screen.findByRole('button', { name: /Cart/i });

    await userEvent.click(button);
    expect( await screen.findByAltText('the cart is empty')).toBeInTheDocument()

    await userEvent.click(button);
    await waitFor(() => {
      expect(screen.queryByAltText('the cart is empty')).not.toBeInTheDocument();
    });

  });

});

describe("Testing component Catalog and testing interaction components", () => {

  beforeEach(() =>{
    renderWithMantine(
      <Popover>
        <Catalog />
        <Cart />
      </Popover>
    );

      (ky.get as any).mockReturnValue({
        json: () =>
          Promise.resolve([
            { id: 1, name: "Brocolli - 1 Kg", price: 120, image: "https://res.cloudinary.com/sivadass/image/upload/v1493620046/dummy-products/broccoli.jpg", quantity: 1 },
            { id: 2, name: "Cauliflower - 1 Kg", price: 60, image: "https://res.cloudinary.com/sivadass/image/upload/v1493620046/dummy-products/cauliflower.jpg", quantity: 1 },
          ]),
      });
  });

  it("Render title", () => {
    const title = screen.getByText('Catalog');
    expect(title).toBeInTheDocument()
  });

  it("renders cards", async () => {
    const card1 = await screen.findByText('Brocolli')
    const card2 = await screen.findByText('Cauliflower')

    expect(card1).toBeInTheDocument();
    expect(card2).toBeInTheDocument();
  })

  it("render btn inc and dec", async () => {
    const inc = await screen.findAllByTestId('btn-increase');
    const dec = await screen.findAllByTestId('btn-decrease');

    expect(inc).toHaveLength(2);
    expect(dec).toHaveLength(2);
  });

  it('testing logic btn inc and dec', async () => {
    const inc = await screen.findAllByTestId('btn-increase');
    const dec = await screen.findAllByTestId('btn-decrease');

    await userEvent.click(inc[0]);
    expect(screen.getByText('2')).toBeInTheDocument();

    await userEvent.click(dec[1]);
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('adds product to cart on click',async () => {
    const addButton = await screen.findAllByTestId('btn-addCart');
    const buttonCart = await screen.findByTestId('btn-cart');

    await userEvent.click(addButton[0]);
    await userEvent.click(buttonCart);

    expect(await screen.queryByAltText('the cart is empty')).not.toBeInTheDocument()
  });

});

