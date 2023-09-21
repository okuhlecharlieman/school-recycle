import { useState, useEffect, useRef } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ConnectWallet } from "@thirdweb-dev/react";
import {
  useContract,
  useContractWrite,
  useContractEvents,
} from "@thirdweb-dev/react";
import Logo from "../assets/logonewnew.png";
import { Link } from "react-router-dom";

const navigation = [
  { name: "Home", to: "/" },
  { name: "Registration", to: "/registration" },
  { name: "Vote", to: "/vote" },
  { name: "Donate", to: "/donate" },
];

export default function Vote() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { contract } = useContract(
    "0xd6f7113551358EE1e20b5004F7EDA2f78723042e"
  );
  const { mutateAsync: vote, isLoading } = useContractWrite(contract, "vote");
  const [schoolIndex, setSchoolIndex] = useState(0);
  const { events: schoolEvents } = useContractEvents(contract, "SchoolAdded");
  const [schools, setSchools] = useState([]);
  const [error, setError] = useState(null); // State variable for error handling
  const schoolArrayRef = useRef([]);

  useEffect(() => {
    if (schoolEvents && schoolEvents.length > 0) {
      // Get the latest event.
      const latestEvent = schoolEvents[schoolEvents.length - 1];

      // Extract the school data from the event.
      const school = latestEvent.returnValues.school;

      // Update the schools array with the new school data.
      schoolArrayRef.current = [...schoolArrayRef.current, school];
      setSchools(schoolArrayRef.current);
    }

    console.log("schoolEvents", schoolEvents);
  }, [schoolEvents]);

  const handleSchoolChange = (e) => {
    setSchoolIndex(e.target.value);
  };

  const handleVote = async (e) => {
    e.preventDefault();

    try {
      const data = await vote({ args: [String(schoolIndex)] });
      console.info("contract call success", data);
    } catch (err) {
      console.error("contract call failure", err);
      setError("Failed to vote. Please try again."); // Update the error state
    }
  };

  return (
    <div className="bg-gradient-to-bl from-green-200 to-green-500 py-[17rem] sm:py-[18rem] lg:py-[19rem] ">
      <header className="absolute inset-x-0 top-0 z-50  ">
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

      <div className="relative px-6 pt-1 lg:px-8 mt-0 flex justify-center">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-8">
            Vote for a school!
          </h1>
          <div className="flex justify-center mb-8">
            <img
              className="h-20 w-auto rounded-2xl shadow-lg shadow-black mt-10"
              src="https://dwu32cgxelq1c.cloudfront.net/local_newspapers/sites/56/2016/07/Castvote-1.jpg"
              alt=""
            />
          </div>
          <p className="mt-10 text-lg leading-8 text-white">
            brief voting story...and to cover the empty space
          </p>
          <div className="flex flex-col space-y-4">
            <label className="text-lg">Choose an option below:</label>
            <div className="flex space-x-4 justify-center">
              <select
                value={schoolIndex}
                onChange={handleSchoolChange}
                className="w-full rounded-lg"
              >
                {schools.map((school, index) => (
                  <option key={index} value={index}>
                    {school.event}

                    {/* Replace 'name' with the actual property you want to display */}
                  </option>
                ))}
              </select>
              <button
                onClick={handleVote}
                className="px-4 py-2 bg-black  text-white font-medium rounded-md"
                disabled={isLoading} // Disable the button during loading state
              >
                {isLoading ? "Voting..." : "Vote"}{" "}
                {/* Update button text during loading state */}
              </button>
            </div>
            {error && <p className="text-red-500">{error}</p>}{" "}
            {/* Display error message if present */}
          </div>
        </div>
      </div>
    </div>
  );
}
