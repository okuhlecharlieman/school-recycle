import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ConnectWallet } from "@thirdweb-dev/react";
import { useContract, useContractWrite } from "@thirdweb-dev/react";
import Logo from "../assets/logonewnew.png";
import { Link } from "react-router-dom";

const navigation = [
  { name: "Home", to: "/" },
  { name: "Registration", to: "/registration" },
  { name: "Vote", to: "/vote" },
  { name: "Donate", to: "/donate" },
];
export default function Registration() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [name, setName] = useState("");

  const resetForm = () => {
    setName("");
  };

  const { contract } = useContract(
    "0xd6f7113551358EE1e20b5004F7EDA2f78723042e"
  );
  const { mutateAsync: addSchool, isLoading } = useContractWrite(
    contract,
    "addSchool"
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await addSchool({ args: [name] });
      console.log("School name:", name);
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
    resetForm();
  };

  return (
    <section className="bg-gradient-to-bl from-green-200 to-green-500 py-[17rem] sm:py-[18rem] lg:py-[15rem]">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link to="#" className="-m-1.5 p-1.5 ">
              <span className="sr-only">Your Company</span>
              <img className="h-20 w-auto" src={Logo} alt="" />
            </Link>
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
              <Link
                key={item.name}
                to={item.to}
                className="text-sm font-semibold leading-6 text-white hover:text-black"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="hidden  lg:flex lg:flex-1 lg:justify-end">
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
              <Link to="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt=""
                />
              </Link>
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
                    <Link
                      key={item.name}
                      to={item.to}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </Link>
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
      <div className="px-6 pt-0 lg:px-8 mt-0 flex justify-center items-center">
        <div className="max-w-3xl mx-auto text-center justify-center">
          <h1 className="text-4xl font-bold tracking-tight mb-8">
            Add your School
          </h1>
          <div className="flex justify-center mb-8">
            <img
              className="h-20 w-auto rounded-2xl shadow-lg shadow-black mt-10"
              src="https://www.fasa.co.za/wp-content/uploads/2022/11/Registration-of-Trading-As-names-by-companies-e1667909108895.jpg"
              alt=""
            />
          </div>
          <p className="mt-10 text-lg leading-8 text-white">
            brief registration story...and to cover the empty space
          </p>
          <div className="mt-10 flex justify-center items-center">
            <form className="w-500 mx-auto p-20 border border-gray-300 rounded-3xl shadow-sm shadow-black">
              <h1 className="text-center pb-10 text-xl font-semibold">
                Add School
              </h1>
              <div className="mb-4">
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg text-center"
                  placeholder="School Name"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white px-3.5 py-2.5 text-sm font-semibold rounded shadow-sm hover:text-black hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
                onClick={handleSubmit}
              >
                {isLoading ? "Adding..." : "Add School"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
