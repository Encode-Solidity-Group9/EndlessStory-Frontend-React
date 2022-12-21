import { async } from "q";
import { useEffect, useState } from "react";

function Story({ status, connect, account, chainId, ethereum }) {
  const [currentStory, setCurrentStory] = useState("");
  const [exampleStory, setExampleStory] = useState("");
  const [read, setRead] = useState(false);
  const [readExample, setReadExample] = useState(false);
  const [participate, setParticipate] = useState(false);
  const [keywords, setKeywords] = useState("");
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [success, setSuccess] = useState(false);
  const [successText, setSuccessText] = useState(false);

  let count = 0;

  const getStory = async () => {
    fetch("http://localhost:3001/story").then(async (response) => {
      const text = await response.text();
      setCurrentStory(text);
    });
  };

  const getExampleStory = async () => {
    fetch("http://localhost:3001/story-example").then(async (response) => {
      const text = await response.text();
      setExampleStory(text);
    });
  };

  const submitKeywords = async () => {
    setError(false);
    setSuccess(false);
    let words = [];
    // if (keywords.includes(",")) {
    //   words = keywords.split(",");
    // }
    if (keywords === "") {
      setErrorText(`No keywords found. At least one keyword is required.`);
      setError(true);
    } else if (words.length > 3) {
      setErrorText(
        `A maximum of 3 keywords is required, but you entered ${words.length}`
      );
      setError(true);
    } else {
      fetch("http://localhost:3001/append", {
        method: "POST",
        body: {
          keywords: keywords,
        },
      })
        .then(async (response) => {
          const text = await response.text();
          setCurrentStory(text);
          setSuccessText(
            "Your keywords were successfully recorded. Read the story now!"
          );
          setSuccess(true);
          count++;
          setKeywords("");
        })
        .catch((err) => {
          console.log(err);
          setErrorText(`Check your keywords again.`);
          setError(true);
        });
    }
  };

  useEffect(() => {
    getExampleStory();
    getStory();
  });

  return (
    <section className=" bg-[#282c34] min-h-screen">
      <div id="next" className="flex flex-col items-center">
        <div className="w-3/5 text-[#e8fdff] my-14">
          <p className="py-2 font-mono">Your account</p>
          <p className="font-mono text-2xl mb-4">{account}</p>
          <p
            className={`font-mono font-bold text-xl text-[#61dafb] my-10 ${
              read
                ? "hidden no-underline"
                : " underline underline-offset-2 cursor-pointer"
            }'}`}
            onClick={() => {
              setRead(!read);
            }}
          >
            Read the story...
          </p>
          <p
            className={`font-mono font-bold text-xl text-[#61dafb] my-10 ${
              readExample
                ? "hidden no-underline"
                : " underline underline-offset-2 cursor-pointer"
            }'}`}
            onClick={() => {
              setReadExample(!readExample);
            }}
          >
            Read an example story...
          </p>
          {read && (
            <div className="font-mono text-base my-10">
              <p className="font-bold text-xl my-5 text-[#61dafb]">
                Oh snap! This story has no title yet.
              </p>
              <p className="font-mono text-base">{currentStory}</p>
            </div>
          )}
          {readExample && (
            <div className="font-mono text-base mb-10">
              <p className="font-bold text-xl my-5 text-[#61dafb]">
                Example Story: The peanut warrior
              </p>
              <p className="font-mono text-base">{exampleStory}</p>
            </div>
          )}
          <div>
            <button
              className={`px-6 py-4 bg-[#0052ef] rounded-xl font-mono ${
                status !== "connected" &&
                "bg-transparent border-2 border-[#e8fdff] text-[#e8fdff]"
              }`}
              onClick={() => {
                if (status === "unavailable") {
                  window.open("https://metamask.io/download/", "_blank");
                } else if (status !== "connected") {
                  connect();
                } else {
                  setParticipate(true);
                }
              }}
            >
              {status === "unavailable"
                ? "Download and install MetaMask"
                : status !== "connected"
                ? "Connect your wallet to participate"
                : count === 0
                ? "Participate"
                : "Participate again"}
            </button>
          </div>
          {participate && (
            <div>
              <p className="font-mono text-[#e8fdff] text-base mt-10 mb-5">
                Enter a maximum of 3 keywords below, separated by commas
              </p>
              <input
                type="text"
                onChange={(e) => setKeywords(e)}
                className="block bg-[#e8fdff] outline-none font-mono text-base text-[#282c34] w-[30rem] px-3 py-4 rounded-lg"
                placeholder="Enter your keywords here"
              />
              <button
                className="px-6 py-3 rounded-xl mt-6 font-mono bg-transparent border border-[#e8fdff] text-[#e8fdff]"
                onClick={submitKeywords}
              >
                Submit
              </button>
            </div>
          )}
          {error && (
            <div className="text-red-500 text-base font-mono my-5">
              <p>Oops! The unexpected has happened.</p>
              {errorText}
            </div>
          )}
          {success && (
            <div className="text-[#e8fdff] text-base font-mono my-5">
              <p>Yayyy!</p>
              {successText}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Story;
