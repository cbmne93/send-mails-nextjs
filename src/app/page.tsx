"use client";
import { useState } from "react";

export default function Home() {
  const [alertMessage, setAlertMessage] = useState({
    message: "",
    status: "",
  });

  const [emailInfo, setEmailInfo] = useState({
    from: "",
    subject: "",
    to: "",
    content: "",
  });

  const sendEmailInfo = async () => {
    const res = await fetch("/api/sendEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailInfo),
    });
    const data = await res.json();

    if (data.success) {
      setEmailInfo({
        from: "",
        subject: "",
        to: "",
        content: "",
      });
      setAlertMessage({
        message: "Email enviado correctamente",
        status: "success",
      });
    } else {
      setAlertMessage({
        message: "Error enviando el email",
        status: "error",
      });
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="max-w-lg mt-10">
        <h1 className="text-center">Envio de correos</h1>
        <div>
          <input
            value={emailInfo.from}
            onChange={(e) =>
              setEmailInfo({ ...emailInfo, from: e.target.value })
            }
            className="border w-full mt-2 rounded p-2"
            type="text"
            placeholder="From"
          />
          <input
            value={emailInfo.subject}
            onChange={(e) =>
              setEmailInfo({ ...emailInfo, subject: e.target.value })
            }
            className="border w-full mt-2 rounded p-2"
            type="text"
            placeholder="Subject"
          />
          <input
            value={emailInfo.to}
            onChange={(e) => setEmailInfo({ ...emailInfo, to: e.target.value })}
            className="border w-full mt-2 rounded p-2"
            type="text"
            placeholder="To"
          />

          <textarea
            value={emailInfo.content}
            onChange={(e) =>
              setEmailInfo({ ...emailInfo, content: e.target.value })
            }
            className="border w-full mt-2 rounded p-2"
            rows={5}
            placeholder="Content"
          ></textarea>

          {alertMessage.message && (
            <div
              className={`${
                alertMessage.status === "success"
                  ? "bg-green-200 text-green-800"
                  : "bg-red-200 text-red-800"
              } p-2 rounded my-2`}
            >
              {alertMessage.message}
            </div>
          )}

          <button
            onClick={sendEmailInfo}
            className="w-full bg-blue-500 text-white rounded p-2"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
