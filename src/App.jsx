import { useEffect, useRef, useState } from "react";

const GUIDANCE = {
  before: [
    {
      title: "Learn the role and the team",
      why: "A little research helps you connect your experience to what the team needs.",
      do: "Read the job description and the company's public information. Note two questions about the work.",
      avoid: "Memorizing the company website or pretending to know things you haven't researched.",
    },
    {
      title: "Prepare a few real examples",
      why: "Specific stories make your skills easier to understand and remember.",
      do: "Think of examples that show problem-solving, collaboration, and learning. Practice them with STAR.",
      avoid: "Writing a script to recite word-for-word or inventing results you can't support.",
    },
    {
      title: "Plan the practical details",
      why: "Reducing last-minute stress leaves more attention for the conversation.",
      do: "Confirm the time, location or meeting link, names, and travel or technology needs.",
      avoid: "Joining late without notice. If something unexpected happens, contact them promptly.",
    },
    {
      title: "Choose a comfortable setup",
      why: "A considerate, distraction-light setup helps everyone focus on the conversation.",
      do: "Choose comfortable attire suited to the role and check your camera, sound, and background.",
      avoid: "Assuming there is one correct outfit for every industry, workplace, or person.",
    },
  ],
  during: [
    {
      title: "Start with a warm introduction",
      why: "A calm greeting and attentive presence make it easier to build rapport.",
      do: "Greet people, use their names if you know them, and take a moment to settle in.",
      avoid: "Rushing through an opening or apologizing repeatedly for ordinary nerves.",
    },
    {
      title: "Answer the question you were asked",
      why: "A clear answer is easier to follow and gives the interviewer room to ask more.",
      do: "Pause, answer directly, then add a concise example. Ask for clarification if needed.",
      avoid: "Going off on long tangents or guessing what the interviewer wants to hear.",
    },
    {
      title: "Show how you work with others",
      why: "How you think, learn, and collaborate matters alongside the final result.",
      do: "Use “I” for your contribution and “we” to recognize teammates. Be candid about lessons.",
      avoid: "Taking all the credit, blaming others, or speaking disrespectfully about past colleagues.",
    },
    {
      title: "Make it a two-way conversation",
      why: "Good questions help you decide whether the role is a fit, too.",
      do: "Ask about success in the role, team practices, priorities, or next steps.",
      avoid: "Interrupting, checking your phone, or asking questions answered moments ago.",
    },
    {
      title: "Be honest when you don't know",
      why: "Thoughtful curiosity is more credible than bluffing.",
      do: "Say what you know, explain how you'd find out, or ask a useful follow-up.",
      avoid: "Making up experience or presenting a guess as a fact.",
    },
  ],
  after: [
    {
      title: "Send a brief, thoughtful follow-up",
      why: "A timely note lets you thank the interviewers and reinforce your interest.",
      do: "Within a day or so, thank them, mention one specific topic, and keep it concise.",
      avoid: "Sending repeated messages or treating a thank-you note as a substitute for qualifications.",
    },
    {
      title: "Reflect while it's fresh",
      why: "A quick review turns every interview into useful practice.",
      do: "Write down what went well, what you'd change, and any follow-up you promised.",
      avoid: "Treating one outcome as a verdict on your ability or your future.",
    },
    {
      title: "Respect the process and your boundaries",
      why: "Professional follow-up can be confident while still being considerate.",
      do: "Follow the timeline they shared. If it passes, send one polite check-in.",
      avoid: "Pressuring the interviewer or sharing confidential details publicly.",
    },
  ],
};

