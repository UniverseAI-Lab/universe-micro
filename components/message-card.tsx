import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import { PutBlobResult } from "@vercel/blob";

import ProviderImage from "@/components/provider-image";

interface MessageProps {
  id: string;
  role: string;
  content?: React.ReactNode;
  display?: React.ReactNode;
  spinner?: React.ReactNode;
  file?: PutBlobResult;
}

export default function MessageCard({
  id,
  role,
  content,
  display,
  spinner,
  file,
}: MessageProps) {

  return (
    <motion.div
      key={id}
      className="flex animate-message_appear flex-row items-start gap-2 whitespace-pre-wrap pb-8"
    >
      <div className="flex flex-row items-center gap-4">
        {role !== "user" && (
          <div className="flex h-9 w-9 shrink-0 select-none items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-950 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-50">
            {/* Only render provider image if available */}
            {file?.provider && (
              <ProviderImage provider={file?.provider} />
            )}
          </div>
        )}
      </div>
      <div
        className={`flex w-full min-w-0 max-w-full flex-col gap-2 ${role === "user" && "items-end"}`}
      >
        {role !== "user" && (
          <h5 className="text-md pt-1 font-semibold text-zinc-950 dark:text-zinc-300">
            {/* Display model label or something else if needed */}
            {file?.label?.toString() || 'No model selected'}
          </h5>
        )}
        {file && (
          <Image
            src={file.url}
            alt="file"
            height={160}
            width={160}
            className="w-auto rounded-lg"
          />
        )}
        <div
          className={`flex flex-col gap-4 text-zinc-950 dark:text-zinc-300 ${role === "user" && "w-auto rounded-xl bg-zinc-200/60 px-4 py-2 dark:bg-zinc-800"}`}
        >
          {display && <div>{display}</div>}
          {content && <div>{content}</div>}
          {spinner}
        </div>
      </div>
    </motion.div>
  );
}