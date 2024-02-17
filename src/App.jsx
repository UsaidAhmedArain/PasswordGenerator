import { useCallback, useState, useEffect,useRef } from "react";

function App() {
  const [length, setLength] = useState("");
  const [number, setNumber] = useState(false);
  const [char, setChar] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const copiedPasswordToClipBoard = () =>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (number) str += "0123456789";

    if (char) str += "-=~!@`#$%^&*()_+";

    // for (let i = 1; i <= length; i++) {
    //   let Character = Math.floor(Math.random * str.length + 1);
    //   pass += str.charAt(Character);
    //   console.log(pass);
    // }

    let i = 1;
    while (i <= length) {
      let character =  (Math.floor( Math.random() * str.length + 1));
      pass += str.charAt(character)
      i++;
    }

    setPassword(pass);

  }, [length, number, char, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, number, char, passwordGenerator]);

  return (
    <>
      <div className=" p-6 bg-slate-600 mt-12 rounded-md w-full">
      <h1 className="text-white text-3xl text-center">Password Generator</h1>
        <div className=" flex flex-row mt-4">
          <input
            type="text"
            value={password}
            readOnly
            ref={passwordRef}
            placeholder="Password"
            className="w-96 p-2 text-orange-500 outline-none text-xl"
          />
          <button className="bg-blue-700 text-white p-2 font-semibold"
          onClick={copiedPasswordToClipBoard}>
            Copy
          </button>
        </div>
        <div className="flex items-center gap-3 mt-6">
          <input
            type="range"
            min={6}
            value={length}
            max={100}
            onChange={(e) => setLength(e.target.value)}
          />
          <label className="text-orange-500">Length ({length})</label>
          <input
            type="checkbox"
            id="num"
            defaultChecked={number}
            onChange={() => {
              setNumber((prev) => !prev);
            }}
            name="num"
          />{" "}
          <label htmlFor="num" className="text-orange-500">
            Numbers
          </label>
          <input
            type="checkbox"
            id="char"
            defaultChecked={char}
            onChange={() => {
              setChar((prev) => !prev);
            }}
          />
          <label htmlFor="char" className="text-orange-500">
            Characters
          </label>
        </div>
      </div>
    </>
  );
}

export default App;
