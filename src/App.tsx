import { Button } from "@/components/ui/button";
import { ModeToggle } from "./components/ui/mode-toggle";
import { useEffect, useState, type FormEvent } from "react";
import axios from "axios";
import { Input } from "./components/ui/input";

function App() {
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  interface Interaction {
    originalQuestion: string;
    aiQuestion: string;
    answer: string;
  }
  const [conversation, setConversation] = useState<Interaction[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);

  // questions.forEach((question) => {
  //   const convo = { question: question };
  //   conversation.push(convo);
  // });

  // const handleBtnClick = async () => {
  //   const prevQuestion =
  //     "What are your weaknesses, and how are you working to improve them?";
  //   const prevAnswer = `
  //   One weakness I've noticed in myself is that I sometimes spend too much time trying to perfect small details in my work. I care a lot about quality, but I realized it can slow down my progress when I focus too long on minor parts of a project. To improve, I've been setting clearer priorities and deadlines for each task so I can balance quality with efficiency. I also make it a habit to ask for feedback early, which helps me focus on what really matters instead of over-polishing. It's helped me become more productive without sacrificing the quality of my work.`;

  //   const nextQuestion = value;

  //   const systemPrompt = `
  //   You are an AI interviewer conducting a professional job interview.

  //   1. Read the applicant's previous answer carefully.
  //   2. Provide a short, friendly, and natural acknowledgment that shows you understood their response.
  //   3. Include a brief evaluation or comment that recognizes the applicant's thought, experience, or perspective
  //   4. After your acknowledgment and short evaluation, ask the next interview question provided below.
  //   5. Keep your tone professional, polite, and conversational.
  //   6. Avoid giving lengthy feedback, personal opinions, or unrelated comments—keep it concise and relevant to their answer.

  //   Previous Question: ${prevQuestion}
  //   Candidate's Answer: ${prevAnswer}
  //   Next Question: ${nextQuestion}`;

  //   try {
  //     setLoading(true);
  //     const { data } = await axios.post("https://apifreellm.com/api/chat", {
  //       message: systemPrompt,
  //     });
  //     setResponse(data.response);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // let conversation: object[] = [];

  // const handleInterviewStart = async () => {
  //   const currentConvoIndex =
  //     conversation.length > 0 ? conversation.length - 1 : 0;

  //   const systemPrompt = `
  //     You are an AI interviewer conducting a professional job interview.

  //     1. Start with a polite and friendly greeting that sets a comfortable tone for the conversation.
  //     2. Briefly introduce yourself as the interviewer and explain that you'll be asking a few questions to learn more about the applicant's background and experience.
  //     3. Then, naturally transition into asking the first interview question provided below.
  //     4. Keep your tone professional, warm, and conversational—like a real interviewer who wants the applicant to feel at ease.
  //     5. Avoid giving feedback, evaluations, or personal opinions at this stage since this is just the start of the interview.

  //     First Question: ${questions[currentConvoIndex]}
  //   `;
  //   console.log(systemPrompt);
  // };

  const questions = [
    "Can you tell me a bit about yourself and your background?",
    "What's a project or accomplishment you're most proud of?",
    "How do you usually approach solving problems or challenges?",
    "Can you describe a time you worked as part of a team?",
    "What are your goals for the next few years?",
  ];

  useEffect(() => {
    const generateQuestion = async (): Promise<void | null> => {
      try {
        console.log("Fetch!");

        setLoading(true);
        const systemPrompt = `
        You are Mica an AI interviewer conducting a professional job interview.
        1. Start with a polite and friendly greeting that sets a comfortable tone for the conversation.
        2. Briefly introduce yourself as the interviewer and explain that you'll be asking a few questions to learn more about the applicant's background and experience.
        3. Then, naturally transition into asking the first interview question provided below.
        4. Keep your tone professional, warm, and conversational—like a real interviewer who wants the applicant to feel at ease.
        5. Avoid giving feedback, evaluations, or personal opinions at this stage since this is just the start of the interview.
        First Question: ${questions[currentQIndex]}
      `;
        const { data } = await axios.post("https://apifreellm.com/api/chat", {
          message: systemPrompt,
        });

        const question = questions[currentQIndex];
        if (!question) return null;

        const interaction: Interaction = {
          originalQuestion: question,
          aiQuestion: data.response,
          answer: "",
        };
        setConversation((prev) => [...prev, interaction]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    generateQuestion();
  }, []);

  const handleResponse = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    try {
      const currentConvoIndex =
        conversation.length > 0 ? conversation.length - 1 : 0;

      if (!conversation[currentConvoIndex]) return;
      if (!questions[currentQIndex]) return;

      const newConvo = conversation.map(
        (interaction: Interaction, index: number) =>
          currentConvoIndex === index
            ? { ...interaction, answer: answer }
            : interaction
      );
      setConversation(newConvo);
      setCurrentQIndex((prev: number) => prev + 1);

      const systemPrompt = `
      You are an AI interviewer conducting a professional job interview.

      1. Read the applicant's current answer carefully.
      2. Provide a short, friendly, and natural acknowledgment that shows you understood their response.
      3. Include a brief evaluation or comment that recognizes the applicant's thought, experience, or perspective
      4. After your acknowledgment and short evaluation, ask the next interview question provided below.
      5. Keep your tone professional, polite, and conversational.
      6. Avoid giving lengthy feedback, personal opinions, or unrelated comments—keep it concise and relevant to their answer.

      Current Question: ${conversation[currentConvoIndex].originalQuestion}
      Candidate's Answer: ${answer}
      Next Question: ${questions[currentConvoIndex + 1]}`;

      setLoading(true);
      const { data } = await axios.post("https://apifreellm.com/api/chat", {
        message: systemPrompt,
      });

      const interaction: Interaction = {
        originalQuestion: questions[currentQIndex],
        aiQuestion: data.response,
        answer: "",
      };
      setConversation((prev) => [...prev, interaction]);
      console.log(data.response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <ModeToggle />
      {/* <div>
        <Input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button variant={"outline"} onClick={handleBtnClick}>
          Send
        </Button>
      </div> */}

      {loading ? (
        "Loading..."
      ) : (
        <section>
          {conversation.map((interaction) => {
            return (
              <div>
                <div>
                  <strong> Mica:</strong> <span>{interaction.aiQuestion}</span>
                </div>
                <div>
                  <strong> You:</strong> <span>{interaction.answer || ""}</span>
                </div>
              </div>
            );
          })}
        </section>
      )}

      <form onSubmit={handleResponse}>
        <Input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <Button variant={"outline"} type="submit">
          Send
        </Button>
      </form>
    </section>
  );
}

export default App;
