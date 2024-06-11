/* eslint-disable no-console */
import React from "react";
import { CheckoutContext } from "../../context/CheckoutContext";
import Drawer from "../Drawer/Drawer";
import CheckoutConfirmOrder from "./CheckoutConfirmOrder";

export default function CheckoutDrawer() {
  const checkoutCtx = React.useContext(CheckoutContext);
  const { checkoutDrawerStates } = checkoutCtx;

  const [isOpen, setIsOpen] = checkoutDrawerStates;

  return (
    <Drawer title="Confirm Order" onClose={() => setIsOpen(false)} isOpen={isOpen}>
      <CheckoutConfirmOrder />
    </Drawer>
  );
}
