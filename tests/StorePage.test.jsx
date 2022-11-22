import { cleanup, render, waitFor } from "@testing-library/react";
// import { } from "@testing-library/jest-dom";
import { expect } from "vitest";
import { beforeEach, test } from "vitest";
import StorePage from '../src/Pages/StorePage';
import { product1 } from './helpers';

beforeEach(async () => {
    cleanup();
});
test("Should render a product with name, price and add to cart button", async () => {
    const component = render(<StorePage></StorePage>);
    component.getByText("Loading...");
    await waitFor(() => {
        component.getByText(product1.name);
        component.getByText(`$${product1.price}`);
        const button = component.getByRole("button");
        expect(button.innerHTML).toBe("Agregar al carro");
    });
});