const FRAMES = [
  {
    tag: "Example 1 · Arriving",
    title: "Arrive ready to settle in",
    text: "Aim to arrive a few minutes early, check in with the right person, and take a moment to breathe. For a video call, join a little ahead of time and check your audio.",
    tip: "Timing norms vary. Follow the instructions you were given, and send a quick update if something unexpected delays you.",
  },
  {
    tag: "Example 2 · Greeting",
    title: "Choose a comfortable greeting",
    text: "A warm hello and your name are enough to start. Follow the other person's lead; a handshake is optional and may not suit everyone or every culture.",
    tip: "You don't need to force a handshake or eye contact to show confidence. A respectful greeting and attentive listening work well.",
  },
  {
    tag: "Example 3 · Opening conversation",
    title: "Let small talk be a bridge",
    text: "A simple “Thanks for meeting with me—I've been looking forward to learning more about the role” is friendly and gets the conversation moving.",
    tip: "Keep it natural and brief, then follow the interviewer's lead.",
  },
  {
    tag: "Example 4 · Getting settled",
    title: "Set yourself up comfortably",
    text: "Take the offered seat or get comfortable on the call. Sit or stand in a way that works for you, and keep notes nearby if they're helpful.",
    tip: "There isn't one correct posture. Comfort and being able to participate matter more than performing a pose.",
  },
  {
    tag: "Example 5 · First question",
    title: "Shape a focused introduction",
    text: "For “Tell me about yourself,” share what you do now, one relevant result or strength, and what interests you about this role. Aim for about a minute, then invite the next question.",
    tip: "A short pause to gather your thoughts is completely fine. You don't need to recount your whole life story.",
  },
  {
    tag: "Example 6 · Listening",
    title: "Listen, then answer the question",
    text: "Let the interviewer finish, pause to think, and respond to what they actually asked. A concise example can make your point clear.",
    tip: "If you lose your thread, summarize the result and stop—or ask if they'd like more detail.",
  },
  {
    tag: "Example 7 · Your questions",
    title: "Ask questions that help you decide",
    text: "Prepare a couple of genuine questions about the work, the team, or how success is measured. For example: “What would a strong first few months look like?”",
    tip: "Use the conversation to learn whether the role is right for you, too.",
  },
  {
    tag: "Example 8 · Closing",
    title: "End with clarity and thanks",
    text: "Thank the interviewer for their time, mention something specific you appreciated, and ask about next steps if they haven't covered them.",
    tip: "A brief follow-up note can be thoughtful. Keep it specific, and respect the timeline they share.",
  },
];

const QUIZ = [
  {
    prompt: "You arrive early for an interview. What's a thoughtful next step?",
    options: [
      "Check in as instructed, then wait without pressuring the interviewer",
      "Ask the interviewer to begin immediately",
      "Leave and return at the exact start time",
    ],
    answer: 0,
    why: "Checking in and waiting calmly respects their schedule. Follow any arrival instructions they provided.",
  },
  {
    prompt: "What's a good way to greet an interviewer?",
    options: [
      "Insist on a handshake to show confidence",
      "Offer a friendly greeting and follow their lead",
      "Avoid greeting them until they ask the first question",
    ],
    answer: 1,
    why: "A warm verbal greeting is always an option. Greetings vary by culture, personal preference, and access needs.",
  },
  {
    prompt: "They offer you a seat. What should you do?",
    options: [
      "Take the seat and settle in comfortably",
      "Stay standing until the first question",
      "Copy a rigid posture to look professional",
    ],
    answer: 0,
    why: "Get comfortable in a way that works for you. There's no single correct posture for an interview.",
  },
  {
    prompt: "How can you keep “Tell me about yourself” focused?",
    options: [
      "Walk through your complete personal history",
      "Share what you do, relevant evidence, and why this role interests you",
      "Give a one-word job title and wait",
    ],
    answer: 1,
    why: "A brief present–proof–interest structure gives useful context without taking over the conversation.",
  },
  {
    prompt: "You don't understand the question. What's the best response?",
    options: [
      "Answer something else and hope it is close",
      "Ask them to rephrase or clarify the part you're unsure about",
      "Stay silent until they move on",
    ],
    answer: 1,
    why: "A clarifying question is professional and helps you answer what they actually want to know.",
  },
  {
    prompt: "The interviewer is still finishing their question, and you know your answer. You…",
    options: [
      "Wait for them to finish, then take a moment to respond",
      "Jump in so they know you're prepared",
      "Interrupt with a short answer and add detail later",
    ],
    answer: 0,
    why: "Letting them finish shows you are listening and gives you a moment to organize your response.",
  },
  {
    prompt: "You notice you're rambling midway through an answer. What helps?",
    options: [
      "Talk faster and add every detail you remember",
      "Apologize and restart from the beginning",
      "Land your main point or result, then stop",
    ],
    answer: 2,
    why: "A concise ending helps the interviewer follow you. You can offer more detail if they want it.",
  },
  {
    prompt: "The interview is ending. What's a helpful way to close?",
    options: [
      "Ask them to make a decision today",
      "Thank them for something specific and ask about next steps",
      "Leave without a goodbye to avoid taking more time",
    ],
    answer: 1,
    why: "A specific thank-you shows you were engaged, and asking about next steps is a respectful way to close.",
  },
];

