import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";

import { useMetaMask } from "metamask-react";
import Story from "./Story";

function App() {
  const { status, connect, account, chainId, ethereum } = useMetaMask();

  console.log({ status, connect, account, chainId, ethereum });

  return (
    <section className=" bg-[#282c34] min-h-screen">
      <div className="w-full bg-[#61dafb] h-14 text-[#282c34] text-center font-mono font-medium flex justify-center items-center text-lg">
        Wanna hear the next part of the story? Add your keywords now!
      </div>
      {status !== "connected" && (
        <div className="mt-28 w-full flex h-screen overflow-hidden">
          <div className=" relative flex justify-center w-1/2">
            <div className="flex flex-col items-center">
              <div className="flex z-20 h-44 w-44 rounded-3xl bg-[#61dafb]"></div>
              <div className="flex flex-row space-x-10 -mt-12">
                <div className="flex z-20 h-44 w-44 rounded-3xl bg-[#00aaea]"></div>
                <div className="flex z-0 h-44 w-44 rounded-3xl border-4 border-[#e8fdff]"></div>
              </div>
              <div className="flex z-0 h-44 w-44 rounded-3xl bg-[#0052ef] -mt-12"></div>
            </div>
          </div>
          <div className="w-1/2 flex flex-col text-[#e8fdff] mt-14">
            <p className=" text-4xl font-bold font-mono my-5">
              Collective Story Writing
            </p>
            <p className="font-mono text-xl font-medium my-5">
              Become a writer in 3 easy steps!
            </p>
            <div className="">
              {status === "unavailable" && (
                <p className="mb-2">
                  Oops, it seems you don't have MetaMask installed.
                </p>
              )}
              <button
                className={`px-6 py-4 bg-[#0052ef] rounded-xl font-mono mt-5 ${
                  status === "unavailable" &&
                  "bg-transparent border-2 border-[#e8fdff] text-[#e8fdff]"
                }`}
                onClick={
                  status === "unavailable"
                    ? () => {
                        window.open("https://metamask.io/download/", "_blank");
                      }
                    : connect
                }
              >
                {status === "unavailable"
                  ? "Download and install MetaMask"
                  : "Connect your wallet"}
              </button>
            </div>
          </div>
        </div>
      )}
      {status === "connected" && (
        <Story
          status={status}
          connect={connect}
          account={account}
          chainId={chainId}
          ethereum={ethereum}
        />
      )}
    </section>
  );
}

export default App;
