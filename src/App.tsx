import { Button } from "@/components/ui/button";
import { ModeToggle } from "./components/ui/mode-toggle";
import { useState } from "react";
import axios from "axios";
import { Input } from "./components/ui/input";

function App() {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const handleBtnClick = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("https://apifreellm.com/api/chat", {
        message: value,
      });
      setResponse(data.response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <ModeToggle />
      <div>
        <Input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button variant={"outline"} onClick={handleBtnClick}>
          Send
        </Button>
      </div>

      {loading ? "Loading..." : <p>{response}</p>}
    </section>
  );
}

export default App;