const PASS_SCORE = 6;
const STORAGE_KEY = "interview-ready-completed";
const STAGES = ["before", "during", "after"];
const STAGE_LABELS = { before: "Before", during: "During", after: "After" };

function readReviewedTips() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [stage, setStage] = useState("before");
  const [reviewedTips, setReviewedTips] = useState(readReviewedTips);
  const [storageUnavailable, setStorageUnavailable] = useState(false);
  const [frameIndex, setFrameIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [showSelfCheck, setShowSelfCheck] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState([]);
  const tabRefs = useRef([]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reviewedTips));
      setStorageUnavailable(false);
    } catch {
      setStorageUnavailable(true);
    }
  }, [reviewedTips]);

  const toggleReviewed = (id) => {
    setReviewedTips((current) =>
      current.includes(id) ? current.filter((tip) => tip !== id) : [...current, id]
    );
  };

  const changeStage = (nextStage, focus = false) => {
    setStage(nextStage);
    if (focus) tabRefs.current[STAGES.indexOf(nextStage)]?.focus();
  };

  const handleTabKeyDown = (event) => {
    const currentIndex = STAGES.indexOf(stage);
    let nextIndex;
    if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = STAGES.length - 1;
    else if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % STAGES.length;
    else if (event.key === "ArrowLeft") nextIndex = (currentIndex - 1 + STAGES.length) % STAGES.length;
    else return;
    event.preventDefault();
    changeStage(STAGES[nextIndex], true);
  };

  const frame = FRAMES[frameIndex];
  const question = QUIZ[quizIndex];
  const selectedAnswer = quizAnswers[quizIndex];
  const quizComplete = quizIndex === QUIZ.length;
  const score = quizAnswers.reduce(
    (total, selected, index) => total + (selected === QUIZ[index].answer ? 1 : 0),
    0
  );
  const wordCount = answer.trim() ? answer.trim().split(/\s+/).length : 0;

  const chooseAnswer = (answerIndex) => {
    if (selectedAnswer !== undefined) return;
    setQuizAnswers((current) => {
      const next = [...current];
      next[quizIndex] = answerIndex;
      return next;
    });
  };

  const resetQuiz = () => {
    setQuizAnswers([]);
    setQuizIndex(0);
  };

  return (
    <>
      <header className="shell site-header">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">IR</span>
          <span>Interview Ready</span>
        </div>
        <span className="header-note">A calmer way to prepare</span>
      </header>

      <main className="shell">
        <section className="hero" aria-labelledby="page-title">
          <span className="eyebrow">Your interview field guide</span>
          <h1 id="page-title">Show up ready.<br />Be yourself.</h1>
          <p>
            Interviews are conversations, not performances. Get practical guidance on{" "}
            <strong>what to do, what to avoid, and how to practice</strong> at every stage.
          </p>
        </section>

        <section className="path" aria-label="Interview stages">
          <PathStep number="01" title="Before" subtitle="Prepare with purpose" />
          <PathStep number="02" title="During" subtitle="Connect and communicate" />
          <PathStep number="03" title="After" subtitle="Follow up and reflect" />
        </section>

        <section aria-labelledby="guide-title">
          <div className="section-heading">
            <div>
              <h2 id="guide-title">Your interview playbook</h2>
              <p>Small, specific actions make a stronger impression than trying to be perfect.</p>
            </div>
            <div
              className="tabs"
              role="tablist"
              aria-label="Choose an interview stage"
              onKeyDown={handleTabKeyDown}
            >
              {STAGES.map((item, index) => (
                <button
                  key={item}
                  ref={(element) => { tabRefs.current[index] = element; }}
                  className="tab"
                  id={`tab-${item}`}
                  type="button"
                  role="tab"
                  aria-selected={stage === item}
                  aria-controls="tips-panel"
                  tabIndex={stage === item ? 0 : -1}
                  onClick={() => changeStage(item)}
                >
                  {STAGE_LABELS[item]}
                </button>
              ))}
            </div>
          </div>

          <div className="cards" id="tips-panel" role="tabpanel" aria-labelledby={`tab-${stage}`}>
            {GUIDANCE[stage].map((tip, index) => {
              const id = `${stage}-${index}`;
              const isReviewed = reviewedTips.includes(id);
              return (
                <article className="tip-card" key={id}>
                  <div className="tip-top">
                    <h3>{tip.title}</h3>
                    <span className="status">{isReviewed ? "Reviewed" : "Key move"}</span>
                  </div>
                  <p className="why">{tip.why}</p>
                  <div className="advice">
                    <div className="advice-row do"><b>Do</b><span>{tip.do}</span></div>
                    <div className="advice-row avoid"><b>Avoid</b><span>{tip.avoid}</span></div>
                  </div>
                  <button
                    className="done-button"
                    type="button"
                    aria-pressed={isReviewed}
                    onClick={() => toggleReviewed(id)}
                  >
                    {isReviewed ? "✓ Marked as reviewed" : "＋ Mark as reviewed"}
                  </button>
                </article>
              );
            })}
          </div>
          <p className="closing-note" aria-live="polite">
            {GUIDANCE[stage].filter((_, index) => reviewedTips.includes(`${stage}-${index}`)).length}
            {" of "}{GUIDANCE[stage].length} tips reviewed for {stage}.
            {storageUnavailable
              ? " Progress can't be saved in this browser."
              : " Progress is saved in this browser."}
          </p>
        </section>

        <section className="practice" aria-labelledby="practice-title">
          <div>
            <span className="practice-label">Practice room · behavioral question</span>
            <h2 id="practice-title">Build a clear answer</h2>
            <p className="question">“Tell me about a time you had to solve a difficult problem.”</p>
            <p className="prompt-hint">
              Use STAR to keep your story focused. You can jot down a rough outline—this is practice, not a test.
            </p>
          </div>
          <form
            className="answer-area"
            onSubmit={(event) => {
              event.preventDefault();
              setShowSelfCheck(true);
            }}
          >
            <label htmlFor="answer" className="practice-label">Your outline</label>
            <textarea
              id="answer"
              maxLength={1500}
              value={answer}
              onChange={(event) => setAnswer(event.target.value)}
              placeholder={"Situation: What was happening?\nTask: What needed to get done?\nAction: What did you do?\nResult: What changed?"}
            />
            <div className="practice-footer">
              <span className="word-count" aria-live="polite">{wordCount} words · aim for about 180</span>
              <button className="primary-button" type="submit">Show self-check</button>
            </div>
          </form>
          {showSelfCheck && (
            <div className="self-check" role="status">
              <strong>A quick self-check</strong>
              <ul>
                <li>Give only enough context to set the scene.</li>
                <li>Make your own actions clear (“I,” not only “we”).</li>
                <li>Include a concrete outcome or lesson learned.</li>
                <li>Keep the story focused and truthful.</li>
              </ul>
            </div>
          )}
        </section>

        <section className="learning-section" aria-labelledby="walkthrough-title">
          <SectionHeading
            id="walkthrough-title"
            title="Walk through the room"
            subtitle="Eight moments, from arriving to wrapping up. Adapt each suggestion to the setting and your needs."
          />
          <article className="walkthrough" aria-live="polite">
            <div className="walkthrough-top">
              <span className="walkthrough-tag">{frame.tag}</span>
              <span className="step-count">{frameIndex + 1} / {FRAMES.length}</span>
            </div>
            <h3>{frame.title}</h3>
            <p className="walkthrough-copy">{frame.text}</p>
            <div className="scene-tip">Tip: {frame.tip}</div>
            <div className="walkthrough-bottom">
              <span className="step-count">Moment {frameIndex + 1} of {FRAMES.length}</span>
              <div className="walkthrough-actions">
                <button
                  className="secondary-button"
                  type="button"
                  disabled={frameIndex === 0}
                  onClick={() => setFrameIndex((current) => Math.max(0, current - 1))}
                >
                  Previous
                </button>
                <button
                  className="primary-button"
                  type="button"
                  onClick={() => setFrameIndex((current) => (current + 1) % FRAMES.length)}
                >
                  {frameIndex === FRAMES.length - 1 ? "Start again" : "Next moment"}
                </button>
              </div>
            </div>
          </article>
        </section>

        <section className="learning-section" aria-labelledby="quiz-title">
          <SectionHeading
            id="quiz-title"
            title="Check your interview instincts"
            subtitle="Choose the most helpful response. Learn from each answer as you go."
          />
          <div className="quiz" aria-live="polite">
            <div className="quiz-top">
              <span className="practice-label">Interview basics quiz</span>
              <span className="quiz-count">
                {quizComplete ? "Complete" : `Question ${quizIndex + 1} of ${QUIZ.length}`}
              </span>
            </div>
            <div
              className="quiz-progress"
              role="progressbar"
              aria-label="Quiz progress"
              aria-valuemin={0}
              aria-valuemax={QUIZ.length}
              aria-valuenow={quizComplete ? QUIZ.length : quizIndex + (selectedAnswer === undefined ? 0 : 1)}
            >
              <span
                style={{
                  width: `${(quizComplete ? 1 : (quizIndex + (selectedAnswer === undefined ? 0 : 1)) / QUIZ.length) * 100}%`,
                }}
              />
            </div>
            {quizComplete ? (
              <div className="quiz-result">
                <h3>
                  {score >= PASS_SCORE
                    ? "Nice work—you've got the fundamentals."
                    : "Good practice. Give it another round."}
                </h3>
                <p>
                  You got {score} out of {QUIZ.length} correct.{" "}
                  {score >= PASS_SCORE
                    ? "Keep adapting these ideas to the person, setting, and role."
                    : `Review the explanations and try for ${PASS_SCORE} correct answers.`}
                </p>
                <button className="primary-button" type="button" onClick={resetQuiz}>Try again</button>
              </div>
            ) : (
              <>
                <p className="quiz-question" id="quiz-question">{question.prompt}</p>
                <div className="quiz-options" role="group" aria-labelledby="quiz-question">
                  {question.options.map((option, index) => {
                    const isSelected = selectedAnswer === index;
                    const resultClass = selectedAnswer === undefined ? "" : isSelected
                      ? (index === question.answer ? "correct" : "incorrect")
                      : "";
                    return (
                      <button
                        className={`quiz-option ${resultClass}`}
                        key={option}
                        type="button"
                        aria-pressed={isSelected}
                        disabled={selectedAnswer !== undefined}
                        onClick={() => chooseAnswer(index)}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
                {selectedAnswer !== undefined && (
                  <div className={`quiz-feedback ${selectedAnswer === question.answer ? "" : "incorrect"}`} role="status">
                    <strong>{selectedAnswer === question.answer ? "That's it." : "Here's the helpful approach."}</strong>
                    {question.why}
                  </div>
                )}
                {selectedAnswer !== undefined && (
                  <div className="quiz-footer">
                    <button
                      className="primary-button"
                      type="button"
                      onClick={() => setQuizIndex((current) => current + 1)}
                    >
                      {quizIndex === QUIZ.length - 1 ? "See my score" : "Next question"}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>

      <footer>
        <div className="shell">
          There is no one perfect interview style. Be prepared, be respectful, and let your real experience come through.
        </div>
      </footer>
    </>
  );
}

function PathStep({ number, title, subtitle }) {
  return (
    <div className="path-step">
      <span className="path-number">{number}</span>
      <div><strong>{title}</strong><span>{subtitle}</span></div>
    </div>
  );
}

function SectionHeading({ id, title, subtitle }) {
  return (
    <div className="section-heading">
      <div>
        <h2 id={id}>{title}</h2>
        <p>{subtitle}</p>
      </div>
    </div>
  );
}
