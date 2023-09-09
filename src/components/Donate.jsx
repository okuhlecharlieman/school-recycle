import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ConnectWallet } from "@thirdweb-dev/react";
import { useContract, useContractWrite } from "@thirdweb-dev/react";
import "../styles/globals.css";
import Logo from "../assets/logonewnew.png";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Registration", href: "/registration" },
  { name: "Vote", href: "/vote" },
  { name: "Donate", href: "/donate" },
];

export default function Donate() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { contract } = useContract(
    "0xd6f7113551358EE1e20b5004F7EDA2f78723042e"
  );
  const { mutateAsync: donate, isLoading } = useContractWrite(
    contract,
    "donate"
  );
  const [donationAmount, setDonationAmount] = useState(0);

  const handleDonation = async () => {
    try {
      const amountWithCommas = donationAmount.toString(); // Ensure donationAmount is a string
      const amountWithPeriod = amountWithCommas.replace(",", ".");
      const amount = parseFloat(amountWithPeriod);
      if (isNaN(amount)) {
        throw new Error("Invalid donation amount");
      }

      const amountInWei = amount * 1e18; // Convert donation amount to wei
      const data = await donate({ value: amountInWei.toString() }); // Pass donation amount as wei
      console.info("contract call success", data);
      setDonationAmount("0");
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  return (
    <section className="bg-gradient-to-bl from-green-200 to-green-500 py-[17rem] sm:py-[18rem] lg:py-[19rem]">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-20 w-auto"
                src={Logo}
                alt=""
              />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-20">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-white hover:text-black"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <ConnectWallet theme="light" />
          </div>
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt=""
                />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <ConnectWallet
                    className="rounded-md bg-green-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
                    dropdownPosition={{
                      side: "bottom",
                      align: "center",
                    }}
                  />
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>

      <div className="relative px-6 pt-0 lg:px-8 mt-0 flex justify-center">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-8">
            Donate to Our Cause
          </h1>
          <div className="flex justify-center mb-8">
            <img
              className="h-20 w-auto rounded-2xl shadow-lg shadow-black mt-10"
              src="https://static8.depositphotos.com/1032932/957/i/450/depositphotos_9578847-stock-photo-falling-dollar-bills-from-money.jpg"
              alt=""
            />
          </div>
          <p className="mt-10 text-lg leading-8 text-white">
            brief donation story...and to cover the empty space
          </p>
          <div className="flex flex-col space-y-4">
            <label htmlFor="donationAmount" className="text-lg">
              Amount:
            </label>
            <div className="flex space-x-4 justify-center">
              <input
                type="number"
                title="Rate"
                id="rate"
                className="form-control text-center rounded-lg"
                value={donationAmount}
                min="0.00"
                step="0.001"
                max="1.00"
                precision={2} //very important
                onChange={(e) =>
                  setDonationAmount(
                    parseFloat(e.target.value.replace(/[^0-9.]/g, ""))
                  )
                }
              />
              <button
                className="px-4 py-2 bg-black  text-white font-medium rounded-md"
                onClick={handleDonation}
                disabled={isLoading}
              >
                Donate
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
