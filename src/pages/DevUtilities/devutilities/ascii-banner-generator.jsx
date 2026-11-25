"use client";

import React, { useState } from "react";
import { generate } from "figlet";
import { CopyButton } from "@/components/ui/copy-button";

import { useTheme } from "../../context/ThemeContext";

function generateFiglet(text, font) {
  try {
    return require('figlet').textSync(text, { font });
  } catch {
    return "Error: Please enter text";
  }
}

export default function AsciiBannerGenerator() {
  const { dark } = useTheme();
  const theme = {
    light: {
      wrapper: "bg-[#F8F9FA] text-zinc-900",
      card: "bg-white border-zinc-200/85 hover:border-zinc-400 hover:shadow-md hover:-translate-y-1",
      icon: "bg-black text-white border border-black/10",
    },
    dark: {
      wrapper: "bg-[#090A0F] text-zinc-100",
      card: "bg-zinc-900/50 border-zinc-800/85 hover:border-zinc-600 hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)] hover:-translate-y-1",
      icon: "bg-white text-black border border-white/10",
    },
  };
  const t = dark ? theme.dark : theme.light;

  const [text, setText] = useState("");
  const [font, setFont] = useState("Standard");
  const [result, setResult] = useState("");

  const fonts = [
    "Standard", "3-d", "3-d-ASCII", "Academic", "Alligator", "Banner",
    "Classic", "Contessa", "Digital", "Isometric1", "Isometric2",
    "Isometric3", "Isometric4", "Kban", "Lettering", "Laser", "Line",
    "Mini", "Modern", "Miriam", "Poison", "Poorman", "Rot13", "Script",
    "SmChar", "Small", "Sort", "Sulg", "Starwars", "Techno", "Universe",
    "Viking",
  ];

  const handleChange = (e) => setText(e.target.value);
  const handleFontChange = (e) => setFont(e.target.value);
  const handleGenerate = () => {
    setResult(generateFiglet(text, font));
  };

  return (
    <div className="p-6 bg-white dark:bg-zinc-900 rounded-lg shadow-md">
      <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
        ASCII Text Banner Generator
      </h2>
      <div className="mb-4">
        <label className="block text-zinc-500 dark:text-zinc-400 mb-2">
          Enter text:
          <input
            type="text"
            value={text}
            onChange={handleChange}
            className="w-full rounded border bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
            placeholder="Type your text here..."
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-zinc-500 dark:text-zinc-400 mb-2">
          Select font:
          <select
            value={font}
            onChange={handleFontChange}
            className="w-full rounded border bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
          >
            {fonts.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </label>
      </div>
      <button onClick={handleGenerate} className="mt-4 btn btn-primary">
        Generate Banner
      </button>
      {result && (
        <div className="mt-4 p-4 bg-zinc-100 dark:bg-zinc-800 rounded-md"
          dangerouslySetInnerHTML={{ __html: result }}
        />
      )}
    </div>
  );
}
