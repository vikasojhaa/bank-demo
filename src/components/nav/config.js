import React from "react";
// component
import Iconify from "../Iconify";

// ----------------------------------------------------------------------

const icon = (name) => <Iconify icon={name} width={30} height={30} />;

const navConfig = [
  // {
  //   title: "Customer Search",
  //   path: "/",
  //   icon: icon("material-symbols:person-search-rounded"),
  // },
  {
    title: "Customer Search",
    path: "/dashboard",
    icon: icon("material-symbols:person-search-rounded"),
  },
  {
    title: "Create Customer",
    path: "/createcustomer",
    icon: icon("mdi:account-add-outline"),
  },
  {
    title: "Create Term Deposit",
    path: "/createtd",
    icon: icon("mdi:payment-clock"),
  },
  {
    title: "Term Deposit Funding",
    path: "/tdfunding",
    icon: icon("ri:funds-fill"),
  },
  {
    title: "Create Current Account",
    path: "/createca",
    icon: icon("material-symbols:account-balance-wallet-outline"),
  },
  {
    title: "Account Search",
    path: "/accounts",
    icon: icon("fluent-mdl2:activate-orders"),
  },
  {
    title: "Account Balance",
    path: "/",
    icon: icon("ic:twotone-payments"),
  },
  {
    title: "Term Deposit Clouser",
    path: "/",
    icon: icon("eos-icons:templates-outlined"),
  },
  {
    title: "Create Saving Account",
    path: "/",
    icon: icon("ic:round-savings"),
  },
];

export default navConfig;
